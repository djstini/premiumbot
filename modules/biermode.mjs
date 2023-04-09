import schedule from "node-schedule";
import { sendTTSMessage } from "./tts.mjs";
var biermode = [];

function runBiermode(bierGuild) {
  console.log("----------------------| runBiermode |----------------------");
  if (bierGuild.textChannel) {
    console.log(
      `send voice channel\nGuild: ${bierGuild.guildID}\nChannel: ${bierGuild.textChannel.name}`
    );
    bierGuild.textChannel.send(
      "🍺 Es ist " +
        (new Date().getHours() + 1) +
        " Uhr, Zeit für ein weiteres Bier! 🍺"
    );
  }
  if (bierGuild.voiceChannel) {
    console.log(
      `send voice channel\nGuild: ${bierGuild.guildID}\nChannel: ${bierGuild.voiceChannel.name}`
    );
    sendTTSMessage(
      bierGuild.voiceChannel,
      "Es ist " +
        (new Date().getHours() + 1) +
        " Uhr, Zeit für ein weiteres Bier!"
    );
  }
  console.log("----------------------| runBiermode |----------------------");
}

/**
 * Scheduling Function
 */
const job = schedule.scheduleJob("1 * * * *", function () {
  const bierGuilds = getBiermode();
  bierGuilds.forEach((bierGuild) => {
    runBiermode(bierGuild);
  });
});

function isBiermode(guildID) {
  if (-1 === getBiermode(guildID)) {
    return false;
  } else {
    return true;
  }
}

function addGuildBiermode(guildID) {
  biermode.push({ guildID: guildID });
}

function removeGuildBiermode(guildID) {
  var i = 0;
  while (i < biermode.length) {
    if (biermode[i].guildID === guildID) {
      biermode.splice(i, 1);
    } else {
      ++i;
    }
  }
}

function getBiermodeID(guildID = -1) {
  var i = 0;
  while (i < biermode.length) {
    if (biermode[i].guildID === guildID) {
      return i;
    } else {
      ++i;
    }
  }
  return -1;
}

function getBiermode(guildID = -1) {
  if (-1 === guildID) {
    return biermode;
  } else {
    const guildBiermode = biermode[getBiermodeID(guildID)];
    if (guildBiermode) {
      return guildBiermode;
    } else {
      return -1;
    }
  }
}

function addGuildBiermodeTextchannel(guildID, textChannel) {
  const biermodeID = getBiermodeID(guildID);
  if (-1 === biermodeID) {
    addGuildBiermode(guildID);
    addGuildBiermodeTextchannel(guildID, textChannel);
  } else {
    let biermodeObject = biermode[biermodeID];
    biermodeObject.textChannel = textChannel;
    biermode[biermodeID] = biermodeObject;
  }
}

function addGuildBiermodeVoicechannel(guildID, voiceChannel) {
  const biermodeID = getBiermodeID(guildID);
  if (-1 === biermodeID) {
    addGuildBiermode(guildID);
    addGuildBiermodeVoicechannel(guildID, voiceChannel);
  } else {
    let biermodeObject = biermode[biermodeID];
    biermodeObject.voiceChannel = voiceChannel;
    biermode[biermodeID] = biermodeObject;
  }
}

export {
  addGuildBiermode,
  removeGuildBiermode,
  getBiermode,
  addGuildBiermodeTextchannel,
  addGuildBiermodeVoicechannel,
  isBiermode,
};
