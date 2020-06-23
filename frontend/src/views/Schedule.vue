<template>

  <div class="schedules">
    <div v-for="schedule in schedules" :key="schedule.id">
      <schedule-entry
        :name="schedule.name"
        :days="schedule.days"
        :start_time="schedule.start_time"
        :end_time="schedule.end_time"
        :active="schedule.active"
      ></schedule-entry>
    </div>

    <v-btn fixed fab bottom right class="accent" @click="addSchedule">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>

</template>

<script>
import axios from 'axios'
import ScheduleEntry from '@/components/ScheduleEntry.vue'

export default {
  name: 'Schedules',
  components: {
    ScheduleEntry
  },
  data: function () {
    return {
      schedules: []
    }
  },
  methods: {
    addSchedule () {

    },
    removeSchedule () {

    }
  },
  created () {
    axios.get('/api/v1/schedule/')
      .then(response => {
        console.log(response.data)
        this.schedules = response.data
      })
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>

</style>
