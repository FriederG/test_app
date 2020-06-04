<template
  ><v-container>
    <v-layout v-if="loading"
      ><v-flex xs12 class="text-center" style="padding: 30px;"
        ><v-progress-circular
          indeterminate
          style="padding: 30px;"
        ></v-progress-circular></v-flex></v-layout
    ><v-layout row wrap v-else
      ><v-flex xs12
        ><v-card
          ><v-card-title
            ><h4 class="text--primary">{{ meetup.title }}</h4>
            <template v-if="userIsCreator"
              ><v-spacer>
                <!--Prop übergeben an Edit Dialogs-Komponente--> </v-spacer
              ><app-edit-meetup-details-dialog
                :meetup="meetup"
              ></app-edit-meetup-details-dialog></template></v-card-title
        ></v-card>
        <v-img
          class="white--text align-end"
          height="400px"
          :src="meetup.imageUrl"
        >
        </v-img
        ><v-card-text
          ><div class="info--text">
            {{ meetup.date | date }} - {{ meetup.location }}
          </div>
          <div>
            <app-edit-meetup-date-dialog
              :meetup="meetup"
            ></app-edit-meetup-date-dialog>
            <edit-meetup-time-dialog :meetup="meetup"></edit-meetup-time-dialog>
          </div>
          <div>
            {{ meetup.description }}
          </div> </v-card-text
        ><v-card-actions
          ><v-spacer></v-spacer
          ><app-meetup-register-dialog
            :meetupId="meetup.id"
            v-if="userIsAuthenticated"
          ></app-meetup-register-dialog> </v-card-actions></v-flex></v-layout
  ></v-container>
</template>

<script>
import EditMeetupTimeDialog from "@/components/Meetup/Edit/EditMeetupTimeDialog";
export default {
  components: { EditMeetupTimeDialog },
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
