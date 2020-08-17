import axios from 'axios'

export default {
  methods: {
    getSessions: function () {
      axios.get('/api/v1/session/')
        .then(response => {
          return response.data
        })
        .catch(error => console.log(error))
    }
  }
}
