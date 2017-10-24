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

    this.pokemonsService.getPokemons();
  }


    shadeColor2(color, percent) {
      var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
      return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    }

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getPaddedNumber(unPaddedNumber){
        let paddedNumber = "001";
        if (unPaddedNumber <= 999) {
            paddedNumber = ("000" + unPaddedNumber).slice(-3);
        } else {
            paddedNumber = unPaddedNumber;
        }
        return paddedNumber;
    }

    getImageSource(unPaddedNumber){
      let paddedNumber = this.getPaddedNumber(unPaddedNumber);
      return 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + paddedNumber + '.png';
    }

    verifyType(type){
      let types = ["normal", "fire", "fighting", "water", "flying", "grass", "poison", "electric", "ground", "psychic",
      "rock", "ice", "bug", "dragon", "ghost", "dark", "steel", "fairy"];
      if (types.indexOf(type) > -1) {
          return true;
      } else {
        return false;
      }
    }
}
