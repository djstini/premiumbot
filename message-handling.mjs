import { getAllTimestamps } from "./modules/database-fucktions.mjs";
import { refreshStamp } from "./modules/voice-state.mjs";
import { isBiermode } from "./modules/biermode.mjs";
import { sendAnarchy } from "./modules/anarchy.mjs";
var anarchy = false;

function handleMessage(client, message) {
  const prefix = "#";
  if (!message.author.bot) {
    if (
      message.content.toLowerCase().includes("owo") ||
      message.content.toLowerCase().includes("uwu")
    ) {
      message.delete();
      message.channel.send(
        'Würg! Solches Verhalten wird hier nicht toleriert. Die Wörter "OWO" und "UWU" sind banniert!'
      );
    }
    if (
      message.content.toLowerCase().match("^skr.*rt") ||
      message.content.toLowerCase().includes("bratan")
    ) {
      message.delete();
      message.channel.send("Würg! Deutschrap ist keine Musik!");
    }
    if (
      message.content.toLowerCase().includes("linus") ||
      message.content.toLowerCase().includes("linüs")
    ) {
      message.channel.send(
        "Linus, was hast du jetzt schon wieder kaputt gemacht?!"
      );
    }
    console.log("*****************************************************");
    console.log(isBiermode(message.guildId));
    if (!message.content.startsWith(prefix) && isBiermode(message.guildId)) {
      message.channel.send(
        "🍺 Schöne Nachricht! Du könntest statt zu chatten aber auch ein Bier trinken. 🍺"
      );
    }
    if (!message.content.startsWith(prefix)) {
      sendAnarchy(message);
    }
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;
}

export { handleMessage };
