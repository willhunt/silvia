<template>
  <div class="scheduleentry">
    <v-card class="mx-auto mb-4" min-width="500">
      <v-row>
        <v-col cols="auto">
          <v-card-text>
            {{ name }}
          </v-card-text>
          <v-row class="ml-4 mr-2">
            <v-col v-for="(active, index) in days.split('')" :key="index">
              <v-btn fab small depressed :class="active==1 ? 'secondary' : 'primary'">{{ dayLetters[index] }}</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="mx-4" cols="auto">
          <v-switch color="secondary" :value="active" @change="toggleActive"></v-switch>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ScheduleEntry',
  data: function () {
    return {
      dayLetters: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    }
  },
  props: {
    name: String,
    days: String,
    start_time: String,
    end_time: String,
    active: Boolean
  },
  // computed: {
  //   dayActives: function () {

  //   }
  // },
  methods: {
    toggleActive () {
      console.log('Toggle active')
    }
  }
}
</script>

<style scoped>

</style>
