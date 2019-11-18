<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
      <div class="d-flex align-center">


      KEEPERS
      </div>

      <v-spacer></v-spacer>
      <v-btn @click="onChangeView('Index')" text   color="orange" >
        HOME
      </v-btn>
      <v-btn @click="onChangeView('RaidList')" text   color="orange" >
       RAIDS
      </v-btn>
      <v-btn @click="onChangeView('Roster')" text   color="orange" >
        ROSTER
      </v-btn>
      <v-btn @click="onChangeView('Loot')" text   color="orange" >
        LOOT
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({

  }),
};
</script>
