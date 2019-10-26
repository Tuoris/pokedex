import React from 'react';
import './index.css'

function PokeCard() {
  return (
    <div className="col-sm-6 col-md-4 px-1 py-1">
      <div className="card">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" className="card-img-top" alt="pokemon ditto" />
        <div className="card-body">
          <h5 className="pokename card-title text-center">ditto</h5>
          <span className="poketype btn btn-primary">normal</span>
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

function App() {
  return (
    <div className="app container mb-4">
      <h1 className="text-center">Pokedex</h1>
      <div className="row">
        <div className="poke-cards col-sm-8">
          <div className="row px-1 py-1">
            {Array(12)
              .fill(1).map((el, i) => <PokeCard />)
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

export default App;
