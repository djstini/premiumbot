import { sendTTSMessage } from "./tts.mjs";
var anarchy = [];

function isAnarchy(guildID) {
  if (-1 === getAnarchy(guildID)) {
    return false;
  } else {
    return true;
  }
}
function sendAnarchy(message) {
  console.log(message);
  let anarchyGuild = getAnarchy(message.guildId);
  if (anarchyGuild.textChannel == message.channel) {
    if (anarchyGuild.voiceChannel) {
      console.log(
        `send voice channel\nGuild: ${message.guildId}\nChannel: ${anarchyGuild.voiceChannel.name}`
      );
      sendTTSMessage(anarchyGuild.voiceChannel, message.content.toUpperCase());
    }
    var anarchyMessage = message.content.toUpperCase().replace(/ /g, "🔥");
    console.log(anarchyMessage);
    console.log(message.content);
    message.delete().then(() => {
      message.channel.send("🔥" + anarchyMessage + "🔥");
    });
  }
}

function addGuildAnarchy(guildID) {
  anarchy.push({ guildID: guildID });
}

function removeGuildAnarchy(guildID) {
  var i = 0;
  while (i < anarchy.length) {
    if (anarchy[i].guildID === guildID) {
      anarchy.splice(i, 1);
    } else {
      ++i;
    }
  }
}

function getAnarchyID(guildID = -1) {
  var i = 0;
  while (i < anarchy.length) {
    if (anarchy[i].guildID === guildID) {
      return i;
    } else {
      ++i;
    }
  }
  return -1;
}

function getAnarchy(guildID = -1) {
  if (-1 === guildID) {
    return anarchy;
  } else {
    const guildAnarchy = anarchy[getAnarchyID(guildID)];
    if (guildAnarchy) {
      return guildAnarchy;
    } else {
      return -1;
    }
  }
}

function addGuildAnarchyTextchannel(guildID, textChannel) {
  const anarchyID = getAnarchyID(guildID);
  if (-1 === anarchyID) {
    addGuildAnarchy(guildID);
    addGuildAnarchyTextchannel(guildID, textChannel);
  } else {
    let anarchyObject = anarchy[anarchyID];
    anarchyObject.textChannel = textChannel;
    anarchy[anarchyID] = anarchyObject;
  }
}

function addGuildAnarchyVoicechannel(guildID, voiceChannel) {
  const anarchyID = getAnarchyID(guildID);
  if (-1 === anarchyID) {
    addGuildAnarchy(guildID);
    addGuildAnarchyVoicechannel(guildID, voiceChannel);
  } else {
    let anarchyObject = anarchy[anarchyID];
    anarchyObject.voiceChannel = voiceChannel;
    anarchy[anarchyID] = anarchyObject;
  }
}

export {
  addGuildAnarchy,
  removeGuildAnarchy,
  getAnarchy,
  addGuildAnarchyTextchannel,
  addGuildAnarchyVoicechannel,
  isAnarchy,
  sendAnarchy,
};
