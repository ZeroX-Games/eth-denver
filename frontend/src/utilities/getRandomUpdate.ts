function getRandomInt(min: any, max: any) {
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateAttributeChanges() {
  // Defining the ranges for each attribute update, except for League Points
  const ranges = [
    [-10, 10], // Win Rate
    [-10, 10], // Critical Hit Rate
    // League Points will be handled separately to match the Win Rate's sign
    [1, 1], // Games (always increases by 1)
    [0, 10], // Proficiency
    [1, 20], // Training Hours
    [10, 40], // Likes
  ];
  const updates = ranges.map((range) => getRandomInt(range[0], range[1]));
  // Generate League Points update, ensuring it has the same sign as the Win Rate update
  const winRateUpdate = updates[0];
  const leaguePointsRange = winRateUpdate >= 0 ? [1, 20] : [-20, -1];
  const leaguePointsUpdate = getRandomInt(
    leaguePointsRange[0],
    leaguePointsRange[1],
  );
  // Insert the League Points update to match the Win Rate's position
  updates.splice(2, 0, leaguePointsUpdate); // Inserting at the correct index for League Points
  return updates;
}
// Example usage
// const attributeChanges = generateAttributeChanges();
// console.log(attributeChanges);

export { generateAttributeChanges };
