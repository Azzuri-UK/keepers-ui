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

                        <v-img :position="getZoneImagePosition(item.raid_zone,'tile')" :src="getZoneImage(item.raid_zone,'tile')"
                               height="150px">

                            <div align="left" style="font-size: 30px;font-weight: bold;padding:5px;color:white; text-shadow: 0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black;">
                                {{getZoneName(item.raid_zone)}}
                            </div>
                            <div align="left" style="font-size:24px;padding:5px;font-weight: bold;color:white; text-shadow: 0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black;">
                                {{getRaidTime(item.raid_start)}}
                            </div>
                            <div align="left" style="font-size: 16px;padding:5px;">{{getRaidDate(item.raid_date)}}</div>

                            <div style="position: absolute;right: 20px; top: 10px;color:white; text-shadow: 0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black;">
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

    import RaidZones from '../../mixins/RaidZones.js'
    import Roles from '../../mixins/Roles.js'

    export default {
        name: "OpenRaids",
        mixins: [RaidZones,Roles],
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
            getRaidDate: (date) => {
                return moment(date).format("dddd, MMMM Do YYYY");
            },
            getRaidTime: (time) => {
                let raidTime = moment.utc(time, "HH:mm");
                return raidTime.format("HH:mm")
            },

            onViewRaid(raidId) {
                this.$router.push({name: 'raid', params: {raidId: raidId, zone: this.zone}})
            },
        }
    }
</script>

<style scoped>

</style>