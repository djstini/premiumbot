import { SlashCommandBuilder } from "discord.js";
import buildScore from "../modules/score.mjs";

let commandScore = {
  data: new SlashCommandBuilder()
    .setName("score")
    .setNameLocalizations({
      de: "rangliste",
    })
    .setDescription("Show the leaderboard!")
    .setDescriptionLocalizations({
      de: "Zeigt die Rangliste",
    }),
  async execute(interaction) {
    buildScore(interaction).then((scoreMessage) => {
      interaction.reply(scoreMessage);
    });
  },
};

export default commandScore;
