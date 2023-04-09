import discordTTS from "discord-tts";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  entersState,
  StreamType,
  VoiceConnectionStatus,
  AudioPlayerStatus,
  getVoiceConnection,
} from "@discordjs/voice";
let queue = [];
/**
 * Send a TTS Message to the given Channel
 */
async function sendTTSMessage(channel, msg) {
  if (channel && msg.length < 200) {
    // check if there already was something in the queue, when in doubt this means that there is a connection ongoing.
    getFirstFromQueue(channel.guildId).then((elem) => {
      if (!elem) {
        // seems like there is no element, so lets start the loop.
        addToQueue(channel.guildId, msg);
        sendTTS(channel);
      } else {
        // there appears to be a loop ongoing, so only add to queue.
        addToQueue(channel.guildId, msg);
      }
    });
  }
}

async function sendTTS(channel) {
  try {
    let voiceConnection = getVoiceConnection(channel.guildId);
    getFirstFromQueue(channel.guildId).then((queueElement) => {
      const stream = discordTTS.getVoiceStream(queueElement.message);
      const audioResource = createAudioResource(stream, {
        inputType: StreamType.Arbitrary,
        inlineVolume: true,
      });
      const audioPlayer = createAudioPlayer({});
      if (!voiceConnection) {
        voiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guildId,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
        voiceConnection.subscribe(audioPlayer);
      }
      if (voiceConnection?.status === VoiceConnectionStatus.Disconnected) {
        voiceConnection.rejoin({
          channelId: channel.id,
          guildId: channel.guildId,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
      }
      entersState(
        voiceConnection,
        VoiceConnectionStatus.Connecting,
        5_000
      ).then((voiceConnection) => {
        if (voiceConnection.status === VoiceConnectionStatus.Connected) {
          audioPlayer.play(audioResource);
        }
      });
      audioPlayer.on(AudioPlayerStatus.Idle, () => {
        voiceConnection.destroy();
        removeFromQueue(queueElement.guildId, queueElement.message).then(() => {
          if (queue.filter((e) => e.guildId === channel.guildId).length != 0) {
            sendTTS(channel);
          }
        });
      });
    });
  } catch (exception) {
    console.log(exception);
  }
}

function addToQueue(guildId, msg) {
  queue.push({ guildId: guildId, message: msg });
}

function getFirstFromQueue(guildId) {
  return new Promise((resolve) => {
    var id = queue.findIndex((e) => e.guildId == guildId);
    if (id != -1) {
      var first = queue[id];
      resolve(first);
    } else {
      resolve(false);
    }
  });
}

function removeFromQueue(guildId, msg) {
  return new Promise((resolve) => {
    var id = queue.findIndex((e) => e.guildId == guildId && e.message == msg);
    if (id != -1) {
      queue.splice(id, 1);
      resolve();
    } else {
      resolve();
    }
  });
}

function clearQueue() {
  queue = [];
}
export { sendTTSMessage, clearQueue };
