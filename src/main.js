import Vue from "vue";
import App from "./App.vue";
//alles aus dem Firebase Package importieren
import * as firebase from "firebase";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store/index";
import DateFilter from "./filters/date";
import AlertCmp from "./components/shared/alert";
import EditMeetupDetailsDialog from "./components/Meetup/Edit/EditMeetupDetailsDialog";
import EditMeetupDateDialog from "./components/Meetup/Edit/EditMeetupDate";
import EditMeetupTimeDialog from "./components/Meetup/Edit/EditMeetupTimeDialog";
import RegisterDialog from "./components/Meetup/Registration/RegisterDialog";
import VueI18n from "vue-i18n";
import messages from "./lang";

import langSwitch from "./components/LanguageSwitcher";
import './registerServiceWorker'

Vue.config.productionTip = false;

//wird global registriert
Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertCmp);
Vue.component("app-edit-meetup-details-dialog", EditMeetupDetailsDialog);
Vue.component("app-edit-meetup-date-dialog", EditMeetupDateDialog);
Vue.component("app-edit-meetup-time-dialog", EditMeetupTimeDialog);
Vue.component("app-meetup-register-dialog", RegisterDialog);

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: "de",
  fallbackLocale: "de",
  messages,
});

new Vue({
  router,
  store,
  i18n,
  langSwitch,
  vuetify,

  render: (h) => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAglJ-dxtSD9Ik1v4Ns5XkRJm1w6V_t7zo",
      authDomain: "meetup-tutorial-84587.firebaseapp.com",
      databaseURL: "https://meetup-tutorial-84587.firebaseio.com",
      projectId: "meetup-tutorial-84587",
      storageBucket: "gs://meetup-tutorial-84587.appspot.com",
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        this.$store.dispatch("fetchUserData");
      }
    });
    this.$store.dispatch("loadMeetups");
  },
}).$mount("#app");
