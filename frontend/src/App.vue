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
    // Handle machine on/off globally
    eventBus.$on('toggleOnOff', () => {
      // Can send ajax request here

      this.machineOn = !this.machineOn
    })
  }

}
</script>
