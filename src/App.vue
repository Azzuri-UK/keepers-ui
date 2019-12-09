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
            <v-btn v-if="this.$store.getters.getRole != null" @click="showIndex" v-bind:class="{ 'selectedRoute': $route.path === '/' }" text color="orange">
                HOME
            </v-btn>
            <v-btn v-if="this.$store.getters.getRole != null"  @click="showRoster" v-bind:class="{ 'selectedRoute': $route.path === '/roster' }" text color="orange">
                ROSTER
            </v-btn>
            <v-btn v-if="this.$store.getters.getRole != null" @click="showRaidList" v-bind:class="{ 'selectedRoute': $route.path === '/raids' }" text color="orange">
                RAIDS
            </v-btn>
            <v-btn v-if="this.$store.getters.getRole != null"  @click="showLoot" v-bind:class="{ 'selectedRoute': $route.path === '/loot' }" text color="orange">
                LOOT
            </v-btn>
            <v-btn v-if="this.$store.getters.getRole != null" @click="showCrafting" v-bind:class="{ 'selectedRoute': $route.path === '/crafting' }" text color="orange">
                CRAFTING
            </v-btn>
            <v-btn v-if="this.$store.getters.getRole != null"  @click="showBis" v-bind:class="{ 'selectedRoute': $route.path === '/bis' }" text color="orange">
                BEST IN SLOT
            </v-btn>
            <v-btn v-if="this.$store.getters.getRole != null"  @click="showBank" v-bind:class="{ 'selectedRoute': $route.path === '/bank' }" text color="orange">
                GUILD BANK
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
            isLoggedIn: false
        }),
        methods: {
            showRaidList: function () {
                //eslint-disable-next-line
                console.log('raid list')
                this.$router.push({path: '/raids'}).catch(()=>{})
            },
            showRoster: function () {
                this.$router.push({path: '/roster'}).catch(()=>{})
            },
            showLoot: function () {
                this.$router.push({path: '/loot'}).catch(()=>{})
            },
            showIndex: function () {
                this.$router.push({path: '/'}).catch(()=>{})
            },
            showBis: function () {
                this.$router.push({path: '/bis'}).catch(()=>{})
            },
            showCrafting: function () {
                this.$router.push({path: '/crafting'}).catch((error)=>{
                    //eslint-disable-next-line
                    console.log(error);
                })
            },
            showBank: function () {
                this.$router.push({path: '/bank'}).catch(()=>{})
            },
        },
        computed: {

        }
    };
</script>
