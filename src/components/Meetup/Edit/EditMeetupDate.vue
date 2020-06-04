<template>
  <v-dialog width="350px" persistent v-model="editDialog"
    ><template v-slot:activator="{ on }">
      <v-btn v-on="on" style="margin: 10px;">
        Edit Date
      </v-btn></template
    >
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" actions style="width: 100%;">
              <template>
                <v-btn text @click.native="editDialog = false">Close</v-btn>
                <v-btn @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableDate: null,
    };
  },
  methods: {
    onSaveChanges() {
      console.log("saved");
      console.log(this.meetup.date);
      console.log(this.editableDate);
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate,
      });
    },
  },
  created() {
    const pickerDate = new Date(this.meetup.date);
    this.editableDate =
      pickerDate.getUTCFullYear() +
      "-" +
      (pickerDate.getUTCMonth() + 1) +
      "-" +
      pickerDate.getUTCDate();
  },
};
</script>
