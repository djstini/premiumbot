import { ChannelType, SlashCommandBuilder } from "discord.js";
import {
  addGuildAnarchyTextchannel,
  addGuildAnarchyVoicechannel,
  addGuildAnarchy,
  getAnarchy,
  removeGuildAnarchy,
} from "../modules/anarchy.mjs";

let commandAnarchy = {
  data: new SlashCommandBuilder()
    .setName("anarchy")
    .setNameLocalizations({
      de: "anarchie",
    })
    .setDescription("provides information about the server")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("textchannel")
        .setNameLocalizations({
          de: "textkanal",
        })
        .setDescription("Choose a Textchannel!")
        .setDescriptionLocalizations({
          de: "Wähle einen Textkanal!",
        })
        .addChannelOption((option) =>
          option
            .setName("textchannel")
            .setDescription("Choose a Textchannel!")
            .setDescriptionLocalizations({
              de: "Wähle einen Textkanal!",
            })
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("voicechannel")
        .setNameLocalizations({
          de: "sprachkanal",
        })
        .setDescription("Choose a Voicechannel!")
        .setDescriptionLocalizations({
          de: "Wähle einen Sprachkanal!",
        })
        .addChannelOption((option) =>
          option
            .setName("voicechannel")
            .setDescription("Choose a Voicechannel!")
            .setDescriptionLocalizations({
              de: "Wähle einen Sprachkanal!",
            })
            .addChannelTypes(ChannelType.GuildVoice)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("toggle")
        .setNameLocalizations({
          de: "umschalten",
        })
        .setDescription("Turn anarchy on and off")
        .setDescriptionLocalizations({
          de: "Anarchie an- und ausschalten",
        })
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("status")
        .setNameLocalizations({
          de: "status",
        })
        .setDescription("show anarchystate")
        .setDescriptionLocalizations({
          de: "Anarchiestatus anzeigen",
        })
    ),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    if (interaction.options.getSubcommand() === "textchannel") {
      const textChannel = interaction.options.getChannel("textchannel");
      addGuildAnarchyTextchannel(interaction.guild.id, textChannel);
      await interaction.reply(
        `Server name: ${interaction.guild.name}\ntextkanal: ${
          interaction.options.getChannel("textchannel").name
        }`
      );
    } else if (interaction.options.getSubcommand() === "voicechannel") {
      const voiceChannel = interaction.options.getChannel("voicechannel");
      addGuildAnarchyVoicechannel(interaction.guild.id, voiceChannel);
      await interaction.reply(
        `Server name: ${interaction.guild.name}\nsprachkanal: ${
          interaction.options.getChannel("voicechannel").name
        }`
      );
    } else if (interaction.options.getSubcommand() === "toggle") {
      const guildAnarchyCurrent = getAnarchy(interaction.guild.id);
      if (-1 === guildAnarchyCurrent) {
        addGuildAnarchy(interaction.guild.id);
        await interaction.reply(
          `Server name: ${interaction.guild.name}\nANARCHIE AKTIV! CHEERS!!!`
        );
      } else {
        removeGuildAnarchy(interaction.guild.id);
        await interaction.reply(
          `Server name: ${interaction.guild.name}\nANARCHIE INAKTIV! :( !!!`
        );
      }
    } else if (interaction.options.getSubcommand() === "status") {
      console.log("--------------------| ANARCHYSTATUS |--------------------");
      console.log(getAnarchy());
      console.log("--------------------| ANARCHYSTATUS |--------------------");
      await interaction.reply(`NIX SCHAUEN Höö!`);
    }
  },
};

export default commandAnarchy;
