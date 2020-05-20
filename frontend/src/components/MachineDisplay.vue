<template>
  <div class="machine">

    <div v-if="machineOn">
      <img class="machine-image" src="@/assets/Silvia_Illustration_on.png"/>
    </div>
    <div v-else>
      <img class="machine-image img-center" src="@/assets/Silvia_Illustration_off.png"/>
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
.machine-interface {
  margin: auto;
}
/* Image of machine */
.img-center  {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.machine-image {
    height: 500px;
}
</style>
