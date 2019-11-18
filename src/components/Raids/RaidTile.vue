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
            }
        },
        methods: {
            getZoneName: (zone) => {
                switch (zone) {
                    case 'MC':
                        return 'Molten Core';
                    case 'ONY':
                        return 'Onyxia\'s Lair'
                    case 'BWL':
                        return 'Blackwing Lair'
                }
            },
            getZoneImage: (zone) => {
                switch (zone) {
                    case 'MC':
                        return mcImage;
                    case 'ONY':
                        return onyImage;
                    case 'BWL':
                        return bwlImage;
                }
            },
            getRaidDate: (date) => {
                return moment(date).format("dddd, MMMM Do YYYY");
            },

            onViewRaid(raidId) {
                // eslint-disable-next-line
                console.log(raidId);
                this.$router.push({ name: 'raid', params: { raidId:raidId } })
            }

        }

    }
</script>

<style scoped>

</style>