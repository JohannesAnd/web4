import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PokemonsService } from '../pokemons.service';

import { Pokemon } from '../shared/pokemon.model';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  providers: [PokemonsService],
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  constructor(private pokemonsService: PokemonsService) {}

  pokemons: Observable<Pokemon[]>;

  ngOnInit(): void {
    this.pokemons = this.pokemonsService.pokemons$;
    this.pokemonsService.getPokemons();
  }
}
