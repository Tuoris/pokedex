import React from 'react';
import './index.css'

const API_PREFIX_URL = 'https://pokeapi.co/api/v2';
const PAGE_SIZE = 12;

function PokeCard(props) {
  return (
    <div className="card">
      <img src={props.image_url} className="card-img-top" alt={"pokemon" + props.name} />
      <div className="card-body">
        <h5 className="pokename card-title text-center">{props.name}</h5>
        <div className="poketypes-wrapper">
          {
            props.types
              .map(type => <button className="poketype btn btn-primary mx-1" key={type}>{type}</button>)
          }
        </div>

      </div>
    </div>
  )
}

function PokeInfo() {
  return (
    <div>
      <div className="card info-card my-1 mx-1">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" className="card-img-top" alt="pokemon ditto" />
        <div className="card-body">
          <h5 className="poketype card-title text-center">ditto #0004</h5>
          <table className="table">
            <tbody>
              <tr>
                <th>Type</th>
                <td>Fire</td>
              </tr>
              <tr>
                <th>Attack</th>
                <td>52</td>
              </tr>
              <tr>
                <th>...</th>
                <td>...</td>
              </tr>
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
      pokemons_next_page_url: undefined,
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

  render() {
    return (
      <div className="app container mb-4">
        <h1 className="text-center">Pokedex</h1>
        <div className="row">
          <div className="poke-cards col-sm-8">
            <div className="row px-1 py-1">
              {
                this.state.pokemons
                  .map(pokemon => {
                    let props = {
                      image_url: pokemon.sprites.front_default,
                      name: pokemon.name,
                      types: pokemon.types.map(el => el.type.name)
                    };
                    return (
                      <div className="col-sm-6 col-md-4 px-1 py-1" key={pokemon.key}>
                        <PokeCard {...props} />
                      </div>
                    )
                  })
              }
            </div>
            <div className="row">
              <button className="button-load btn btn-primary mx-2">Load More</button>
            </div>
          </div>
          <div className="poke-info col-sm-4 px-1 py-1">
            <PokeInfo />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
