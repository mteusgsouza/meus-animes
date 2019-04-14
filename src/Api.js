import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'//onde o json-server está funcionando
})

export const loadGenres = () => api.get('genres')
export const saveAnime = (newAnime) => api.post('animes', newAnime)
export const updateAnime= (animes) => api.put('animes/'+animes.id,animes)
export const loadAnimesByGenre = (genre) => api.get('animes?genre=' + genre)
export const deleteAnimes = (id) => api.delete('animes/' + id)
export const loadAnimeById = (id) => api.get('animes/' + id)

const apis = {
    loadGenres,
    saveAnime,
    updateAnime,
    loadAnimesByGenre,
    deleteAnimes,
    loadAnimeById
}
export default apis