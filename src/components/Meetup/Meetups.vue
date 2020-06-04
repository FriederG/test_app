<template
  ><v-container>
    <v-container v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="meetup.imageUrl"
        >
          <v-card-title>{{ meetup.title }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">{{ meetup.date | date }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ meetup.description }}</div>
        </v-card-text>
        <v-card-actions
          ><v-btn outlined :to="/meetup/ + meetup.id">
            View Meetup</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
  },
};
</script>
