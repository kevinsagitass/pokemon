import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { GET_POKEMON_DETAIL } from "../graphql/get-pokemon-detail";
import { catchPokemon } from "../reducers/PokemonReducer";

export default function PokemonDetail() {

  const dispatch = useDispatch();
  const [nickName, setNickName] = useState("");
  const ownedPokemons = useSelector(state => state.myPokemons)

  function useQueryParam() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  function handleCatch() {
    var randomResult = Math.round(Math.random());

    if (randomResult === 0) {
      // Success
      var form = document.getElementById("form-nickname");
      form.className = "show";
    } else {
      // Failed
      var btn = document.getElementById("catchBtn");
      btn.disabled = true;

      var snackBar = document.getElementById("snackbar-failed");

      snackBar.className = "show";

      setTimeout(function() { 
        snackBar.className = snackBar.className.replace("show", "");
        btn.disabled = false;
      }, 1000);
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if( ownedPokemons.find(pokemon => pokemon.nickName === nickName) ) {
      var snackBarDuplicate = document.getElementById("snackbar-duplicate");

      snackBarDuplicate.className = "show";

      setTimeout(function() { 
        snackBarDuplicate.className = snackBarDuplicate.className.replace("show", "");
        document.getElementById("catchBtn").disabled = false;
      }, 1000);

      return;
    }

    dispatch(catchPokemon({
      id: pokemon.id,
      name: params.pokemonId,
      image: query.get("source"),
      nickName: nickName
    }));

    setNickName("");

    var form = document.getElementById("form-nickname");
    form.className = form.className.replace("show", "");

    var snackBar = document.getElementById("snackbar-caught");

    snackBar.className = "show";

    setTimeout(function() { 
      snackBar.className = snackBar.className.replace("show", "");
      document.getElementById("catchBtn").disabled = false;
    }, 1000);
  }

    let params = useParams();
    let query = useQueryParam();

    let { data: { pokemon = [] } = {} } = useQuery(GET_POKEMON_DETAIL, {
      variables: { name: params.pokemonId }});

    return (
      <Row className="d-flex justify-content-center align-items-center mt-3">
        <Col lg={3} md={3} sm={12} xs={12}>
          <Card>
            <Card.Img className="w-75 m-auto" variant="top" src={query.get("source")} />
            <Card.Body className="text-center">
                <Card.Title>
                  <div className="display-4 mb-3"><strong>{pokemon.name}</strong></div>
                  <div>{pokemon.weight + " Pounds"}</div>
                  <div>{pokemon.height + " Inch"}</div>
                  <div className="d-flex justify-content-center">{pokemon.types && pokemon.types.map((item, idx) => 
                    <span className="px-1" key={idx}>{item.type.name}</span>
                  )}
                  </div>
                </Card.Title>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button id="catchBtn" onClick={() => {handleCatch()}}>Catch</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12} className="mt-3">
          <div className="pokemon-detail-wrapper p-3">
            <div className="pokemon-detail-box">
              <section className="section-items">
                <h2 className="section-title">Abilities</h2>
                <ul className="abilities-ul">
                  {pokemon.abilities && pokemon.abilities.map((item, idx) => 
                    <li key={idx}>
                      <div className="abilities-item-border">
                        <div className="abilities-item-wrapper">
                          <h3 className="abilities-item">{item.ability.name}</h3>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </section>
              <section className="section-items">
                <h2 className="section-title">Stats</h2>
                <ul className="stats-ul">
                  {pokemon.stats && pokemon.stats.map((item, idx) => 
                    <li className="stats-li" key={idx}>
                      <h3 className="stats-name">
                        <span>{item.stat.name}</span>
                        <span>{item.base_stat}</span>
                      </h3>
                      <progress value={item.base_stat} max={100} className="stats-progress"></progress>
                    </li>
                  )}
                </ul>
              </section>
            </div>
            <div className="pokemon-detail-box">
              <section className="section-items">
                <h2 className="section-title">Moves</h2>
                <ul className="moves-ul">
                  {pokemon.moves && pokemon.moves.map((item, idx) =>
                    <li key={idx}>
                      <div className="abilities-item-border">
                        <div className="moves-item-wrapper">
                          <h3 className="abilities-item">{item.move.name}</h3>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </section>
            </div>
          </div>
        </Col>
        <div id="snackbar-caught">Pokemon is Caught!</div>
        <div id="snackbar-failed">The Pokemon Ran Away!</div>
        <div id="snackbar-duplicate">That Nickname is Taken!</div>

        <Form id="form-nickname" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="nickname">
            <Form.Label>Pokemon's Nickname</Form.Label>
            <Form.Control type="text" value={nickName} onChange={e => setNickName(e.target.value)} placeholder="Nickname" />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="danger" onClick={() => {
              var form = document.getElementById("form-nickname");
              form.className = form.className.replace("show", "");
              setNickName("");
            }}>Close</Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Row>
    );
  }