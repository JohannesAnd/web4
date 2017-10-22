import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { PokemonsService } from '../pokemons.service';

import { Pokemon } from '../shared/pokemon.model';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  providers: [PokemonsService],
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  @ViewChild('getPokemons') getPokemons;

  pokemons$: Observable<Pokemon[]>;

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemons$ = this.pokemonsService.pokemons$;

    Observable.fromEvent(
      this.getPokemons._elementRef.nativeElement,
      'click'
    ).subscribe(e => this.pokemonsService.getPokemons());
  }
}
