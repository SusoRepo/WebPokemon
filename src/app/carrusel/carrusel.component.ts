import { Component, Input, OnChanges } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { PokeapiService } from '../core/services/pokeapi.service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'],
})
export class CarruselComponent implements OnChanges {
  @Input() selectedPokemon: any;
  evolutionChain: any[] = [];

  constructor(private pokeapiService: PokeapiService) {}

  ngOnChanges() {
    if (this.selectedPokemon) {
      this.pokeapiService
        .getEvolutionChain(this.selectedPokemon.id.toString())
        .subscribe((data) => {
          this.evolutionChain = this.parseEvolutionChain(data.chain);
        });
    }
  }

  parseEvolutionChain(chain: any): any[] {
    const evolutions: any[] = [];
    this.traverseChain(chain, evolutions);
    return evolutions;
  }

  traverseChain(chain: any, evolutions: any[]) {
    if (chain.species) {
      const id = this.getPokemonId(chain.species.url);
      evolutions.push({
        name: chain.species.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      });
    }

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolution: any) => {
        this.traverseChain(evolution, evolutions);
      });
    }
  }

  getPokemonId(url: string): string {
    return url.split('/').filter(Boolean).pop() || '1';
  }
}
