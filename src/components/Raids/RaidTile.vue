<template>
    <v-card
            class="mx-2 my-2"
            width="400px"
            style=";display: inline-block"
    >
        <v-img
                class="white--text align-end"
                height="150"
                :src=this.getZoneImage(zone,'tile')
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

    import RaidZones from "../../mixins/RaidZones";

    export default {
        name: "RaidTile",
        mixins: [RaidZones],
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