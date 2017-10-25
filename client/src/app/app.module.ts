import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { D3Service } from 'd3-ng2-service';

import { AppComponent } from './app.component';
import { pokemonsReducer } from './shared';
import { HomepageComponent } from './homepage/homepage.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { MypageComponent } from './mypage/mypage.component';
import { StackedChartComponent } from './stackedchart/stackedchart.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'pokemons', component: PokemonsComponent },
  { path: 'me', component: MypageComponent },
  { path: 'pokemons/:id', component: PokemonComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    HomepageComponent,
    PokemonComponent,
    MypageComponent,
    StackedChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ pokemons: pokemonsReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule {}
