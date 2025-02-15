import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from "./buscador/buscador.component";
import { CarruselComponent } from "./carrusel/carrusel.component";
import { TablaComponent } from "./tabla/tabla.component";
import { PokeapiService } from './core/services/pokeapi.service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BuscadorComponent, CarruselComponent, TablaComponent, HttpClientModule],
  providers: [PokeapiService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedPokemon: any;

  onPokemonSelected(pokemon: any) {
    this.selectedPokemon = pokemon;
  }
}