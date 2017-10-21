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
    this.pokemons = this.pokemonsService.getPokemons();
  }

  getImageURL(number): string {
    console.log(number);
    let stringed = number;

    while (stringed.length < 3) {
      stringed = '0' + stringed;
    }
    const res = `url(https://assets.pokemon.com/assets/cms2/img/pokedex/full/${stringed}.png)`;
    console.log(res);
    return `{background-image: ${res}}`;
  }
}
