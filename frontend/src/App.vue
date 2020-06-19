<template>
  <v-app>
    <AppNaviagtion :machineOn="machineOn" />

    <v-content>
      <v-container fluid class="mt-5">
        <v-row align="center" justify="center">
          <router-view :machineOn="machineOn" :machineBrewing="machineBrewing"></router-view>
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

export default {
  name: 'App',

  components: {
    AppNaviagtion
  },

  data: function () {
    return {
      machineOn: false,
      machineBrewing: false
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
      this.machineOn = !this.machineOn

      const axiosData = {
        id: 1,
        on: this.machineOn
      }

      axios.put('/api/v1/status/1/', axiosData)
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
    })

    // Handle machine brew on/off globally
    eventBus.$on('toggleBrew', () => {
      // Can send ajax request here
      this.machineBrewing = !this.machineBrewing

      // Make sure machine is on if brewing!
      if (this.machineBrewing) {
        this.machineOn = true
      }

      const axiosData = {
        id: 1,
        brewing: this.machineBrewing,
        on: this.machineOn
      }

      axios.put('/api/v1/status/1/', axiosData)
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
    })

    eventBus.$on('updateOnOff', () => {
      axios.get('/api/v1/status/1/')
        .then(response => {
          this.machineOn = Boolean(response.data.on)
          this.machineBrewing = Boolean(response.data.brewing)
        })
        .catch(error => console.log(error))
    })
  }
}
</script>
