import React from 'react';

function PokemonCard(props) {
  return (
    <div className="card">
      <div className="pokemon-thumbnail mt-2 mx-auto">
        <img
          src={props.image_url}
          className="card-img-top img-fluid"
          alt={"pokemon" + props.name}
        />
      </div>
      <div className="card-body pt-2">
        <h5 className="pokename card-title text-center">{props.name}</h5>
        <div className="poketypes-wrapper text-center">
          {
            props.types
              .map((type, index) => {
                let poketypeClassName = `poketype-${type}`;
                return <button
                  className={"poketype btn m-1 " + poketypeClassName}
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

export default PokemonCard;