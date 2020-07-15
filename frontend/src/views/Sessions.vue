<template>

  <div class="sessions">
    <v-card class="mx-auto mb-4" min-width=350 max-width=1200>
      <v-row align="center" class="ml-0 mr-4">
        <v-col cols="auto">
          <v-card-title>Sessions</v-card-title>
        </v-col>
        <!-- <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn icon @click="showTable = !showTable" >
            <v-icon>{{ showTable ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-col> -->
      </v-row>
      <v-data-table class="mx-4"
        :headers="headers"
        :items="sessions"
        v-model="selected"
        :sort-by="['start_date', 'start_time']"
        :sort-desc="[true, true]"
        show-select>
      </v-data-table>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="accent lighten-1" @click="viewData">Graph</v-btn>
        <v-btn class="error" @click="deleteSessions">Delete</v-btn>
        <v-btn class="secondary" @click="loadSessions">Reload</v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Sessions',
  components: {
  },
  data: function () {
    return {
      sessions: [],
      selected: [],
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Date', value: 'start_date' },
        { text: 'Time', value: 'start_time' },
        { text: 'Duration', value: 'duration' },
        { text: 'Active', value: 'active' }
      ]
    }
  },
  methods: {
    loadSessions () {
      axios.get('/api/v1/session/')
        .then(response => {
          console.log(response.data)
          this.sessions = response.data
          // Calculate duration for each session
          this.sessions.forEach((item, index) => {
            const startDateTime = new Date(item.t_start)
            let endDateTime = new Date(item.t_end)
            if (item.t_end == null) {
              endDateTime = Date.now()
            }
            const deltaMinutes = Math.ceil((endDateTime - startDateTime) / (1000 * 60))
            const minutes = deltaMinutes % 60
            const hours = (deltaMinutes - minutes) / 60
            item.duration = hours.toString() + ':' + (minutes < 10 ? '0' : '') + minutes.toString()
          })
        })
        .catch(error => console.log(error))
    },
    deleteSessions () {
      this.selected.forEach((item, index) => {
        // Delete from databse
        axios.delete('/api/v1/session/' + item.id + '/')
          .then(response => {
            console.log(response.data)
          })
          .catch(error => console.log(error))
        // Remove from list on webpage
        this.loadSessions()
      })
    },
    viewData () {
      // Get session id's
      const sessionIds = []
      this.selected.forEach((item, index) => {
        sessionIds.push(item.id)
      })

      this.$router.push({ name: 'Session', params: { sessionIds: sessionIds.join(',') } })
    }
  },
  created () {
    this.loadSessions()
  }
}
</script>

<style scoped>

</style>
