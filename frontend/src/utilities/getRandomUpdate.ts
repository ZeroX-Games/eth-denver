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

function generateAttributeChangesCard() {
  // games
  const gameUpdate = 1;

  // Generate Win Rate update with its original range
  const winRateUpdate = getRandomInt(-10, 10);

  // HP will always be 0, as specified
  const hpUpdate = getRandomInt(-1, 2);

  // Generate Attack and Defense updates within their specified range [1, 5]
  const attackUpdate = getRandomInt(0, 1);
  const defenseUpdate = getRandomInt(0, 1);

  // Generate Likes update within the specified range [10, 40]
  const likesUpdate = getRandomInt(0, 20);

  // Ensure League Points (if included) or any other attribute matching Win Rate's sign follows the same logic
  // For this scenario, we are not including League Points but focusing on the new attributes provided

  // Return the array of updates
  return [
    gameUpdate,
    winRateUpdate,
    hpUpdate,
    attackUpdate,
    defenseUpdate,
    likesUpdate,
  ];
}

function generateAttributeChangesSocial() {
  // likes
  const likesUpdate = getRandomInt(0, 15);

  // Generate Level update
  const levelUpdate = getRandomInt(0, 5);

  // Generate Badges update
  const badgesUpdate = getRandomInt(0, 5);

  // Generate Championships update
  const championshipsUpdate = getRandomInt(0, 5);

  // Generate Pokedex update
  const pokedexUpdate = getRandomInt(0, 20);

  // Generate Charm update
  const charmUpdate = getRandomInt(0, 15);

  // Return the array of updates
  return [
    likesUpdate,
    levelUpdate,
    badgesUpdate,
    championshipsUpdate,
    pokedexUpdate,
    charmUpdate,
  ];
}

// Example usage
// const attributeChanges = generateAttributeChanges();
// console.log(attributeChanges);

export {
  generateAttributeChanges,
  generateAttributeChangesCard,
  generateAttributeChangesSocial,
};
