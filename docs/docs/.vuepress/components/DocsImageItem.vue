<template>
  <div class="docs-image-item" :class="size">
    <div>
      <img :src="src">
    </div>
    <div class="caption">
      {{ caption }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    src: String,
    caption: String,
    size: {
      type: String,
      default: "sm"
    }
  }
};
</script>

<style scoped>
  .docs-image-item {
    /* border-radius: 4px; */
    /* border: 1px solid #ddd; */
    padding: 1rem 1rem;
  }
  .caption {
    font-style: italic;
    font-size: 90%;
    text-align: center;
    color: rgb(100, 100, 100);
    padding-top: 8px;
  }
  .sm {
    min-width: 150px;
    max-width: 200px;
  }
  .lg {
    min-width: 400px;
    max-width: 600px;
  }


</style>
