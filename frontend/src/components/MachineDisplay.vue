<template>
  <div class="machine">

    <div v-if="machineOn">
      <v-img class="machine-image img-center" min-width="150" max-width="350" src="@/assets/Silvia_Illustration_on.png" contain />
    </div>
    <div v-else>
      <v-img class="machine-image img-center" min-width="150" max-width="350" src="@/assets/Silvia_Illustration_off.png" contain />
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
/* .machine-image {
    height: 500px;
} */
</style>
