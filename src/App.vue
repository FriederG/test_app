<template>
  <v-app>
    <!--Header mobile-->

    <v-navigation-drawer v-model="sideNav" absolute temporary right>
      <v-list shaped>
        <v-subheader>Menu</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="onLogout" v-if="userIsAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!--Header groß------------------------------------------------------------------------------------->
    <v-card color="grey lighten-4" flattile>
      <v-toolbar>
        <v-toolbar-title
          ><router-link to="/" tag="span" style="cursor: pointer;"
            >DevMeetup</router-link
          ></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            text
            v-for="item in menuItems"
            :key="item.title"
            router
            :to="item.link"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>

          <v-btn v-if="userIsAuthenticated" text @click="onLogout">
            <v-icon left>mdi-close</v-icon>
            Logout
          </v-btn>
        </v-toolbar-items>
        <v-app-bar-nav-icon
          @click.stop="sideNav = !sideNav"
          class="hidden-sm-and-up"
        ></v-app-bar-nav-icon>
      </v-toolbar>
    </v-card>
    <main style="margin: 30px;"><router-view></router-view></main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "mdi-face", title: "Sign up", link: "/signup" },
        { icon: "mdi-key", title: "Sign in", link: "/signin" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-account-supervisor-circle",
            title: "View Meetups",
            link: "/meetups",
          },
          { icon: "mdi-room", title: "Organize Meetup", link: "/meetup/new" },
          { icon: "mdi-person", title: "Profile", link: "/profile" },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
