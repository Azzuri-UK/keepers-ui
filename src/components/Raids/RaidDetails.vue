<template style="height: 100vh">
    <div>
    <v-card
            class="mx-2 my-2"
            style=";display: inline-block;"
            width="99%"
    >
        <v-img
                :class="this.raid.raid_status === 0 ? 'closedRaid white--text align-end' : 'openRaid white--text align-end'"
                height="300"
                max-height="300"
                :src=this.getZoneImage(this.raid.raid_zone)
                :position=this.getZoneImagePosition(this.raid.raid_zone)
        >

            <div align="left" style="font-size: 34px;font-weight: bold;padding:5px">
                {{getZoneName(this.raid.raid_zone)}}
            </div>
            <div align="left" style="font-size:28px;padding:5px;font-weight: bold">
                {{getRaidTime(this.raid.raid_date)}}
            </div>
            <div align="left" style="font-size: 20px;padding:5px; font-weight: bold">{{getRaidDate(this.raid.raid_date)}}</div>
            <div v-if="this.raid.raid_status === 0" style="font-size: 20px;padding:5px; font-weight: bold;position: absolute;right: 0px;bottom:0">This raid is closed</div>
        </v-img>
    </v-card>
    <v-tabs
            fixed-tabs
            color="orange"
            dark
    >
        <v-tab key="attendance ">
            Attendance
        </v-tab>
        <v-tab key="loot">
            Loot
        </v-tab>

        <v-tab-item key="attendance">
            <RaidAttendance :raidStatus="this.raid.raid_status" v-on:reloadAttendees="loadAttendanceData" :tanks="this.tank" :healers="this.healer" :damage="this.damage"/>
        </v-tab-item>
        <v-tab-item key="loot">
            <RaidLoot :raidStatus=this.raid.raid_status :attendees="attendees" :drops="drops"/>
        </v-tab-item>

    </v-tabs>
    </div>
</template>

<script>
    import moment from 'moment'
    import axios from 'axios'

    import RaidAttendance from "./RaidAttendance";
    import RaidLoot from "./RaidLoot";

    let mcImage = require("@/assets/raids/mc3.jpg");
    let onyImage = require("@/assets/raids/ony3.jpg");
    let bwlImage = require("@/assets/raids/BWL.jpg");

    export default {
        name: "RaidDetails",
        props: ["raidId","raidStatus"],
        components: {RaidLoot, RaidAttendance},
        data: () => {
            return {
                tank: [],
                healer: [],
                damage: [],
                attendees: [],
                drops: [],
                raid: {
                    raid_zone: '',
                    raid_start: null,
                    raid_end: null,
                    raid_date: null,
                    raid_status: null
                }
            }
        },
        mounted() {
            this.getRaidDetails();
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
                    default:

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
                    default:
                }
            },
            getRaidDate: (date) => {
                return moment(date).format("dddd, MMMM Do YYYY");
            },
            getZoneImagePosition: function(zone) {
                switch (zone) {
                    case 'MC':
                        return "top";
                    case 'ONY':
                        return "0% 25%";
                    case 'BWL':
                        return "top";
                    default:
                        return "top";
                }
            },
            loadAttendanceData: function() {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/attendance/')
                    .then(response => {
                        let data = {
                            tank: [],
                            healer: [],
                            damage: []
                        };
                        response.data.forEach((character) => {
                            switch (character.role) {
                                case 'Tank':
                                    data.tank.push(character);
                                    break;
                                case 'Healer':
                                    data.healer.push(character);
                                    break;
                                case 'Damage':
                                    data.damage.push(character);
                            }
                        });
                        this.tank = data.tank;
                        this.damage = data.damage;
                        this.healer = data.healer;
                        this.attendees = response.data;
                    })
                    .catch(() => {

                    })
            },
            getItemList: function() {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/items/' + this.raid.raid_zone)
                    .then(response => {
                        this.drops = response.data;
                    })
                    .catch(() => {

                    })
            },
            getRaidDetails: function(){
                axios
                    .get(process.env.VUE_APP_API_PATH + '/raids/' + this.raidId)
                    .then(response => {
                        this.raid = response.data[0];
                        this.loadAttendanceData();
                        this.getItemList()
                    })
                    .catch(() => {

                    })
            },
            getRaidTime: (time) => {
                let raidTime = moment.utc(time, "HH:mm");
                return raidTime.format("HH:mm")
            },
        }
    }
</script>

<style scoped>

</style>