import React, { Component } from "react"
import api from "./Api"
import { Redirect } from 'react-router-dom'


const statuses = {
  watched: "Assistido",
  watching: "Assistindo",
  toWatch: "Assistir"
}

class EditAnime extends Component {
  constructor(props) {
    super(props)

    this.state = {
      genres: [],
      isLoading: false,
      redirect: false,
      animes: {}
    }
    this.saveAnime = this.saveAnime.bind(this)
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    //carrega informações do registo a ser editado nos campos do formulário
    api.loadAnimeById(this.props.match.params.id)
      .then((res) => {
        this.setState({ animes: res.data })
        this.refs.name.value = this.state.animes.name
        this.refs.genre.value = this.state.animes.genre
        this.refs.comments.value = this.state.animes.comments
        this.refs.status.value = this.state.animes.status
      })

    api.loadGenres()
      .then(res => {
        this.setState({
          isLoading: false,
          genres: res.data
        })
      })
  }
  //envia os dados do formulário para updateAnime
  saveAnime() {
    const newAnime = {
      id: this.props.match.params.id,
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comments: this.refs.comments.value
    }
    api.updateAnime(newAnime)
      .then((res) => {
        this.setState({
          redirect: '/animes/' + this.refs.genre.value
        })
      })
  }
  render() {
    return (
      <div className="container">
        {
          this.state.redirect &&
          <Redirect to={this.state.redirect} />
        }
        <div style={styles.title}>
          <h1>Novo Anime</h1>
        </div>
        <form>
          <div style={styles.formAnime}>
            <div className="col-md-12">
              <label for="nome" style={styles.label}>Nome:</label>
              <input id="nome" type="text" ref='name' className="form-control" />
            </div>
            <div className="col-12">
              <label className="col-sm-2" for="status" style={styles.label}> Status:</label>
              <select className="col-sm-4" id="status" ref='status' >
                {Object.keys(statuses)
                  .map(key =>
                    <option key={key} value={key}>
                      {statuses[key]}
                    </option>
                  )}
              </select>
            </div>
            <div className="col-12">
              <label className="col-sm-2" for="genero" style={styles.label}>Gênero:</label>
              <select className="col-sm-6" id="genero" ref='genre'>
                {this.state.genres.map(key => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12">
              <label for="comentarios" style={styles.label}> Comentários:</label>
              <textarea id="comentarios" ref='comments' type="text" className="form-control" /> <br />
            </div>
            <button type="button" className="col-8 btn btn-success" onClick={this.saveAnime} style={styles.btn}>Salvar</button>
          </div>
        </form>
      </div>

    )
  }
}

const styles = {
  title: {
    marginTop: "8%",
    textAlign: "center"
  },
  label: {
    padding: "1%",
    marginTop: "1%",
    marginBottom: "1%",
  },
  btn: {
    marginLeft: "17%",

  },
  formAnime: {
    marginLeft: "30%",
    marginRight: "30%",
    paddingTop: "1%",
    paddingBottom: "1%",
    borderRadius: 10,
    backgroundColor: "#d8d8d8",
    boxShadow: "10px 10px 18px -7px rgba(0,0,0,0.56)"
  }
}
export default EditAnime
