import { clearQueue } from "../modules/tts.mjs";
import { SlashCommandBuilder } from "discord.js";

let commandClearQueue = {
  data: new SlashCommandBuilder()
    .setName("clearttsqueue")
    .setDescription("Ples no use :("),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    clearQueue();
    await interaction.reply(`well shit.`);
  },
};

export default commandClearQueue;
