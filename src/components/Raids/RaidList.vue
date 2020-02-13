<template>
    <div align="center" style="padding-top: 20px">
        <div style="max-width: 1000px" align="right">
            <v-btn v-show="this.$store.getters.getRole==='ARCHKEEPERS'" @click="createRaidDialog = true" color="orange">
                CREATE RAID
            </v-btn>
        </div>
        <v-select @change="loadRaidList" v-model="raidFilter" value="Open Raids" color="orange"
                  style="max-width: 1000px" :items="raidStatus"></v-select>

        <v-data-iterator
                :items="raids"
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
        <v-dialog v-model="createRaidDialog" persistent max-width="500">
            <v-form ref="createRaidForm">
                <v-card>
                    <v-card-title class="headline orange" primary-title>Create New Raid</v-card-title>
                    <div style="padding: 20px">
                        <v-select
                                label="Zone"
                                :items="zones"
                                color="orange"
                                item-text="zone_name"
                                item-value="zone_id"
                                v-model="raidToAdd.zoneId"
                                required
                                :rules="formRules"
                        ></v-select>
                        <v-menu
                                ref="menu"
                                v-model="dateMenu"
                                :close-on-content-click="false"
                                :return-value.sync="raidToAdd.startDate"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"

                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        v-model="formattedDate"
                                        label="Date"
                                        readonly
                                        v-on="on"
                                        required
                                        :rules="formRules"
                                ></v-text-field>
                            </template>
                            <v-date-picker first-day-of-week=1 color="orange" v-model="raidToAdd.startDate" no-title
                                           scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="red" @click="menu = false">Cancel</v-btn>
                                <v-btn text color="green" @click="$refs.menu.save(raidToAdd.startDate)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-menu
                                ref="starttimemenu"
                                v-model="startTimeMenu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="raidToAdd.startTime"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        v-model="raidToAdd.startTime"
                                        label="Start Time"
                                        readonly
                                        v-on="on"
                                        color="orange"
                                        required
                                        :rules="formRules"
                                ></v-text-field>
                            </template>
                            <v-time-picker
                                    color="orange"
                                    v-if="startTimeMenu"
                                    v-model="raidToAdd.startTime"
                                    full-width
                                    @click:minute="$refs.starttimemenu.save(raidToAdd.startTime)"
                            ></v-time-picker>
                        </v-menu>
                        <v-menu
                                ref="endtimemenu"
                                v-model="endTimeMenu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="raidToAdd.endTime"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        color="orange"
                                        v-model="raidToAdd.endTime"
                                        label="End Time"
                                        readonly
                                        v-on="on"
                                        required
                                        :rules="formRules"
                                ></v-text-field>
                            </template>
                            <v-time-picker
                                    color="orange"
                                    v-if="endTimeMenu"
                                    v-model="raidToAdd.endTime"
                                    full-width
                                    @click:minute="$refs.endtimemenu.save(raidToAdd.endTime)"
                            ></v-time-picker>
                        </v-menu>
                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="createRaidDialog = false">Cancel</v-btn>
                        <v-btn color="green darken-1" text v-on:click="createRaid">CREATE RAID</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </div>

</template>

<script>
    import axios from 'axios'
    import moment from 'moment'

    let mcImage = require("@/assets/raids/MC.jpg");
    let onyImage = require("@/assets/raids/ONY.jpg");
    let bwlImage = require("@/assets/raids/BWL.jpg");
    let tankImage = require("@/assets/roles/Tank.png");
    let healerImage = require("@/assets/roles/Healer.png");
    let damageImage = require("@/assets/roles/Damage.png");
    export default {
        name: "RaidList",
        mounted() {
            this.loadRaidList()
        },
        data: () => {
            return {
                raids: [],
                raidFilter: 'Open Raids',
                raidStatus: [
                    'Open Raids',
                    'Closed Raids',
                    'All Raids'
                ],
                createRaidDialog: false,
                dateMenu: false,
                startTimeMenu: false,
                endTimeMenu: false,
                startTime: '19:45',
                endTime: '22:30',
                raidToAdd: {
                    startTime: '19:45',
                    endTime: '22:30',
                    zoneId: null,
                    startDate: new Date().toISOString().substr(0, 10),
                },
                zones: [
                    {
                        zone_name: 'Blackwing Lair',
                        zone_id: 'BWL'
                    },
                    {
                        zone_name: 'Molten Core',
                        zone_id: 'MC'
                    },
                    {
                        zone_name: 'Onyxia',
                        zone_id: 'ONY'
                    },
                ],
                formRules: [
                    v => !!v || 'This field is required'
                ],
            }
        },
        methods: {
            loadRaidList: function () {
                let path;
                switch (this.raidFilter) {

                    case 'Open Raids':
                        path = '/raids/open';
                        break;
                    case 'Closed Raids':
                        path = '/raids/closed';
                        break;
                    case 'All Raids':
                        path = '/raids/';
                        break;
                }
                axios
                    .get(process.env.VUE_APP_API_PATH + path)
                    .then(response => {
                        this.raids = response.data;
                        this.loading = false;
                    })
                    .catch(() => {

                    })
            },
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
            getZoneImage: function (zone) {
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
            getZoneImagePosition: function (zone) {
                switch (zone) {
                    case 'MC':
                        return "0% 50%";
                    case 'ONY':
                        return "0% 27%";
                    case 'BWL':
                        return "0% 50%";
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
            onViewRaid(raidId) {
                this.$router.push({name: 'raid', params: {raidId: raidId, zone: this.zone}})
            },
            createRaid: function () {
                if (this.$refs.createRaidForm.validate()) {
                    axios
                        .post(process.env.VUE_APP_API_PATH + '/raids/', {
                            data: this.raidToAdd
                        })
                        .then(() => {
                            this.loadRaidList();
                            this.createRaidDialog = false;
                        })
                        .catch(() => {

                        });
                }
            }
        },
        computed: {
            formattedDate() {
                return this.raidToAdd.startDate ? moment(this.raidToAdd.startDate).format('dddd, MMMM Do YYYY') : ''
            }
        }
    }
</script>

<style scoped>

</style>