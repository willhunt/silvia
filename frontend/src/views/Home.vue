<template>

  <div class="home">
    <MachineInterface :machineOn="machineOn" :machineBrewing="machineBrewing" :machineMode="machineMode" />
  </div>

</template>

<script>
// @ is an alias to /src
import MachineInterface from '@/components/MachineInterface.vue'

export default {
  name: 'Home',
  components: {
    MachineInterface
  },
  props: {
    machineOn: Boolean,
    machineBrewing: Boolean,
    machineMode: Number
  }
}

</script>

<style scoped>

</style>
