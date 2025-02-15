import { Component, Input, OnChanges } from '@angular/core';
import { PokeapiService } from '../core/services/pokeapi.service.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-tabla',
  imports: [TableModule, CommonModule], // Reemplaza BrowserModule con CommonModule
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnChanges {
  @Input() selectedPokemon: any;
  abilities: any[] = [];

  constructor(private pokeapiService: PokeapiService) {}

  ngOnChanges() {
    if (this.selectedPokemon) {
      this.pokeapiService.getHability(this.selectedPokemon.id.toString()).subscribe(data => {
        this.abilities = data.abilities.map((a: any) => ({
          name: a.ability.name
        }));
      });
    }
  }
}
