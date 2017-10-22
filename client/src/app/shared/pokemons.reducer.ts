import { Pokemon } from './pokemon.model';
import * as PokemonsActions from './pokemons.actions';

export type Action = PokemonsActions.All;

export function pokemonsReducer(state: Pokemon[], action: Action) {
  switch (action.type) {
    case PokemonsActions.ADD_POKEMONS:
      return action.payload;
    default:
      return state;
  }
}
