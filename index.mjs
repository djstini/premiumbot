import { handleMessage } from "./message-handling.mjs";
import { updateVoiceState } from "./modules/voice-state.mjs";
import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import fs from "node:fs";
import config from "./config.mjs";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
const commandsPath = "./commands";
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".mjs"));

for (const file of commandFiles) {
  const filePath = "./commands/" + file;
  import(filePath).then(({ default: command }) => {
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  });
  // Set a new item in the Collection with the key as the command name and the value as the exported module
}

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
    interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Dev Credentials
client.login(config.token);
// Production Credentials
// client.login(
//   "ODE1NjEwNjYxMzE2MDY3Mzc5.G03zhA.hZId2doNSaTO_r9I7qkfIYGO3H6dxEhMxOw3Mo"
// );

/**
 * listeners
 */
client.on("ready", () => {
  console.log(`Premiumbot Logged in as ${client.user.tag}!`);
});
client.on("messageCreate", (message) => {
  handleMessage(client, message);
});
client.on("voiceStateUpdate", updateVoiceState);
