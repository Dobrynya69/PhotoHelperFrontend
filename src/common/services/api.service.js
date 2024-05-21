import JwtService from '@/common/services/jwt.service'

const ApiService = {
  setHeader() {
    this.axios.defaults.headers.common['Authorization'] = `Token ${JwtService.getToken()}`
  },

  get(path, params) {
    this.axios.get(path, params).then((response) => {
      return response
    })
  },

  post(path, data) {
    this.axios.post(path, data).then((response) => {
      return response
    })
  },

  put(path, data) {
    this.axios.put(path, data).then((response) => {
      return response
    })
  },

  delete(path) {
    this.axios.delete(path).then((response) => {
      return response
    })
  }
}

export default ApiService
