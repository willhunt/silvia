<template>
  <div class="graph">
    <v-card class="mx-auto text-center" min-width="600">
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="temperatures"
            color="error"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-card-text>
        <div class="display-1 font-weight-thin">Boiler Temperature</div>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
export default {
  name: 'GraphDisplay',
  props: {
    machineOn: Boolean,
    temperatures: Array
  }
}
</script>

<style scoped>

</style>
