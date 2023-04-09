import { getAllTimestamps } from "./database-fucktions.mjs";
import { refreshStamp } from "./voice-state.mjs";

function buildScore(interaction) {
  return new Promise((resolve) => {
    var guildID = interaction.guild.id;
    let user = "";
    console.log(".........................................");
    // todo: get all entries for the guild and sort them
    getAllTimestamps(guildID).then((entries) => {
      let scoreMessage = "";
      entries.sort((a, b) => {
        return b.time - a.time;
      });
      let itemsProcessed = 0;
      entries.forEach((entry) => {
        console.log(entry);
        const theUserID = entry.userID;
        const theTime = entry.time;
        refreshStamp(guildID, theUserID);
        try {
          user = interaction.guild.members.cache.get(theUserID).nickname;
          if (!user) {
            user = interaction.guild.members.cache.get(theUserID).user.username;
          }
          console.log(
            "-----------------------| MESSAGE |-----------------------"
          );
          console.log("User ID: " + theUserID);
          console.log("User Name/Nickname: " + user);
          console.log("User Score: " + theTime);
          console.log(
            "---------------------------------------------------------"
          );
          scoreMessage += user + " : " + (theTime / 3600).toFixed(1) + " h \n";
        } catch (ex) {
          user = "Nicht mehr auf Server";
        }
        ++itemsProcessed;
        if (itemsProcessed === entries.length) {
          console.log("send!!");
          resolve(scoreMessage);
          console.log(".........................................");
        }
      });
    });
  });
}

export default buildScore;
