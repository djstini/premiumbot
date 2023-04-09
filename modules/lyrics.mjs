import axios from "axios";
import { parse } from "node-html-parser";

function getLyrics(artist, interaction, prefix) {
  interaction.deferReply().then(() => {
    axios
      .get("https://genius.com/api/search/song/", {
        params: {
          q: artist,
          page: 1,
          per_page: 50,
        },
      })
      .then((res) => {
        const songs = res.data.response.sections[0].hits;
        const song = songs[Math.floor(Math.random() * songs.length)];
        const songUrl = song.result.url;
        axios.get(songUrl).then((res) => {
          let lines = [];
          const root = parse(res.data);
          const lyricContainers = root.querySelectorAll(
            "div[data-lyrics-container=true]"
          );
          lyricContainers.forEach((lyricContainer) => {
            lyricContainer.removeChild(
              lyricContainer.querySelector(
                "div[data-exclude-from-selection=true]"
              )
            );
            const section = lyricContainer.innerHTML;
            if (section != "" && section != "[...]") {
              section.split("<br>").forEach((line) => {
                const strippedLine = decodeEntities(
                  line.replace(/(<([^>]+)>)/gi, "")
                );
                if (
                  strippedLine &&
                  strippedLine != "" &&
                  strippedLine != "..." &&
                  !/^\[.*\]$/u.test(strippedLine) &&
                  !line.includes("Strophe") &&
                  !line.includes("Refrain") &&
                  !line.includes("Bridge")
                ) {
                  lines.push(
                    strippedLine.replace(
                      new RegExp("&" + "#" + "x27;", "g"),
                      "'"
                    )
                  );
                }
              });
            }
          });
          if (lines.length > 0) {
            interaction.editReply(
              prefix +
                '"' +
                lines[Math.floor(Math.random() * lines.length)] +
                '"'
            );
          } else {
            interaction.editReply("Das Orakel ist Ratlos :(");
          }
        });
      });
  });
}

function decodeEntities(encodedString) {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {
    nbsp: " ",
    amp: "&",
    quot: '"',
    lt: "<",
    gt: ">",
  };
  return encodedString
    .replace(translate_re, function (match, entity) {
      return translate[entity];
    })
    .replace(/&#(\d+);/gi, function (match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
}

export default getLyrics;
