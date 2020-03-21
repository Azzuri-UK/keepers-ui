const cookie = require('cookie');
const jwtDecode = require('jwt-decode');
const axios = require('axios');

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

import "@/assets/keepers.css"

import Index from "./components/Index";
import RaidDetails from "./components/Raids/RaidDetails";
import Roster from "./components/Roster/Roster";
import PriorityDetails from "./components/Loot/PriorityDetails";
import Crafting from "./components/Crafting/Crafting";
import Bis from "./components/Bis/Bis";
import RaidList from "./components/Raids/RaidList";
import Login from "./components/Login/Login";
import Bank from "./components/Bank/Bank";
import Recruitment from "./components/Recruitment/Recruitment";
import Error from "./components/Error/Error";
import Macro from "./components/Macros/Macros"
import About from "./components/About/About"
import Loot from "./components/Loot/Loot";


const routes = [
    {path: '/', component: Index, meta: {requiresAuth: true}},
    {name: 'login', path: '/Login', component: Login},
    {name: 'raid', path: '/raid/:raidId', component: RaidDetails, props: true, meta: {requiresAuth: true}},
    {name: 'raids', path: '/raids', component: RaidList, props: true, meta: {requiresAuth: true}},
    {name: 'roster', path: '/roster', component: Roster, meta: {requiresAuth: true}},
    {name: 'loot', path: '/loot', component: Loot, meta: {requiresAuth: true}},
    {name: 'bis', path: '/Bis', component: Bis, meta: {requiresAuth: true}},
    {name: 'crafting', path: '/Crafting', component: Crafting, meta: {requiresAuth: true}},
    {name: 'bank', path: '/bank', component: Bank, meta: {requiresAuth: true}},
    {name: 'about', path: '/about', component: About, meta: {requiresAuth: false}},
    {name: 'recruitment', path: '/recruitment', component: Recruitment, meta: {requiresAuth: false}},
    {name: 'error', path: '/error/:errorMessage', component: Error, props: true,meta: {requiresAuth: false}},
    {name: 'macros', path: '/macros', component: Macro, props: true,meta: {requiresAuth: false}},
    {name: 'list', path: '/list/:listId', component: PriorityDetails, props: true, meta: {requiresAuth: true}},
];

const router = new VueRouter({
    mode: 'history',
    routes
});

let token;

let storeParams = {};
let cookieCheck = cookie.parse(document.cookie);
if (cookieCheck.hasOwnProperty('keepers-jwt')) {
    token = jwtDecode(cookieCheck['keepers-jwt']);
    storeParams.authToken = cookieCheck['keepers-jwt'];
    storeParams.userId = token.user.id;
    storeParams.permissions = [];
    storeParams.role = token.user.role;
    axios.defaults.headers.common['X-ACCESS-TOKEN'] = cookieCheck['keepers-jwt']
}


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueClipboard)

const store = new Vuex.Store({
    state: {
        authToken: storeParams.authToken || null,
        permissions: storeParams.permissions || [],
        role: storeParams.role || null,
        userId: storeParams.userId || null,
        characterName: null,
        characterClass: null,
        characterRole: null
    },
    mutations: {
        SET_CHARACTER: (state, character) => {
            state.characterName = character.name;
            state.characterClass = character.class;
            state.characterRole = character.role;
        },
        SET_USER: (state, user) => {
            state.userId = user.userId;
            state.permissions = user.permissions;
            state.authToken = user.authToken;
        }
    },
    getters: {
        getAuthToken: (state) => {
            return state.authToken;
        },
        getPermissionByName: (state) => (id) => {
            return state.permissions.find(permission => permission.id === id)
        },
        getCharacter: state => {
            return {
                characterName: state.characterName,
                characterClass: state.characterClass,
                characterRole: state.characterRole
            }
        },
        getRole: state => {
            return state.role;
        }
    },
    actions: {
        setUser: ({commit, state}, newValue) => {
            commit('SET_USER', newValue);
            return state.user
        },
        setCharacter: ({commit, state}, newValue) => {
            commit('SET_CHARACTER', newValue);
            return state.character
        }
    }
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let cookies = cookie.parse(document.cookie);
        if (cookies.hasOwnProperty('keepers-jwt')) {
            next();
        } else {
            next({
                path: '/Login',
                params: {nextUrl: to.fullPath}
            })
        }
    } else {
        next()
    }

});


new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app');

