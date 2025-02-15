import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { BuscadorComponent } from "./buscador/buscador.component";
import { CarruselComponent } from "./carrusel/carrusel.component";
import { TablaComponent } from "./tabla/tabla.component";
import { PokeapiService } from './core/services/pokeapi.service.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BuscadorComponent, CarruselComponent, TablaComponent, HttpClientModule, BrowserAnimationsModule], // Reemplaza BrowserModule con CommonModule
  providers: [PokeapiService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemonweb';
  selectedPokemon: any;
  
  constructor() {}

  onPokemonSelected(pokemon: any) {
    this.selectedPokemon = pokemon;
  }
}