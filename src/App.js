import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import NewAnime from './NewAnime'
import Animes from './Animes'
import EditAnime from './EditAnime'

//isso é um functional stateless component, que carrega o About 
const About = () => (
  <section className="intro-section">
    <h1>Sobre</h1><br/>
    <p>Esta é uma aplicação para cadastro e controle de animes, criado a partir do minicurso gratuito de ReactJS criado pelo devPleno.</p>
  </section>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav
            className="navbar navbar-expand-sm navbar-light bg-light fixed-top"
            role="navigation">
            <div className="container">

              <Link className="navbar-brand" to="/">
                <img src="/images/logo.png" height="30" />
              </Link>

              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/new">Novo Anime</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about"> Sobre </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/*caminho para acessar com o Link*/}
          <Route exact path="/" component={Home} />
          <Route path='/animes/:genre' component={Animes} />
          <Route path='/anime-edit/:id' component={EditAnime} />
          <Route exact path="/about" component={About} />
          <Route exact path="/new" component={NewAnime} />

        </div>
      </Router>
    )
  }
}

export default App
