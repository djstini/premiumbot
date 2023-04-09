var timeStampArray = [];
import { maybeUpdateTimestamp } from "./database-fucktions.mjs";

function updateVoiceState(oldVoiceState, newVoiceState) {
  var userID = newVoiceState.id;
  if (!oldVoiceState.channelId) {
    createTimeStamp(userID);
  }
  console.log(timeStampArray);
  if (!newVoiceState.channelId) {
    console.log(userID + " - has left the server");
    const guildID = newVoiceState.guild.id;
    console.log("on Guild: " + guildID);
    maybeUpdateTimestamp(guildID, userID, getTimeOnline(userID));
  }
}

/**
 * creates a new Timestamp and stores it in the timeStampArray indexed by the specified userID
 */
function createTimeStamp(userID) {
  var stamp = new Date();
  timeStampArray[userID] = stamp;
}

/**
 * Updates the Time online of all users and creates new Stamps
 */
function refreshStamp(guildID, userID) {
  let timeOnline = getTimeOnline(userID);
  if (!Number.isNaN(timeOnline)) {
    console.log("refreshed the Stamp for: " + userID + "on: " + guildID);
    maybeUpdateTimestamp(guildID, userID, timeOnline);
  } else {
    console.log("the user: " + userID + "is not online at the Moment");
  }
}

/**
 * Returns the time since the user first entered a voice Channel and returns the time in seconds. Also deletes the Joined Timestamp.
 */
function getTimeOnline(userID) {
  var timeOfJoin = timeStampArray[userID];
  var timeOfLeave = new Date();
  var timeOnline = timeOfLeave - timeOfJoin;
  delete timeStampArray[userID];
  return timeOnline / 1000;
}

export { createTimeStamp, updateVoiceState, refreshStamp, getTimeOnline };
