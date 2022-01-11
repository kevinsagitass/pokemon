import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import MyPokemon from "./routes/my-pokemon";
import PokemonDetail from "./routes/pokemon-detail";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
     <Routes>
      <Route path="/pokemon" element={<App />} >
        <Route path="/pokemon/:pokemonId" element={<PokemonDetail />} />
        <Route path="/pokemon/my-pokemon" element={<MyPokemon />} />
        <Route
          path="*"
          element={
            <main>
              <p>404 Not Found</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>, 
rootElement);