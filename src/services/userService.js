import axios from "axios";
import Endpoints from "./endpoints";
import { ALLPOKEMON } from "./endpoints";

export async function getAllPokemon(pageSize, offset) {
  var response = await axios.get(ALLPOKEMON(pageSize, offset), null);
  return response.data;
}

export async function getCount() {
  var response = await axios.get(Endpoints.ALLPOKEMON, null);
  return response.data;
}

export async function getDetails() {
  var response = await axios.get(Endpoints.ALLDetails, null);
  return response.data;
}
