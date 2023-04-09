import { BaseInteraction, SlashCommandBuilder } from "discord.js";
import getLyrics from "../modules/lyrics.mjs";

let commandOracle = {
  data: new SlashCommandBuilder()
    .setName("oracle")
    .setNameLocalizations({
      de: "orakel",
    })
    .setDescription("Gather wisdom from musical works.")
    .setDescriptionLocalizations({
      de: "Erlange Weisheit aus musikalischen Werken.",
    })
    .addSubcommand((subcommand) =>
      subcommand
        .setName("artist")
        .setNameLocalizations({
          de: "musikersuche",
        })
        .setDescription("Von welchem Künstler kommt die Weisheit??.")
        .addStringOption((option) =>
          option
            .setName("artist")
            .setNameLocalizations({
              de: "musiker",
            })
            .setDescription("Which artist's wisdom do you wish to receive??")
            .setDescriptionLocalizations({
              de: "Von welchem Künstler kommt die Weisheit??",
            })
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("alex")
        .setNameLocalizations({
          de: "alex",
        })
        .setDescription("The King.")
        .setDescriptionLocalizations({
          de: "Der King",
        })
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("amigos")
        .setNameLocalizations({
          de: "amigos",
        })
        .setDescription("The Lovers.")
        .setDescriptionLocalizations({
          de: "Die Liebhaber",
        })
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("flippers")
        .setNameLocalizations({
          de: "flippers",
        })
        .setDescription("Destroyers of Worlds")
        .setDescriptionLocalizations({
          de: "Zerstörer von Welten.",
        })
    ),
  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case "alex":
        await getLyrics(
          "alexander_marcus",
          interaction,
          "👑 Und der King sprach 🐕🍍⚡: "
        );
        break;
      case "amigos":
        await getLyrics(
          "die_amigos",
          interaction,
          "🌮 Die Amigos trällerten fröhlich 💃🏽 : "
        );
        break;
      case "flippers":
        await getLyrics(
          "die_flippers",
          interaction,
          "🐬 Die Flippers frohlocken 4️⃣0️⃣🎂🥳: "
        );
        break;
      case "artist":
        await getLyrics(
          interaction.options.getString("musiker"),
          interaction,
          "Das Orakel Verkündet: "
        );
        break;
    }
  },
};

export default commandOracle;
