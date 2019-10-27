import React from 'react';

function formatIndex(index) {
  return '#' + index.toString().padStart(3, '0');
}

function PokemonInfo(props) {
  let { pokemon } = props;
  let fields = {
    "Type": (pokemon.type),
    ...pokemon.stats
  }
  return (
    <div>
      <div className="card info-card my-1 mx-1">
        <div className="mt-2 mx-auto">
          <img
            src={pokemon.image_url}
            className="card-img-top"
            alt={"pokemon " + pokemon.name}
          />
        </div>
        <div className="card-body">
          <h5 className="pokename card-title font-weight-bold text-center"
          >{pokemon.name} {formatIndex(pokemon.index)}</h5>
          <table className="table table-bordered text-center text-capitalize mb-0">
            <tbody>
              {
                Object.keys(fields)
                  .map(key => {
                    return (<tr key={key}>
                      <td class="pokemon-stat-name-cell">{key}</td>
                      <td>{fields[key]}</td>
                    </tr>)
                  })
              }
            </tbody>
          </table>
          <div className="pokeinfo-unselect text-center mt-2">
            <button
              className="btn btn-success"
              onClick={props.pokemonUnselectCallback}
            >Close</button>
          </div>
        </div>
      </div>
      <div className="modal-back" onClick={props.pokemonUnselectCallback}></div>
    </div>
  )
}

export default PokemonInfo;