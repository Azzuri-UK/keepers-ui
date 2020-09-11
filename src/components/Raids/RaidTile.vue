<template>
    <v-card
            class="mx-2 my-2"
            width="400px"
            style=";display: inline-block"
    >
        <v-img
                class="white--text align-end"
                height="150"
                :src=this.getZoneImage(zone)
        >
            <v-card-title>{{ this.getZoneName(zone) }}</v-card-title>
        </v-img>

        <v-card-subtitle class="text--primary">{{this.getRaidDate(raidDate)}}</v-card-subtitle>

        <v-card-text class="pb-0">
            <div>Start: {{raidStart}}</div>

            <div>End: {{raidEnd}}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn
                    v-on:click="onViewRaid(raidId)"
                    color="orange"
                    text
            >
                View Raid
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import moment from 'moment'

    let mcImage = require("@/assets/raids/MC.jpg");
    let onyImage = require("@/assets/raids/ONY.jpg");
    let bwlImage = require("@/assets/raids/BWL.jpg");
    let zgImage = require("@/assets/raids/ZG.jpg");
    let aq20Image = require("@/assets/raids/aq201.jpg");
    let aq40Image = require("@/assets/raids/aq401.jpg");
    export default {
        name: "RaidTile",
        props: {
            "raidId": {
                type: Number
            },
            "raidStart": {
                type: String
            },
            "raidEnd": {
                type: String
            },
            "raidDate": {
                type: String
            },
            "zone": {
                type: String
            },
            "raidStatus":{
                type: Number
            }
        },
        methods: {
            getZoneName: (zone) => {
                switch (zone) {
                    case 'MC':
                        return 'Molten Core';
                    case 'ONY':
                        return 'Onyxia\'s Lair';
                    case 'BWL':
                        return 'Blackwing Lair';
                    case 'ZG':
                        return "Zul'Gurub";
                    case 'AQ20':
                        return 'Ruins of Ahn\'Qiraj'
                    case 'AQ40':
                        return 'Temple of Ahn\'Qiraj'
                    default:

                }
            },
            getZoneImage: function (zone) {
                switch (zone) {
                    case 'MC':
                        return mcImage;
                    case 'ONY':
                        return onyImage;
                    case 'BWL':
                        return bwlImage;
                    case 'ZG':
                        return zgImage;
                    case 'AQ20':
                        return aq20Image;
                    case 'AQ40':
                        return aq40Image;
                    default:
                }
            },
            getRaidDate: (date) => {
                return moment(date).format("dddd, MMMM Do YYYY");
            },

            onViewRaid(raidId) {
                this.$router.push({ name: 'raid', params: { raidId:raidId,zone:this.zone } })
            }

        }

    }
</script>

<style scoped>

</style>