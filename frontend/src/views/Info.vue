<template>
  <div>
    <v-card class="mx-4">
      <v-card-title>Brewing information</v-card-title>
      <v-card-subtitle>Some useful target brewing paramaters</v-card-subtitle>
      <v-data-table class="mx-4" :headers="headers" :items="params" disable-pagination hide-default-footer>
      </v-data-table>
      <v-card-actions>
        <v-spacer></v-spacer>
        <router-link to="/settings">
          <v-btn icon>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data: function () {
    return {
      headers: [
        { text: 'Parameter', value: 'parameter' },
        { text: 'Value', value: 'value' },
        { text: 'Units', value: 'units' }
      ],
      params: [
        { id: 0, parameter: 'Water Temperature', value: 88, units: 'C' },
        { id: 1, parameter: 'Brew Volume', value: 50, units: 'ml' },
        { id: 2, parameter: 'Extraction Time', value: 25, units: 's' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
