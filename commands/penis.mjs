import { SlashCommandBuilder } from "discord.js";

let commandPenis = {
  data: new SlashCommandBuilder().setName("penis").setDescription("Funni"),
  async execute(interaction) {
    await interaction.reply("HAHAHAHAHAHAHHA!");
  },
};

export default commandPenis;
