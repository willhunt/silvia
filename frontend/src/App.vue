<template>
  <v-app>
    <AppNaviagtion />

    <v-content>
      <v-container fluid class="mt-5">
        <v-row align="center" justify="center">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import AppNaviagtion from './components/AppNavigation'

export default {
  name: 'App',

  components: {
    AppNaviagtion
  },

  data: () => ({
    //
  })
}
</script>
