import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Pokemon } from './shared/pokemon.model';
import { AppStore } from './app-store';
import { AddPokemons } from './shared';

@Injectable()
export class PokemonsService {
  pokemons$: Observable<Pokemon[]> = this.store.select('pokemons');

  constructor(private http: Http, private store: Store<AppStore>) {}

  getAllPokemons() {
    return this.http
      .get('http://localhost:8085/pokemons')
      .map((res: Response) => res.json())
      .map(payload => new AddPokemons(payload))
      .subscribe(action => this.store.dispatch(action));
  }

<<<<<<< HEAD
=======
  search(name){
      return this.http
          .get('http://localhost:8085/pokemons/')
          .map((res: Response) => res.json())
          .map(payload => new AddPokemons(payload))
          .subscribe(action => this.store.dispatch(action));
  }
>>>>>>> eaca8ff54e2232546feba3dc1d3b95fb8273e123
}
