const Endpoints = {
  ALLPOKEMON: "https://pokeapi.co/api/v2/pokemon",
  ALLDetails: "https://pokeapi.co/api/v2/pokemon/2/",
};

export default Endpoints;

export const ALLPOKEMON = (pageSize, offset) =>
  `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`;
