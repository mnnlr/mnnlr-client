function convertSecondsToHHMMSS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Return a formatted string like "HH:MM:SS" and also include the text "hrs", "min", "sec"
  return `${hours} hrs ${minutes} min ${remainingSeconds} sec`;
  // return `${hours} hrs ${minutes} min`;

}

export default convertSecondsToHHMMSS;
