<template>
  <div class="machine-interface">
    <MachineDisplay :machineOn="machineOn" :temperature="temperature" />
    <br>
    <div class="d-flex justify-space-between">
      <v-btn color="secondary">{{ machineOn ? "On" : "Off" }}</v-btn>
      <v-btn outlined color="secondary">{{ temperature }}&#8451;</v-btn>
    </div>
  </div>
</template>

<script>
import MachineDisplay from '@/components/MachineDisplay.vue'

export default {
  name: 'MachineInterface',
  components: {
    MachineDisplay
  },
  data: function () {
    return {
      machineOn: false,
      temperature: 20
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
