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
      <v-btn color="secondary">{{ machineOn ? "On" : "Off" }}</v-btn>
      <v-btn outlined color="secondary" @click="changeDisplay">{{ temperature }}&#8451;</v-btn>
    </div>
  </div>
</template>

<script>
import MachineDisplay from '@/components/MachineDisplay.vue'
import GraphDisplay from '@/components/GraphDisplay.vue'

export default {
  name: 'MachineInterface',
  components: {
    MachineDisplay,
    GraphDisplay
  },
  data: function () {
    return {
      machineOn: false,
      temperature: 20,
      temperatures: [20, 30, 40, 45, 49, 53, 56, 58, 59, 60, 60, 61, 60, 59, 60],
      displayOption: 'machine'
    }
  },
  methods: {
    changeDisplay: function () {
      if (this.displayOption === 'machine') {
        this.displayOption = 'graph'
      } else {
        this.displayOption = 'machine'
      }
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
