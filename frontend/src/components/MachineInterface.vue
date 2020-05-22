<template>
  <div class="machine-interface">
    <div v-if="displayOption == 'machine'">
      <MachineDisplay :machineOn="machineOn" :temperature="temperature" />
    </div>
    <div v-if="displayOption == 'graph'">
      <GraphDisplay :temperatures="temperatures" />
    </div>
    <br>
    <div class="d-flex justify-space-between">
      <v-btn color="secondary" @click="toggleOnOff">{{ machineOn ? "On" : "Off" }}</v-btn>
      <v-btn outlined :color="tempBtnColor" @click="changeDisplay">
        <div v-if="displayOption == 'machine'">
          <v-icon class="mr-2">mdi-chart-line</v-icon>
        </div>
        {{ temperature }}&#8451;
      </v-btn>
    </div>
  </div>
</template>

<script>
import MachineDisplay from '@/components/MachineDisplay.vue'
import GraphDisplay from '@/components/GraphDisplay.vue'
import { eventBus } from '@/main'

export default {
  name: 'MachineInterface',
  components: {
    MachineDisplay,
    GraphDisplay
  },
  data: function () {
    return {
      temperature: 59,
      temperatures: [20, 30, 40, 45, 49, 53, 56, 58, 59, 60, 60, 61, 60, 59, 60],
      displayOption: 'machine',
      setpoint: 60
    }
  },
  props: {
    machineOn: Boolean
  },
  computed: {
    tempBtnColor: function () {
      if (Math.abs(this.setpoint - this.temperature) < 2) {
        return 'success'
      }
      return 'secondary'
    }
  },
  methods: {
    changeDisplay: function () {
      if (this.displayOption === 'machine') {
        this.displayOption = 'graph'
      } else {
        this.displayOption = 'machine'
      }
    },
    toggleOnOff () {
      eventBus.$emit('toggleOnOff')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.machine-interface {
  margin: auto;
}
</style>
