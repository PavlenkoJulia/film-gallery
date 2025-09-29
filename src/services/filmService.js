const API_BASE_URL = 'http://localhost:3001';

class FilmService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getFilms() {
    return this.request('/films');
  }

  async getFilmById(id) {
    return this.request(`/films/${id}`);
  }

  async createFilm(filmData) {
    return this.request('/films', {
      method: 'POST',
      body: JSON.stringify(filmData),
    });
  }

  async updateFilm(id, filmData) {
    return this.request(`/films/${id}`, {
      method: 'PUT',
      body: JSON.stringify(filmData),
    });
  }

  async deleteFilm(id) {
    return this.request(`/films/${id}`, {
      method: 'DELETE',
    });
  }
}

export const filmService = new FilmService();