import gql from 'graphql-tag';

export const GET_POKEMON_LIST = gql`
query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        status
        message
        results {
            id
            url
            name
            image
        }
    }
}`;