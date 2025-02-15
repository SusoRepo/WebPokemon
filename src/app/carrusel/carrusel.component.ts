import { Component, Inject, Input, OnChanges } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PokeapiService } from '../core/services/pokeapi.service.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, CommonModule], // Reemplaza BrowserModule con CommonModule
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'] // Corrige el nombre de la propiedad a styleUrls
})
export class CarruselComponent implements OnChanges {
  @Input() selectedPokemon: any;
  evolutionChain: any[] = [];

  constructor(@Inject(PokeapiService) private pokeapiService: PokeapiService) {}

  ngOnChanges() {
    if (this.selectedPokemon) {
      this.pokeapiService.getEvolutionChain(this.selectedPokemon.id.toString()).subscribe(data => {
        this.evolutionChain = [];
        let chain = data.chain;
        while (chain) {
          this.evolutionChain.push({
            name: chain.species.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getPokemonId(chain.species.url)}.png`
          });
          chain = chain.evolves_to[0];
        }
      });
    }
  }

  getPokemonId(url: string): string {
    return url.split('/').filter(Boolean).pop() || '1';
  }
}
