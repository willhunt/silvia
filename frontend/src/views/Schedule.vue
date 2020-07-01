<template>

  <div class="schedules">
    <div v-for="schedule in schedules" :key="schedule.id">
      <schedule-entry
        :schedule="schedule"
        @saveScheduleEntry="saveSchedule"
        @deleteScheduleEntry="deleteSchedule"
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
      const emptySchedule = {
        name: 'New',
        days: '0000000',
        active: false,
        start_time: '00:00',
        end_time: '00:00'
      }
      axios.post('/api/v1/schedule/', emptySchedule)
        .then(response => {
          console.log(response)
          this.refreshSchedules()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    saveSchedule (schedule) {
      axios.put('/api/v1/schedule/' + schedule.id + '/', schedule)
        .then(response => {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    refreshSchedules () {
      axios.get('/api/v1/schedule/')
        .then(response => {
          console.log(response.data)
          this.schedules = response.data
        })
        .catch(error => console.log(error))
    },
    deleteSchedule (id) {
      axios.delete('/api/v1/schedule/' + id + '/')
        .then(response => {
          console.log(response)
          this.refreshSchedules()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    this.refreshSchedules()
  }
}
</script>

<style scoped>

</style>
