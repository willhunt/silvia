<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MachineInterface />
  </div>
</template>

<script>
// @ is an alias to /src
import MachineInterface from '@/components/MachineInterface.vue'

export default {
  name: 'Home',
  components: {
    MachineInterface
  }
}
</script>
