<template>
  <v-app>
    <AppNaviagtion :machineOn="machineOn" />

    <v-content>
      <v-container fluid class="mt-5">
        <v-row align="center" justify="center">
          <router-view :machineOn="machineOn"></router-view>
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
import { eventBus } from '@/main'
import AppNaviagtion from './components/AppNavigation'

export default {
  name: 'App',

  components: {
    AppNaviagtion
  },

  data: function () {
    return {
      machineOn: false
    }
  },

  created () {
    //  Register eventbus methods:

    // Handle machine on/off globally
    eventBus.$on('toggleOnOff', () => {
      // Can send ajax request here
      this.machineOn = !this.machineOn

      const axiosData = {
        id: 1,
        on: this.machineOn
      }
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      axios.put('/api/v1/status/1', axiosData, axiosConfig)
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
    })

    eventBus.$on('updateOnOff', () => {
      axios.get('/api/v1/status/1')
        .then(response => {
          this.machineOn = Boolean(response.data.on)
        })
        .catch(error => console.log(error))
    })

    // Now fire event to check on/off status
    // eventBus.$emit('updateOnOff')

  }

}
</script>
