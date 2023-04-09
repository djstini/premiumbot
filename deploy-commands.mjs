import { REST, Routes } from "discord.js";
import config from "./config.mjs";
import fs from "node:fs";

let commands = [];
// Grab all the command files from the commands directory you created earlier
let commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".mjs"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment

for (const file of commandFiles) {
  const filePath = "./commands/" + file;

  import(filePath).then(({ default: command }) => {
    commands.push(command.data.toJSON());
    if (commands.length == commandFiles.length) {
      // Construct and prepare an instance of the REST module
      const rest = new REST({ version: "10" }).setToken(config.token);

      // and deploy your commands!
      (async () => {
        try {
          console.log(
            `Started refreshing ${commands.length} application (/) commands.`
          );

          // The put method is used to fully refresh all commands in the guild with the current set
          const data = await rest.put(
            Routes.applicationCommands(config.clientId),
            {
              body: commands,
            }
          );

          console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
          );
        } catch (error) {
          // And of course, make sure you catch and log any errors!
          console.error(error);
        }
      })();
    }
  });
}
