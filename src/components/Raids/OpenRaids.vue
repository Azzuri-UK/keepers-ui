<template>
    <div align="center">
    <v-data-iterator
            :items="openRaids"
            :disable-pagination="disablePagination"
            :hide-default-footer="disablePagination"
    >
        <template v-slot:default="props">
            <v-hover :key="item.name" v-for="item in props.items" v-slot:default="{ hover }">

                <v-card :class="item.raid_status === 0 ? 'closedRaid' : 'openRaid'"
                        v-on:click="onViewRaid(item.raid_id)" :elevation="hover ? 12 : 2"
                        :style="hover ? 'cursor:pointer;background-color: #616161;margin: 15px;max-width: 1000px' : 'margin: 15px;max-width: 1000px'"
                >

                    <v-img :position="getZoneImagePosition(item.raid_zone)" :src="getZoneImage(item.raid_zone)"
                           height="150px">

                        <div align="left" style="font-size: 30px;font-weight: bold;padding:5px">
                            {{getZoneName(item.raid_zone)}}
                        </div>
                        <div align="left" style="font-size:24px;padding:5px;font-weight: bold">
                            {{getRaidTime(item.raid_start)}}
                        </div>
                        <div align="left" style="font-size: 16px;padding:5px;">{{getRaidDate(item.raid_date)}}</div>

                        <div style="position: absolute;right: 20px; top: 10px">
                            <v-img height="34px" width="34px" :src="getRoleImage('Tank')"></v-img>
                        </div>
                        <div style="position: absolute;right: 65px; top: 17px;font-weight: bold">{{item.tank_count}}
                        </div>

                        <div style="position: absolute;right: 20px; top: 50px">
                            <v-img height="34px" width="34px" :src="getRoleImage('Healer')"></v-img>
                        </div>
                        <div style="position: absolute;right: 65px; top: 57px;font-weight: bold">
                            {{item.healer_count}}
                        </div>

                        <div style="position: absolute;right: 20px; top: 90px">
                            <v-img height="34px" width="34px" :src="getRoleImage('Damage')"></v-img>
                        </div>
                        <div style="position: absolute;right: 65px; top: 97px;font-weight: bold">
                            {{item.damage_count}}
                        </div>
                    </v-img>


                </v-card>
            </v-hover>
        </template>
    </v-data-iterator>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'

    let mcImage = require("@/assets/raids/MC.jpg");
    let onyImage = require("@/assets/raids/ONY.jpg");
    let bwlImage = require("@/assets/raids/BWL.jpg");
    let zgImage = require("@/assets/raids/ZG.jpg");
    let tankImage = require("@/assets/roles/Tank.png");
    let healerImage = require("@/assets/roles/Healer.png");
    let damageImage = require("@/assets/roles/Damage.png");

    export default {
        name: "OpenRaids",
        data() {
            return {
                openRaids: [],
                disablePagination: true
            }

        },
        mounted() {
            axios
                .get(process.env.VUE_APP_API_PATH + '/raids/upcoming')
                .then(response => {
                    this.openRaids = response.data
                })
                .catch(() => {

                })
        },
        methods: {
            getZoneImagePosition: function (zone) {
                switch (zone) {
                    case 'MC':
                        return "0% 50%";
                    case 'ONY':
                        return "0% 27%";
                    case 'BWL':
                        return "0% 50%";
                    case 'ZG':
                        return "0% 47%";
                    default:
                        return "top";
                }
            },
            getRaidDate: (date) => {
                return moment(date).format("dddd, MMMM Do YYYY");
            },
            getRaidTime: (time) => {
                let raidTime = moment.utc(time, "HH:mm");
                return raidTime.format("HH:mm")
            },
            getRoleImage: (role) => {
                switch (role) {
                    case 'Tank':
                        return tankImage;
                    case 'Healer':
                        return healerImage;
                    case 'Damage':
                        return damageImage;
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
                    default:
                }
            },
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
                    default:

                }
            },
            onViewRaid(raidId) {
                this.$router.push({name: 'raid', params: {raidId: raidId, zone: this.zone}})
            },
        }
    }
</script>

<style scoped>

</style>