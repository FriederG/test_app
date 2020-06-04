<template>
  <v-container>
    <v-layout row wrap>
      <language-switcher></language-switcher>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="info" style="margin: 20px;">{{
          $t("translation1")
        }}</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" class="info" style="margin: 20px;"
          >Organize Meetup</v-btn
        >
      </v-flex>
    </v-layout>
    <v-layout v-if="loading"
      ><v-flex xs12 class="text-center" style="padding: 30px;"
        ><v-progress-circular
          indeterminate
          style="padding: 30px;"
        ></v-progress-circular></v-flex
    ></v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            reverse-transition="fade-transition"
            transition="fade-transition"
            @click="onLoadMeetup(meetup.id)"
            ><div class="title">
              {{ meetup.title }}
            </div></v-carousel-item
          >
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 class="text-xs-center text-sm-right">
        <p>Join our awesome Meetups</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LanguageSwitcher from "@/components/LanguageSwitcher";
export default {
  components: { LanguageSwitcher },
  //Methode, bei der die Meetups aus dem vuex store geladen werden
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetup/" + id);
    },
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
}
</style>
