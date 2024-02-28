/*import cityData from "./CityMasterData";

const searchCities = (query) => {
  const results = [];
  const queryUpperCase = query.toUpperCase();

  for (const letter in cityData) {
    if (letter === queryUpperCase) {
      results.push(...cityData[letter]);
    } else if (queryUpperCase.startsWith(letter)) {
      results.push(
        ...cityData[letter].filter((city) =>
          city.toUpperCase().startsWith(queryUpperCase)
        )
      );
    }
  }

  return results;
};

export default searchCities;*/
