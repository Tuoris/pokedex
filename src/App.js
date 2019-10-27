import React from 'react';

import PokemonCard from './PokemonCard'
import PokemonInfo from './PokemonInfo'
import './index.css'
import './poketypes.scss'

const API_PREFIX_URL = 'https://pokeapi.co/api/v2';
const PAGE_SIZE = 12;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      selected_pokemon: null,
      pokemons_next_page_url: null,
      pokemon_types: [],
      isNextPageAvailable: true,
    }
  }

  fetchSinglePokemon(pokemon_url) {
    fetch(pokemon_url)
      .then(response => response.json())
      .then(pokemon => this.setState({ pokemons: this.state.pokemons.concat(pokemon) }))
  }

  fetchPokemons() {
    const pokemons_url = this.state.pokemons_next_page_url || `${API_PREFIX_URL}/pokemon/?limit=${PAGE_SIZE}`;
    fetch(pokemons_url)
      .then(response => response.json())
      .then(data => {
        this.setState({ pokemons_next_page_url: data.next })
        data.results.map(pokemon => this.fetchSinglePokemon(pokemon.url))
      });
  }

  componentDidMount() {
    this.fetchPokemons()
  }

  extractPokemonStats(pokemon) {
    let api_stats = pokemon.stats;
    let stats = {}
    stats["Attack"] = api_stats[4].base_stat;
    stats["Defence"] = api_stats[3].base_stat;
    stats["HP"] = api_stats[5].base_stat;
    stats["SP Attack"] = api_stats[2].base_stat;
    stats["SP Defence"] = api_stats[1].base_stat;
    stats["Speed"] = api_stats[0].base_stat;
    stats["Weight"] = pokemon.weight;
    stats["Total moves"] = pokemon.moves.length;
    return stats;
  }

  extractAllPokemonProperties(pokemon) {
    return {
      image_url: pokemon.sprites.front_default,
      name: pokemon.name,
      types: pokemon.types.map(el => el.type.name),
      stats: this.extractPokemonStats(pokemon),
    }
  }

  dispaySelectedPokemon(pokemon) {
    this.setState({ selected_pokemon: pokemon });
  }

  UnselectPokemon(pokemon) {
    this.setState({ selected_pokemon: null });
  }

  render() {
    return (
      <div className="app container mb-4">
        <h1 className="text-center">Pokedex</h1>
        <div className="row">
          <div className="poke-cards col-md-8 cold-md-8">
            <div className="row px-1 py-1">
              {
                this.state.pokemons
                  .map(pokemon => {
                    let props = this.extractAllPokemonProperties(pokemon);
                    return (
                      <div className="col-sm-6 col-md-4 px-1 py-1" key={pokemon.name}>
                        <PokemonCard {...props} pokemonSelectCallback={pokemon => this.dispaySelectedPokemon(pokemon)} />
                      </div>
                    )
                  })
              }
            </div>
            <div className="row">
              <button className="button-load btn btn-primary mx-2" onClick={() => this.fetchPokemons()}>Load More</button>
            </div>
          </div>
          <div className="poke-info col-md-4 px-1 py-1">
            {this.state.selected_pokemon ? <PokemonInfo pokemon={this.state.selected_pokemon} pokemonUnselectCallback={() => this.UnselectPokemon()} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
