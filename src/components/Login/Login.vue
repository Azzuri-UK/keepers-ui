<template>

    <v-container fill-height :style="{ 'background-position': 'center','background-size': 'contain','max-width':'100%','background-image':  'url('+getBackgroundImage + ')'}">
        <v-layout row wrap align-center>
            <v-flex class="text-xs-center">
                <div align="center">
                    <v-btn  @click="doLogin" elevation="24"  color="#7289DA">LOGIN WITH DISCORD</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    let AlteracMountain = require("@/assets/backgrounds/AlteracMountain.jpg");
    let ArathiHighlands = require("@/assets/backgrounds/ArathiHighlands.jpg");
    let Ashenvale = require("@/assets/backgrounds/Ashenvale.jpg");
    let Azshara = require("@/assets/backgrounds/Azshara.jpg");
    let BurningSteppes = require("@/assets/backgrounds/BurningSteppes.jpg");
    let HilsbradFoothills = require("@/assets/backgrounds/HilsbradFoothills.jpg");
    export default {
        name: "Login",
        data: () => {
            return {
                publicPath: process.env.BASE_URL,
                backgrounds: [
                    AlteracMountain,
                    ArathiHighlands,
                    Ashenvale,
                    Azshara,
                    BurningSteppes,
                    HilsbradFoothills
                ]
            }
        },
        computed: {
            getBackgroundImage: function () {
                return  this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)]
                // return t
            }
        },
        methods: {
            doLogin: function(){
                window.location =  process.env.VUE_APP_API_PATH + '/auth';
            }
        }
    }
</script>

<style scoped>

</style>