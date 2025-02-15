import { Component, Input, OnChanges } from '@angular/core';
import { PokeapiService } from '../core/services/pokeapi.service.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnChanges {
  @Input() selectedPokemon: any;
  abilities: any[] = [];
  types: string = '';

  constructor(private pokeapiService: PokeapiService) {}

  ngOnChanges() {
    if (this.selectedPokemon) {
      this.pokeapiService.getHability(this.selectedPokemon.id.toString()).subscribe(data => {
        this.abilities = data.abilities.map((a: any) => ({
          name: a.ability.name,
          effect: a.ability.url // Puedes obtener más detalles si es necesario
        }));
        this.types = data.types.map((t: any) => t.type.name).join(', ');
      });
    }
  }
}
