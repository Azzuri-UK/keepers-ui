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
            <v-btn @click="showIndex" v-bind:class="{ 'selectedRoute': $route.path === '/' }" text color="orange">
                HOME
            </v-btn>
            <v-btn @click="showRaidList" v-bind:class="{ 'selectedRoute': $route.path === '/raids' }" text color="orange">
                RAIDS
            </v-btn>
            <v-btn @click="showRoster" v-bind:class="{ 'selectedRoute': $route.path === '/roster' }" text color="orange">
                ROSTER
            </v-btn>
            <v-btn @click="showLoot"  v-bind:class="{ 'selectedRoute': $route.path === '/loot' }" text color="orange">
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
        data: () => ({}),
        methods: {
            showRaidList: function () {
                this.$router.push({path: '/raids'})
            },
            showRoster: function () {
                this.$router.push({path: '/roster'})
            },
            showLoot: function () {
                this.$router.push({path: '/loot'})
            },
            showIndex: function () {
                this.$router.push({path: '/'})
            }
        },
        computed: {

        }
    };
</script>
