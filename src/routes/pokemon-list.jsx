import { Link } from "react-router-dom";
import React, { useLayoutEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMON_LIST } from '../graphql/get-pokemon-list'
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export function PokemonList() {
    const LIMIT = 30;
    const ownedPokemons = useSelector(state => state.myPokemons)

    let { data: { pokemons = [] } = {}, fetchMore } = useQuery(GET_POKEMON_LIST, {
        variables: { limit: LIMIT, offset: 0 }
    })

    const [lastOffSet, setLastOffSet] = useState(LIMIT);
    const [isFetchMoreLoading, setIsFetchMoreLoading] = useState(false);

    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight + 10;
      }

    const onScroll = async () => {
        const wrappedElement = document.getElementById('root');
        if (isBottom(wrappedElement)) {
            if(!isFetchMoreLoading) {
                setIsFetchMoreLoading(true);

                await fetchMore({
                    variables: { offset: lastOffSet }, 
                    updateQuery: (lastResults, nextResults) => {
                        pokemons.results = [...lastResults.pokemons.results, ...nextResults.fetchMoreResult.pokemons.results];

                        setLastOffSet(pokemons.results.length);
                    }
                });

                setIsFetchMoreLoading(false);
            }
        }
      };

      useLayoutEffect(() => {
        window.addEventListener('scroll', onScroll)
        
        return () => window.removeEventListener('scroll', onScroll)
        });

    const digitFormat = (id) => {
        return (id.length >= 3) ? id : (new Array(3).join('0') + id).slice(-3);
    }

    return (
        <div className="px-3">
            <Row>
                {pokemons['results'] && pokemons['results'].map(pokemon => 
                    <Col key={pokemon.name} lg={2} md={4} sm={6} xs={6} className="mt-3 p-2">
                        <Link className="text-decoration-none text-dark" to={"/pokemon/" + pokemon.name + `?source=${pokemon.image}`}>
                            <Card>
                                <Card.Header className="d-flex justify-content-between">
                                    <span><strong>Owned : {ownedPokemons.filter(item => item.name === pokemon.name).length }</strong></span>
                                    <span><strong>#{digitFormat(pokemon.id)}</strong></span>
                                </Card.Header>
                                <Card.Img variant="top" src={pokemon.image} />
                                <Card.Body className="text-center">
                                    <Card.Title>{pokemon.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )}
            </Row>
            <Row className={isFetchMoreLoading ? 'd-block' : 'd-none'}>
                <Col className="text-center">
                    Loading...
                </Col>
            </Row>
        </div>
    )
}