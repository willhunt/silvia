<template>
  <div class="docs-image-layout">
    <div v-for="image in images">
      <docs-image-item :src="srcBase + image.src" :caption="image.caption" :size="size"></docs-image-item>
    </div>
  </div>
</template>

<script>
import DocsImageItem from './DocsImageItem.vue'

export default {
  components: {
    DocsImageItem
  },
  data() {
    return {};
  },
  props: {
    images: Array,
    // Add to all image paths
    srcBase: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'sm'
    }
  }
};
</script>

<style scoped>
.docs-image-layout {
  display: flex;
  flex-flow: row wrap;
  margin:-5px;
  justify-content: center;
  align-items: stretch;
}
.docs-image-layout>* {
  /* flex: 1 1 160px; */
  margin: 5px;
}

</style>
