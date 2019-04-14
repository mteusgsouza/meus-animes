import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './Api'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      genres: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    api.loadGenres()
      .then((res) => {
        this.setState({
          isLoading: false,
          genres: res.data
        })
      })
  }
  // carrega uma lista dos generos existentes
  renderGenreLink(genre) {
    return (
      <Link key={genre} className="btn btn-info btn-lg" to={`/animes/${genre}`}>
        {genre}
      </Link>
    )
  }

  render() {
    return (
      <div >
        <section id="intro" className="intro-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1><img src="images/logo.png" /></h1>
                <p>Nunca mais esqueça um anime que você assistiu ou que alguém lhe indicou.</p>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          
            <section>
              {
                this.state.isLoading &&
                <span>Aguarde, carregando...</span>
              }
              {
                !this.state.isLoading &&
                <div>
                  <h4>Ver animes do genêro:</h4>
                  <div className="row">
                  <div className="mx-auto">
                    <div className="btn-group">
                      {(this.state.genres.map(this.renderGenreLink))}
                    </div>
                  </div>
                </div>
                </div>
              }
            </section>
          </div>
        </div>

    )
  }
}
export default Home