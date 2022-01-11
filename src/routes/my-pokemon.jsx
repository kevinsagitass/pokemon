import { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { releasePokemon } from '../reducers/PokemonReducer';

export default function MyPokemon() {
  const pokemon = useSelector(state => state.myPokemons)
  const dispatch = useDispatch();

  function handleRelease(pokemon) {

    dispatch(releasePokemon(pokemon));

    console.log(releasePokemon);

    var snackBar = document.getElementById("snackbar-release");

    snackBar.className = "show";

    setTimeout(function() { 
      snackBar.className = snackBar.className.replace("show", "");
    }, 1000);
  }

    return (
      <Row className="px-3 text-center">
          {pokemon && pokemon.map(pokemon => 
              <Col key={pokemon.nickName} lg={2} md={4} sm={6} xs={6} className="mt-3 p-2">
                      <Card>
                          <Link className="text-decoration-none text-dark" to={"/pokemon/" + pokemon.name + `?source=${pokemon.image}`}>
                            <Card.Img variant="top" src={pokemon.image} />
                            <Card.Body className="text-center">
                                <Card.Title>
                                  <div>
                                    {pokemon.name}
                                  </div>
                                  <div>
                                    {pokemon.nickName}
                                  </div>
                                </Card.Title>
                            </Card.Body>
                          </Link>
                          <Card.Footer className="text-center">
                            <Button variant="danger" onClick={() => {handleRelease(pokemon)}}>
                              Release
                            </Button>
                          </Card.Footer>
                      </Card>
              </Col>
          )}

        <div id="snackbar-release">Pokemon has been Released!</div>
      </Row>
    );
  }