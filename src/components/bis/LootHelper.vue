<template>
    <div align="center" style="padding: 20px">
    <v-select
            :items="raids"
            label="Select a raid"
            v-model="selectedRaid"
            required
            :rules="formRules"
            item-text="zone_name"
            item-value="zone_id"
            color="orange"
            style="max-width: 1000px"
    >
        <template slot="selection" slot-scope="data">
            <div style="font-weight: bold"
                 :class="'q' + data.item.item_quality">
                {{ getZoneName(data.item.raid_zone) }} - {{getRaidDate(data.item.raid_date)}}
            </div>
        </template>
        <template slot="item" slot-scope="data">
            <div style="font-weight: bold"
                 :class="'q' + data.item.item_quality">
                {{ getZoneName(data.item.raid_zone) }} - {{getRaidDate(data.item.raid_date)}}
            </div>
        </template>
    </v-select>
        <v-select
                :items="bosses"
                label="Select a boss"
                v-model="selectedBoss"
                required
                :rules="formRules"
                item-text="boss_name"
                item-value="zone_id"
                color="orange"
                style="max-width: 1000px"
        >
            <template slot="selection" slot-scope="data">
                <div style="font-weight: bold"
                     :class="'q' + data.item.item_quality">
                    {{ getZoneName(data.item.raid_zone) }} - {{getRaidDate(data.item.raid_date)}}
                </div>
            </template>
            <template slot="item" slot-scope="data">
                <div style="font-weight: bold"
                     :class="'q' + data.item.item_quality">
                    {{ getZoneName(data.item.raid_zone) }} - {{getRaidDate(data.item.raid_date)}}
                </div>
            </template>
        </v-select>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'
    export default {
        name: "LootHelper",
        data: () => {
            return {
                raids: [],
                selectedRaid: null,
                formRules: [
                    v => !!v || 'This field is required'
                ],
            }
        },
        mounted() {
            this.getOpenRaids();
        },
        methods: {
            getOpenRaids: function () {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/raids/open')
                    .then(response => {
                        this.raids = response.data
                    })
                    .catch(() => {

                    })
            },
            getRaidDate: (date) => {
                return moment(date).format("dddd, MMMM Do YYYY");
            },
            getRaidTime: (time) => {
                let raidTime = moment.utc(time, "HH:mm");
                return raidTime.format("HH:mm")
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
            getBosses: function () {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/raids/open')
                    .then(response => {
                        this.raids = response.data
                    })
                    .catch(() => {

                    })
            }
        }
    }
</script>

<style scoped>

</style>