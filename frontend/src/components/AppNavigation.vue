<template>
  <span>
    <v-navigation-drawer app v-model="drawer" :clipped="true" >
      <v-list>
        <template v-for="item in items">
          <router-link :key="item.title" :to="item.path">
            <v-list-item  link>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </template>
      </v-list>

      <a href="http://www.google.co.uk">
        <v-list-item class="primary darken-2" link style="position: absolute; bottom:0; width: 100%">
          <v-list-item-action>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </a>
    </v-navigation-drawer>

    <v-app-bar app color="primary" :clipped-left="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-img
        class="mx-2"
        src="../assets/logo.png"
        max-height="40"
        max-width="40"
        contain
      ></v-img>

      <v-toolbar-title class="hidden-sm-and-down">{{appTitle}}</v-toolbar-title>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-btn text class="hidden-sm-and-down" to="/" @click="toggleOnOff">{{ machineOn ? "Off" : "On" }}</v-btn>
    </v-app-bar>
  </span>

</template>

<script>
import { eventBus } from '@/main'

export default {
  name: 'AppNavigation',
  data () {
    return {
      appTitle: 'Silvia Control',
      drawer: false,
      items: [
        { title: 'Operate', icon: 'mdi-coffee', path: '/' },
        { title: 'Information', icon: 'mdi-information', path: '/info' },
        { title: 'Settings', icon: 'mdi-cog', path: '/settings' },
        { title: 'About', icon: 'mdi-help-circle', path: '/about' }
      ]
    }
  },
  props: {
    machineOn: Boolean
  },
  methods: {
    toggleOnOff () {
      eventBus.$emit('toggleOnOff')
    }
  }
}
</script>

<style scoped>

a {
    color: white;
    text-decoration: none;
}

</style>
