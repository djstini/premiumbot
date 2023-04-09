import { ChannelType, SlashCommandBuilder } from "discord.js";
import getPorn from "../modules/porn.mjs";
let commandPing = {
  data: new SlashCommandBuilder()
    .setName("porn")
    .setNameLocalizations({
      de: "pornografie",
    })
    .setDescription("Replies with Porn!")
    .setDescriptionLocalizations({
      de: "Zeigt dir heißen Schais",
    })
    .addStringOption((option) =>
      option
        .setName("search")
        .setNameLocalizations({
          de: "suchbegriff",
        })
        .setDescription("Search for hot stuff")
        .setDescriptionLocalizations({
          de: "Such nach richtig geilem Zeugs.",
        })
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName("voicechannel")
        .setDescription("Choose a Voicechannel!")
        .setDescriptionLocalizations({
          de: "Wähle einen Sprachkanal!",
        })
        .addChannelTypes(ChannelType.GuildVoice)
    ),
  async execute(interaction) {
    getPorn(
      interaction.options.getString("search") ?? "",
      interaction,
      interaction.options.getChannel("voicechannel")
        ? interaction.guild.channels.cache.find(
            (channel) =>
              channel.id == interaction.options.getChannel("voicechannel")
          )
        : ""
    );
  },
};

export default commandPing;
