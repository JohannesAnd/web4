import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { PokemonsService } from '../pokemons.service';

import { Pokemon } from '../shared/pokemon.model';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  providers: [PokemonsService],
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
  @ViewChild('getPokemons') getPokemons;
  pokemons$: Observable<Pokemon[]>;
  pokemonSubset$: Observable<Pokemon[]>;
  pokemons: Array<Pokemon>;

  // Displaying n pokemons at a time
  n = 25;

  // Sort Method
  sortType: string;
  // 1 is asc, -1 is desc
  sortMethod: number;

  // List of types in current filter
  typeFilter = [
    'grass',
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'steel',
    'water'
  ];

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemons$ = this.pokemonsService.pokemons$;
    this.pokemonsService.getAllPokemons();
    this.pokemons = [];
    this.pokemons$.subscribe(pokemons => {
      this.pokemons = pokemons || [];
    });

    // init sort parameters
    this.sortType = 'number';
    this.sortMethod = 1;
  }

  handlePaginationChange(event) {
    console.log("Page:", event.page);
    console.log("Items Per Page:", event.itemsPerPage);
  }

  shadeColor2(color, percent) {
    var f = parseInt(color.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = (f >> 8) & 0x00ff,
      B = f & 0x0000ff;
    return (
      '#' +
      (0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
      )
        .toString(16)
        .slice(1)
    );
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getPaddedNumber(unPaddedNumber) {
    let paddedNumber = '001';
    if (unPaddedNumber <= 999) {
      paddedNumber = ('000' + unPaddedNumber).slice(-3);
    } else {
      paddedNumber = unPaddedNumber;
    }
    return paddedNumber;
  }

  getImageSource(unPaddedNumber) {
    let paddedNumber = this.getPaddedNumber(unPaddedNumber);
    return (
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
      paddedNumber +
      '.png'
    );
  }

  verifyType(type) {
    let types = [
      'normal',
      'fire',
      'fighting',
      'water',
      'flying',
      'grass',
      'poison',
      'electric',
      'ground',
      'psychic',
      'rock',
      'ice',
      'bug',
      'dragon',
      'ghost',
      'dark',
      'steel',
      'fairy'
    ];
    if (types.indexOf(type) > -1) {
      return true;
    } else {
      return false;
    }
  }

  toggleTypeButton(type, btn) {
    btn.classList.toggle('disabled');
    if (btn.classList.contains('disabled')) {
      for (let i = this.typeFilter.length - 1; i >= 0; i--) {
        if (this.typeFilter[i] === type) {
          this.typeFilter.splice(i, 1);
          break;
        }
      }
    } else {
      if (this.typeFilter.indexOf(type) < 0) {
        this.typeFilter.push(type);
      }
    }
  }

  setSort(type, btn, inactiveBtn) {
    this.sortType = type;
    // Set other btn inactive
    inactiveBtn.classList.add('inactive');
    btn.classList.remove('inactive');
    if (btn.classList.contains('asc')) {
      this.sortMethod = -1;
      btn.classList.toggle('asc');
    } else {
      this.sortMethod = 1;
      btn.classList.toggle('asc');
    }
  }

  search(context) {
    if (
      context['numberFrom'] < 0 ||
      context['numberFrom'] > 810 ||
      context['numberFrom'] == ''
    ) {
      context['numberFrom'] = 0;
    }
    if (
      context['numberTo'] < 0 ||
      context['numberTo'] > 810 ||
      context['numberTo'] == ''
    ) {
      context['numberTo'] = 810;
    }
    context['sortType'] = this.sortType;
    context['sortMethod'] = this.sortMethod;

    this.pokemonsService.search(context);
  }

  expandSearch(area) {
    area.classList.toggle('expanded');
  }
}
