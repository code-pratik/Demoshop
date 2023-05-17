import React, { useEffect, useState } from "react";
import swr from "swr";
function Pokemon() {
  const [pokemon, setpokemon] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
        );
        const data = await response.json();
        console.log(data);
        setpokemon(data.results.map((pokemon) => pokemon.name));
      } catch (error) {
        console.log("hello", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <uo>
        {pokemon?.map((item) => (
          <li style={{ color: "black" }}>{item}</li>
        ))}
      </uo>
    </div>
  );
}

export default Pokemon;
