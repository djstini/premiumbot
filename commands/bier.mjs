import { ChannelType, SlashCommandBuilder } from "discord.js";
import {
  addGuildBiermodeTextchannel,
  addGuildBiermodeVoicechannel,
  addGuildBiermode,
  getBiermode,
  removeGuildBiermode,
} from "../modules/biermode.mjs";

let commandBier = {
  data: new SlashCommandBuilder()
    .setName("beer")
    .setNameLocalizations({
      de: "bier",
    })
    .setDescription("Beermode")
    .setDescriptionLocalizations({
      de: "Biermodus",
    })
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
        .setDescription("Turn Beermode on and off")
        .setDescriptionLocalizations({
          de: "Biermodus an- und ausschalten",
        })
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("status")
        .setNameLocalizations({
          de: "status",
        })
        .setDescription("show beerstate")
        .setDescriptionLocalizations({
          de: "Bierstatus anzeigen",
        })
    ),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    if (interaction.options.getSubcommand() === "textchannel") {
      const textChannel = interaction.options.getChannel("textchannel");
      addGuildBiermodeTextchannel(interaction.guild.id, textChannel);
      await interaction.reply(
        `Server name: ${interaction.guild.name}\ntextkanal: ${
          interaction.options.getChannel("textchannel").name
        }`
      );
    } else if (interaction.options.getSubcommand() === "voicechannel") {
      const voiceChannel = interaction.options.getChannel("voicechannel");
      addGuildBiermodeVoicechannel(interaction.guild.id, voiceChannel);
      await interaction.reply(
        `Server name: ${interaction.guild.name}\nsprachkanal: ${
          interaction.options.getChannel("voicechannel").name
        }`
      );
    } else if (interaction.options.getSubcommand() === "toggle") {
      const guildBiermodeCurrent = getBiermode(interaction.guild.id);
      if (-1 === guildBiermodeCurrent) {
        addGuildBiermode(interaction.guild.id);
        await interaction.reply(
          `Server name: ${interaction.guild.name}\nBIERMODUS AKTIV! CHEERS!!!`
        );
      } else {
        removeGuildBiermode(interaction.guild.id);
        await interaction.reply(
          `Server name: ${interaction.guild.name}\nBIERMODUS INAKTIV! :( !!!`
        );
      }
    } else if (interaction.options.getSubcommand() === "status") {
      console.log("--------------------| BIERSTATUS |--------------------");
      console.log(getBiermode());
      console.log("--------------------| BIERSTATUS |--------------------");
      await interaction.reply(`NIX SCHAUEN Höö!`);
    }
  },
};

export default commandBier;
