import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PokeapiService } from '../core/services/pokeapi.service.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule, AutoCompleteModule, CommonModule], // Reemplaza BrowserModule con CommonModule
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  selectedPokemon: any;

  @Output() pokemonSelected = new EventEmitter<any>();

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit() {
    this.pokeapiService.getAllPokemons('150').subscribe(data => {
      console.log(data); // Verifica los datos en la consola
      this.pokemons = data.results.map((p: any) => ({
        name: p.name,
        id: this.extractPokemonId(p.url)
      }));
    }, error => {
      console.error('Error al cargar los datos de la API', error); // Manejo de errores
    });
  }

  searchPokemon(event: any) {
    let query = event.query.toLowerCase();
    this.filteredPokemons = this.pokemons.filter(p => p.name.toLowerCase().includes(query));
  }

  onPokemonSelect() {
    this.pokemonSelected.emit(this.selectedPokemon);
  }

  extractPokemonId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10); // Obtiene el ID desde la URL
  }
}