<template>

  <div class="home">
    <MachineInterface :machineOn="machineOn"/>
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
    machineOn: Boolean
  }
}

</script>

<style scoped>

</style>
