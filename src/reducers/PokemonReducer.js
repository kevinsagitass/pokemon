import { createSlice } from '@reduxjs/toolkit'

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    myPokemons: []
  },
  reducers: {
    catchPokemon: (state, action) => {

      state.myPokemons = [...state.myPokemons, 
        {
          id: action.payload.id,
          name: action.payload.name,
          image: action.payload.image,
          nickName: action.payload.nickName
        }
      ]
    },
    releasePokemon: (state, action) => {

      state.myPokemons = state.myPokemons.filter(pokemon => pokemon.nickName !== action.payload.nickName)

    }
  }
})

export const { catchPokemon, releasePokemon } = pokemonSlice.actions

export default pokemonSlice.reducer