<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MachineInterface :machineOn="machineOn" :temperature="temperature" />
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
  data: function () {
    return {
      machineOn: false,
      temperature: 20
    }
  }
}
</script>
