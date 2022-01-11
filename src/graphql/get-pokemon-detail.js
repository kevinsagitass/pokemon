import gql from 'graphql-tag';

export const GET_POKEMON_DETAIL = gql`
query pokemon($name: String!) {
    pokemon(name: $name) {
        id
        base_experience
        name
        height
        weight
        location_area_encounters
        stats {
            base_stat
            stat {
                name
            }
        }
        types {
            type {
                name
            }
        }
        species {
            name
        }
        abilities {
            ability {
                name
            }
        }
        moves {
            move {
                name
            }
        }
    }
}`;