import axios from "axios";
import { sendTTSMessage } from "../modules/tts.mjs";
import { EmbedBuilder } from "discord.js";
/**
 * Gets the URL of a Pornhub Video with the given search term.
 */
function getPorn(searchTerm, interaction, ttsChannel) {
  interaction.deferReply().then(() => {
    searchTerm = searchTerm === "#porn" ? "" : searchTerm;
    console.log("+++++++++++++++++++| GET PORN |+++++++++++++++++++");
    console.log("Search: " + searchTerm);
    console.log("Channel: " + interaction.channel.name);
    console.log("ttsChannel: " + ttsChannel.name);
    console.log("+++++++++++++++++++| GET PORN |+++++++++++++++++++");
    var message = "";
    axios
      .get("http://api.redtube.com/", {
        params: {
          output: "json",
          data: "redtube.Videos.searchVideos",
          page: 0,
          thumbsize: "big",
          ordering: "newest",
          period: "weekly",
          search: searchTerm,
        },
      })
      .then((res) => {
        const videoNr = Math.floor(Math.random() * res.data.videos.length);
        if (res.data.videos[videoNr]) {
          message = res.data.videos[videoNr].video.title;
          if (message && typeof message === "string") {
            if (interaction.channel.nsfw) {
              var tagsProcessed = 0;
              var tagList = "";
              res.data.videos[videoNr].video.tags.forEach((tag) => {
                tagList += tag.tag_name + ", ";
                tagsProcessed++;
                if (
                  tagsProcessed == res.data.videos[videoNr].video.tags.length
                ) {
                  interaction.editReply({
                    embeds: [
                      new EmbedBuilder()
                        .setColor("#FF00F9")
                        .setTitle(message)
                        .setURL(res.data.videos[videoNr].video.url)
                        .setImage(res.data.videos[videoNr].video.default_thumb)
                        .addFields({ name: "Tags", value: tagList }),
                    ],
                  });
                }
              });
            } else {
              interaction.editReply("🍆🥵 " + message);
            }
            sendTTSMessage(ttsChannel, message.slice(0, 199));
          }
        } else {
          interaction.editReply(
            "👎😔 BONK, es gab kein Video, welches deiner Anfrage entspricht"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

export default getPorn;
