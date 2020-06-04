<template>
  <v-dialog persistent v-model="registerDialog"
    ><template v-slot:activator="{ on }">
      <v-btn
        class="v-btn--outlined"
        v-on="on"
        style="margin: 10px; color: green;"
      >
        {{ userIsRegistered ? "Unregister" : "Register" }}
      </v-btn></template
    >
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered"
              >Unregister from Meetup</v-card-title
            >
            <v-card-title v-else>Register for Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text
              >You can allways change your decision later on.</v-card-text
            >
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions
              ><v-btn text @click="registerDialog = false">Cancel</v-btn
              ><v-btn class="green--text" @click="onAgree"
                >Confirm</v-btn
              ></v-card-actions
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false,
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex((meetupId) => {
          //checkt, ob in meetup registriert
          return meetupId === this.meetupId;
        }) >= 0 //wenn sich etwas in dem Array befindet
      );
    },
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unregisterUserFromMeetup", this.meetupId);
      } else {
        this.$store.dispatch("registerUserForMeetup", this.meetupId);
      }
    },
  },
};
</script>
