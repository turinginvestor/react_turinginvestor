import axios from 'axios'

const API_BASE_URL = 'https://ampyfin-website-pyj4.onrender.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const searchETFs = async (query, maxResults = 10) => {
  try {
    const response = await api.get('/v1/etf/search', {
      params: { q: query, max_results: maxResults },
    })
    return response.data
  } catch (error) {
    console.error('Error searching ETFs:', error)
    throw error
  }
}

export const getETFData = async (symbol) => {
  try {
    const response = await api.get(`/v1/etf/${symbol.toUpperCase()}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching ETF data for ${symbol}:`, error)
    throw error
  }
}

export const comparePortfolio = async (allocations) => {
  try {
    const response = await api.post('/v1/portfolio/compare', { allocations })
    return response.data
  } catch (error) {
    console.error('Error comparing portfolio:', error)
    throw error
  }
}

