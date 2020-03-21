<template>
    <v-app>
        <v-app-bar
                app
                dark
        >
            <div class="d-flex align-center">
                Five Gold - Hydraxian Waterlords
            </div>

            <v-spacer></v-spacer>
            <v-btn v-if="this.$store.getters.getRole != null" @click="showIndex"
                   v-bind:class="{ 'selectedRoute': $route.path === '/' }" text color="orange">
                HOME
            </v-btn>

            <v-btn v-if="this.$store.getters.getRole != null" @click="showRoster"
                   v-bind:class="{ 'selectedRoute': $route.path === '/roster' }" text color="orange">
                ROSTER
            </v-btn>
            <v-btn v-if="this.$store.getters.getRole != null" @click="showRaidList"
                   v-bind:class="{ 'selectedRoute': $route.path === '/raids' }" text color="orange">
                RAIDS
            </v-btn>
            <v-btn v-if="this.$store.getters.getRole != null" @click="showLoot"
                   v-bind:class="{ 'selectedRoute': $route.path === '/loot' }" text color="orange">
                LOOT
            </v-btn>
            <v-btn v-if="this.$store.getters.getRole != null" @click="showCrafting"
                   v-bind:class="{ 'selectedRoute': $route.path === '/crafting' }" text color="orange">
                CRAFTING
            </v-btn>
            <!--            <v-btn   @click="showBis" v-bind:class="{ 'selectedRoute': $route.path === '/Bis' }" text color="orange">-->
            <!--                BEST IN SLOT-->
            <!--            </v-btn>-->
            <v-btn v-if="this.$store.getters.getRole != null" @click="showBank" v-bind:class="{ 'selectedRoute': $route.path === '/bank' }" text color="orange">
                GUILD BANK
            </v-btn>

            <v-btn @click="showAbout" v-bind:class="{ 'selectedRoute': $route.path === '/about' }" text color="orange">
                ABOUT
            </v-btn>
            <v-btn @click="showRecruitment" v-bind:class="{ 'selectedRoute': $route.path === '/recruitment' }" text
                   color="orange">
                RECRUITMENT
            </v-btn>
            <v-btn @click="showMacros" v-bind:class="{ 'selectedRoute': $route.path === '/bank' }" text color="orange">
                MACROS
            </v-btn>
            <v-divider
                    vertical
            ></v-divider>
            <v-btn v-if="this.$store.getters.getRole != null" @click="doLogout"
                   v-bind:class="{ 'selectedRoute': $route.path === '/logout' }" text color="orange">
                LOGOUT
            </v-btn>
            <v-btn v-if="this.$store.getters.getRole === null" @click="showLogin"
                   v-bind:class="{ 'selectedRoute': $route.path === '/Login' }" text color="orange">
                LOGIN
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
                this.$router.push({path: '/raids'}).catch(() => {
                })
            },
            showRoster: function () {
                this.$router.push({path: '/roster'}).catch(() => {
                })
            },
            showLoot: function () {
                this.$router.push({path: '/loot'}).catch(() => {
                })
            },
            showIndex: function () {
                this.$router.push({path: '/'}).catch(() => {
                })
            },
            showBis: function () {
                this.$router.push({path: '/Bis'}).catch(() => {
                })
            },
            showCrafting: function () {
                this.$router.push({path: '/Crafting'}).catch((error) => {
                    //eslint-disable-next-line
                    console.log(error);
                })
            },
            showBank: function () {
                this.$router.push({path: '/bank'}).catch(() => {
                })
            },
            showAbout: function () {
                this.$router.push({path: '/about'}).catch(() => {
                })
            },
            showRecruitment: function () {
                this.$router.push({path: '/recruitment'}).catch(() => {
                })
            },
            showLogin: function () {
                this.$router.push({path: '/login'}).catch(() => {
                })
            },
            showMacros: function () {
                this.$router.push({path: '/macros'}).catch(() => {
                })
            },
            doLogout: function () {
                document.cookie = "keepers-jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=.classic-guilds.com";
                window.location.reload()
            }


        },
        computed: {}
    };
</script>
