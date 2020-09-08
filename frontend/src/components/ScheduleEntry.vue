<template>
  <div class="scheduleentry">
    <v-card class="mx-auto mb-4" min-width="500">
      <v-row align="center">
        <!-- Card name edit mode -->
        <v-col v-if="editName" class="mx-4" cols="auto">
          <v-text-field label="Schedule name" v-model="scheduleLocal.name"></v-text-field>
        </v-col>
        <!-- Card name normal mode -->
        <v-col v-else cols="auto">
          <v-card-title>
            {{ scheduleLocal.name }}
          </v-card-title>
        </v-col>
        <v-col cols="auto">
          <v-btn v-if="editName" fab x-small depressed @click="saveNameField">
            <v-icon small color="grey">mdi-check</v-icon>
          </v-btn>
          <v-btn v-else fab x-small depressed @click="editName = true">
            <v-icon small color="grey">mdi-pencil</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn fab x-small outlined @click="deleteSchedule">
            <v-icon small color="grey">mdi-delete</v-icon>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <!-- Active toggle -->
        <v-col class="mx-4" cols="auto">
          <v-switch color="secondary" v-model="scheduleLocal.active" @change="saveToggleField"></v-switch>
        </v-col>
      </v-row>
      <!-- Day selector -->
      <v-row cols="auto" class="ml-4 mr-2">
        <v-col v-for="(active, index) in scheduleLocal.days.split('')" :key="index">
          <v-btn fab small depressed :class="active==1 ? 'secondary' : 'primary'" @click="saveDayField(index, active)">{{ dayLetters[index] }}</v-btn>
        </v-col>
      </v-row>
      <!-- Time -->
      <!-- <v-row v-if="showExtra" class="mx-2"> -->
      <v-row class="mx-2">
        <v-col>
          <v-dialog ref="dialog_start" v-model="dialogStart" :return-value.sync="scheduleLocal.start_time" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="scheduleLocal.start_time"
                label="Start time"
                prepend-inner-icon="mdi-clock"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-card>
              <v-time-picker
                v-if="dialogStart"
                v-model="scheduleLocal.start_time"
                color="secondary"
                format="24hr"
                full-width>
              </v-time-picker>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="error" @click="dialogStart = false">Cancel</v-btn>
                <v-btn text color="success" @click="saveStartTimeDialog($refs.dialog_start)">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col>
          <v-dialog ref="dialog_end" v-model="dialogEnd" :return-value.sync="scheduleLocal.end_time" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="scheduleLocal.end_time"
                label="End time"
                prepend-inner-icon="mdi-clock"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-card>
              <v-time-picker
                v-if="dialogEnd"
                v-model="scheduleLocal.end_time"
                color="secondary"
                format="24hr"
                :min="scheduleLocal.start_time"
                full-width></v-time-picker>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="error" @click="dialogEnd = false">Cancel</v-btn>
                <v-btn text color="success" @click="saveEndTimeDialog($refs.dialog_end)">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      dayLetters: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      showExtra: false,
      dialogStart: false,
      dialogEnd: false,
      scheduleLocal: null,
      editName: false
    }
  },
  props: {
    schedule: Object
  },
  methods: {
    saveToggleField () {
      this.saveSchedule()
    },
    saveSchedule () {
      this.$emit('saveScheduleEntry', this.scheduleLocal)
    },
    saveStartTimeDialog (dialog) {
      dialog.save(this.scheduleLocal.start_time)
      this.dialogStart = false
      this.saveSchedule()
    },
    saveEndTimeDialog (dialog) {
      dialog.save(this.scheduleLocal.end_time)
      this.dialogEnd = false
      this.saveSchedule()
    },
    saveNameField () {
      this.editName = false
      this.saveSchedule()
    },
    saveDayField (index, activePrev) {
      // Update days
      const active = (activePrev === '0') ? '1' : '0'
      this.scheduleLocal.days = this.scheduleLocal.days.substr(0, index) + active + this.scheduleLocal.days.substr(index + 1)
      this.saveSchedule()
    },
    deleteSchedule () {
      this.$emit('deleteScheduleEntry', this.scheduleLocal.id)
    }
  },
  beforeMount () {
    this.scheduleLocal = Object.assign({}, this.schedule)
    // this.scheduleLocal = JSON.parse(JSON.stringify(this.schedule))
  }
}
</script>

<style scoped>

</style>
