import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Pokemon } from './shared/pokemon.model';

@Injectable()
export class PokemonsService {
  constructor(private http: Http) {}

  getPokemons(): Observable<Array<Pokemon>> {
    return this.http
      .get('http://localhost:8085/pokemons')
      .map((res: Response) => res.json());
  }
}
