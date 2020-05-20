<template>
  <div class="machine-interface">
    <MachineDisplay :machineOn="machineOn" :temperature="temperature" />
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* Image of machine */
.machine-image {
  height: 500px
}
</style>
