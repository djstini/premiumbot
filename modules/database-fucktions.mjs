import { MongoClient } from "mongodb";
import config from "../config.mjs";

const dbClient = new MongoClient(config.mongoDbToken);

function maybeUpdateTimestamp(guildID, userID, timeOnline) {
  dbClient.connect().then(() => {
    console.log(guildID);
    var oldTime;
    var dbID;
    const db = dbClient.db(guildID + "");
    const dbTimestamps = db.collection("timestamps");
    dbTimestamps.findOne({ userID: userID }).then((result) => {
      if (result && result.time) {
        oldTime = result.time;
        dbID = result._id;
      } else {
        oldTime = 0;
      }
      console.log("+++++++++++++++++++| DATABASE UPDATE |+++++++++++++++++++");
      console.log("userID: " + userID);
      console.log("guildID: " + guildID);
      console.log("dbID: " + dbID);
      console.log("Old Time: " + oldTime);
      console.log("New Time: " + timeOnline);
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      if (!oldTime) {
        var newTime = timeOnline.toFixed();
      } else {
        var newTime = (Number(oldTime) + timeOnline).toFixed();
      }
      if (Number.isNaN(timeOnline)) {
        var newTime = Number(oldTime);
      }
      console.log("Updated Time: " + newTime);
      dbTimestamps
        .updateOne(
          { userID: userID },
          { $set: { userID: userID, time: newTime } },
          { upsert: true }
        )
        .then(() => {
          console.log(
            "+++++++++++| DB UPDSERTED: " + userID + " |++++++++++++"
          );
        });
    });
  });
}

function getAllTimestamps(guildID) {
  return new Promise((resolve) => {
    dbClient.connect().then(() => {
      const db = dbClient.db(guildID);
      const dbTimestamps = db.collection("timestamps");
      dbTimestamps
        .find({})
        .toArray()
        .then((entries) => {
          console.log(entries);
          resolve(entries);
        });
    });
  });
}

export { maybeUpdateTimestamp, getAllTimestamps };
