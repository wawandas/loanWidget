<template>
  <v-app id="inspire">
    <v-app-bar app color="cyan" dark>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content><router-view></router-view></v-content>

    <v-footer color="cyan" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 1000 });

mock.onPost("/loan").reply(200, {
  amount: "10000.00",
  duration: "5",
  monthlyInstallment: "5390.61"
});

export default {
  name: "App"
};
</script>
