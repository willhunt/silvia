import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#eeeeee',
        secondary: '#90a4ae',
        accent: '#ff5722',
        error: '#f44336',
        warning: '#e91e63',
        info: '#9c27b0',
        success: '#4caf50'
      }
    }
  }
})
