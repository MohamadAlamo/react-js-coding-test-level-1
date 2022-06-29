import "./App.css";
import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import { getAllPokemon, getCount, getDetails } from "./services/userService";
import _ from "lodash";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { PDFExport } from "@progress/kendo-react-pdf";
const pageSize = 15;

function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [totalCount, setTotalCount] = useState([]);
  const [pages, setPages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState();
  const [details, setDetails] = useState();

  const pdfExportComponent = useRef(null);
  const handleExport = (event) => {
    pdfExportComponent.current.save();
  };

  const data = details;
  useEffect(async () => {
    const pokemons = await getAllPokemon(pageSize, offset);
    setPokemons(pokemons);
    setFilteredPokemons(pokemons);
    const totalCount = await getCount();
    setTotalCount(totalCount.count);
    const pageCount = Math.ceil(totalCount / pageSize);
    const pages = _.range(1, pageCount + 1);
    setPages(pages);
    const details = await getDetails();
    setDetails(details.stats);
  }, [offset]);

  const requestSearch = (e) => {
    const searchValue = e.target.value;
    const newValues = pokemons.results.filter((pokemon) => {
      return pokemon.name.includes(searchValue);
    });
    setFilteredPokemons((prev) => {
      return {
        ...prev,
        results: newValues,
      };
    });
  };

  const updateCurrentPage = async (page) => {
    setOffset(page);
  };

  const handleNextButtonClick = () => {
    const nextPage = offset + pageSize;
    updateCurrentPage(nextPage);
  };

  const handleBackButtonClick = () => {
    const backPage = offset - pageSize;
    updateCurrentPage(backPage);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
    },
    overlay: { backgroundColor: "grey" },
  };

  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex !</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex,
              and show a list of pokemon name.
            </li>
            <li>Implement React Loading and show it during API call</li>
            <li>
              when hover on the list item , change the item color to yellow.
            </li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>
              If you do more than expected (E.g redesign the page / create a
              chat feature at the bottom right). it would be good.
            </li>
          </ul>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                <b>Implement loader here</b>
              </header>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>
            <b>Implement Pokedex list here</b>
            <table>
              <thead>
                <input
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  onKeyUp={requestSearch}
                ></input>
                <tr>
                  <th className="table">Pokedex list</th>
                </tr>
              </thead>
              <tbody>
                {filteredPokemons?.results?.map((pokemon) => (
                  <tr className="list" onClick={setPokemonDetail}>
                    {pokemon.name}
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button className="button" onClick={handleBackButtonClick}>
                Previous
              </button>
              <button className="button" onClick={handleNextButtonClick}>
                Next
              </button>
            </div>
          </>
        )}
        <nav>
          <ul>
            {pages.map((page) => (
              <li className="pagination">{page === offset}</li>
            ))}
          </ul>
        </nav>
      </header>

      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <PDFExport ref={pdfExportComponent} paperSize="A3">
            <div>
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                }
              />
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                }
              />
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                }
              />
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                }
              />
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                }
              />
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                }
              />
              <div>
                {details.map((detail) => (
                  <tr className="statName" onClick={setPokemonDetail}>
                    {detail.stat.name}
                  </tr>
                ))}
                {details.map((detail) => (
                  <tr className="statName" onClick={setPokemonDetail}>
                    {detail.base_stat}
                  </tr>
                ))}
              </div>
              <div>
                <BarChart
                  backgroundColor={"white"}
                  width={800}
                  height={430}
                  data={data}
                >
                  <Bar dataKey="base_stat" fill="gray" />
                  <XAxis dataKey="stat.name" />
                  <YAxis />
                </BarChart>
              </div>
              <button onClick={handleExport}>PDF Download </button>
            </div>
          </PDFExport>
          {/* Requirement:
            <ul>
              <li>show the sprites front_default as the pokemon image</li>
              <li>
                Show the stats details - only stat.name and base_stat is
                required in tabular format
              </li>
              <li>Create a bar chart based on the stats above</li>
              <li>
                Create a buttton to download the information generated in this
                modal as pdf. (images and chart must be included)
              </li>
            </ul> */}
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
