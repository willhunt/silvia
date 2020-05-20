<template>
  <div class="machine">

    <h1>Rancillio Silvia ({{ machineOn }})</h1>
    <div v-if="machineOn">
      <img class="machine-image" src="@/assets/Silvia_Illustration_on.png"/>
    </div>
    <div v-else>
      <img class="machine-image" src="@/assets/Silvia_Illustration_off.png"/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MachineDisplay',
  props: {
    machineOn: Boolean,
    temperature: Number
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
