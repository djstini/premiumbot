import { SlashCommandBuilder } from "discord.js";

let commandW2g = {
  data: new SlashCommandBuilder()
    .setName("w2g")
    .setNameLocalizations({
      de: "w2g",
    })
    .setDescription("Replies with Watch2Gether Link!")
    .setDescriptionLocalizations({
      de: "Gibt dir den Watch2Gether Link :)",
    }),
  async execute(interaction) {
    await interaction.reply({
      content: "https://w2g.tv/room/?room_id=fhc1lzg2hdk2ms4hs2",
      ephemeral: true,
    });
  },
};

export default commandW2g;
