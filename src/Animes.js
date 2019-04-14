import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './Api'

const statuses = {
  watched: "Assistido",
  watching: "Assistindo",
  toWatch: "Assistir"
}

class Animes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      animes: []
    }
    this.renderAnimes = this.renderAnimes.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.setState({ isLoading: true })
    api.loadAnimesByGenre(this.props.match.params.genre).then((res) => {
      this.setState({
        isLoading: false,
        animes: res.data
      })
    })
  }

  deleteAnimes(id) {
    api.deleteAnimes(id).then((res) => this.loadData())
  }

  renderAnimes(animes) {
    return (
      <div className="card" style={styles.card}>
      <div key={animes.id} className="item  col-xs-12 col-lg-12">
        <div className="thumbnail">
          <img className="group list-group-image" src="http://placehold.it/150x212/000/fff" alt="" />
          <div className="caption">
            <h4 className="group inner list-group-item-heading">
              {animes.name}</h4>
            <div >
              <div className="col-xs-12 col-md-12">
                <p>{animes.genre} / {statuses[animes.status]}</p>
              </div>
              <div className="col-xs-12 col-md-12">
                <div className="btn-group">
                  <Link className="btn btn-success" to={'/anime-edit/' + animes.id}>Editar</Link>
                  <button type="button" className="btn btn-danger"
                    onClick={
                      () => { if (window.confirm('Tem certeza que deseja excluir?')) this.deleteAnimes(animes.id) }}
                  >Excluir
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <div style={styles.title}>
          <h1>Animes - {this.props.match.params.genre} </h1>
        </div>
        {
          this.state.isLoading && <p> Carregando, aguarde...</p>
        }
        {
          !this.state.isLoading && this.state.animes.length === 0 &&
          <div className='alert alert-info'>Nenhum anime cadastrado em {this.props.match.params.genre}.</div>
        }
        <div id="animes" className="row" style={{marginLeft:"6%"}}>
          {!this.state.isLoading &&
            this.state.animes.map(this.renderAnimes)
          }
        </div>
      </div>
    )
  }
}

const styles = {
  title: {
    marginTop: "8%",
    marginBottom: "2%",
    textAlign: "center"
  },
  card:{
    width:"-190%",
    padding: "1%",
    marginBottom: "1%",
    marginLeft: "1%",
    textAlign:"center",
    boxShadow: "0px 25px 26px -8px rgba(0,0,0,0.32)"
  }
}
export default Animes