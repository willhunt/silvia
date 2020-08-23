<template>
  <v-app>
    <AppNaviagtion :machineOn="machineOn" />

    <v-content>
      <v-container fluid class="mt-5">
        <v-row align="center" justify="center">
          <router-view :machineOn="machineOn" :machineBrewing="machineBrewing" :machineMode="machineMode"></router-view>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
// import { axiosApi } from '@/api'
import { eventBus } from '@/main'
import AppNaviagtion from './components/AppNavigation'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.trailingSlash = true
axios.interceptors.request.use((config) => {
  if (config.addTrailingSlash && config.url[config.url.length - 1] !== '/') {
    config.url += '/'
  }
  return config
})

export default {
  name: 'App',

  components: {
    AppNaviagtion
  },

  data: function () {
    return {
      machineOn: false,
      machineBrewing: false,
      machineMode: 0
    }
  },

  watch: {
    // Change tab name in browser
    '$route' (to, from) {
      document.title = to.meta.title || 'Silvia'
    }
  },

  created () {
    // Handle machine on/off globally
    eventBus.$on('toggleOnOff', () => {
      // Can send ajax request here
      // this.machineOn = !this.machineOn
      // this.machineBrewing = false

      const axiosData = {
        id: 1,
        // on: this.machineOn,
        // brew: this.machineBrewing
        on: !this.machineOn,
        brew: false
      }

      axios.put('/api/v1/status/1/', axiosData)
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
    })

    // Handle machine brew on/off globally
    eventBus.$on('toggleBrew', () => {
      const axiosData = {
        id: 1,
        brew: !this.machineBrewing
      }

      axios.put('/api/v1/status/1/', axiosData)
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
    })

    // Handle mode change globally
    eventBus.$on('changeMode', (mode) => {
      const axiosData = {
        id: 1,
        brew: this.machineBrewing,
        on: this.machineOn,
        mode: mode
      }

      axios.put('/api/v1/status/1/', axiosData)
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
    })

    eventBus.$on('updateStatus', () => {
      axios.get('/api/v1/status/1/')
        .then(response => {
          this.machineOn = Boolean(response.data.on)
          this.machineBrewing = Boolean(response.data.brew)
          this.machineMode = Number(response.data.mode)
        })
        .catch(error => console.log(error))
    })
  }
}
</script>
