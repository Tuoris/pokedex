import React from 'react';
import './index.css'

const API_PREFIX_URL = 'https://pokeapi.co/api/v2';
const PAGE_SIZE = 12;

function PokeCard(props) {
  return (
    <div className="card">
      <div className="pokemon-thumbnail mt-2 mx-auto">
        <img src={props.image_url} className="card-img-top img-fluid" alt={"pokemon" + props.name} />
      </div>
      <div className="card-body pt-2">
        <h5 className="pokename card-title text-center">{props.name}</h5>
        <div className="poketypes-wrapper text-center">
          {
            props.types
              .map((type, index) => {
                return <button
                  className="poketype btn btn-primary m-1"
                  key={type}
                  onClick={() => props.pokemonSelectCallback({ index, type, ...props })}
                >{type}</button>
              }
              )
          }
        </div>

      </div>
    </div>
  )
}

function formatIndex(index) {
  return '#' + index.toString().padStart(3, '0');
}

function PokeInfo(props) {
  let {pokemon} = props;
  let fields = {
    "Type": (pokemon.type),
    ...pokemon.stats
  }
  return (
    <div>
      <div className="card info-card my-1 mx-1">
        <img src={pokemon.image_url} className="card-img-top" alt={"pokemon " + pokemon.name} />
        <div className="card-body">
          <h5 className="poketype card-title font-weight-bold text-center">{pokemon.name} {formatIndex(pokemon.index)}</h5>
          <table className="table table-bordered text-center text-capitalize mb-0">
            <tbody>
              {
                Object.keys(fields)
                  .map(key => {
                    return (<tr key={key}>
                      <td>{key}</td>
                      <td>{fields[key]}</td>
                    </tr>)
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal-back"></div>
    </div>
  )
}

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
                        <PokeCard {...props} pokemonSelectCallback={pokemon => this.dispaySelectedPokemon(pokemon)} />
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
            {this.state.selected_pokemon ? <PokeInfo pokemon={this.state.selected_pokemon} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
