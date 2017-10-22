import { Action } from '@ngrx/store';
import { Pokemon } from './pokemon.model';

export const ADD_POKEMONS = 'ADD_POKEMONS';

export class AddPokemons implements Action {
  readonly type = ADD_POKEMONS;

  constructor(public payload: Pokemon[]) {}
}

export type All = AddPokemons;
