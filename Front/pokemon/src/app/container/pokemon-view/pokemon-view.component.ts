import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/service/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.css']
})
export class PokemonViewComponent {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pokemonId = params['id'];
      this.getPokemonDetails(pokemonId);
    });
  }

  getPokemonDetails(id: string): void {
    this.pokemonService.getPokemonById(id).subscribe(data => {
      this.pokemon = data;
    });
  }
}