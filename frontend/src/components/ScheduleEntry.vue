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
      <!-- Time -->
      <v-row v-if="showExtra" class="mx-2">
        <v-col>
          <v-dialog ref="dialog" v-model="dialogStart" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="start_time"
                label="Start time"
                prepend-icon="mdi-clock"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-card>
              <v-time-picker v-if="dialogStart" :value="start_time" color="secondary" full-width></v-time-picker>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="error" @click="dialogStart = false">Cancel</v-btn>
                <v-btn text color="success" @click="updateStartTime($event)">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col>
          <!-- <v-time-picker v-model="picker" color="secondary"></v-time-picker> -->
        </v-col>
      </v-row>
      <!-- Actions -->
      <v-card-actions >
        <v-spacer></v-spacer>
        <div v-if="showExtra">
          <v-icon class="mx-2">mdi-content-save</v-icon>
        </div>
        <v-btn icon @click="showExtra = !showExtra" >
          <v-icon>{{ showExtra ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ScheduleEntry',
  data: function () {
    return {
      dayLetters: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      showExtra: false,
      dialogStart: false
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
    },
    updateStartTime (event) {
      console.log('update time')
    }
  }
}
</script>

<style scoped>

</style>
