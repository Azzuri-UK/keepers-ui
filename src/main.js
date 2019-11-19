import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

Vue.config.productionTip = false

import "@/assets/keepers.css"

import Index from "./components/Index";
import RaidDetails from "./components/Raids/RaidDetails";
import Roster from "./components/Roster/Roster";
import Drops from "./components/Loot/Drops";

const routes = [
  { path: '/', component: Index },
  { name: 'raid', path: '/raid/:raidId', component: RaidDetails },
  { name: 'roster', path: '/roster', component: Roster },
  { name: 'loot', path: '/loot', component: Drops }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
