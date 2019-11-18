<template>
    <div >
        <RaidTile :key="item.raid_id" v-for="item in openRaids" :raidId="item.raid_id" :raidDate=item.raid_date :raidStart=item.raid_start :raidEnd=item.raid_end :zone=item.raid_zone></RaidTile>
    </div>

</template>

<script>
    import axios from 'axios'
    import RaidTile from './RaidTile'

    export default {
        name: "OpenRaids",
        components: {RaidTile},
        data() {
            return {
                openRaids: []
            }

        },
        mounted() {
            axios
                .get(process.env.VUE_APP_API_PATH + '/raids')
                .then(response => {
                    this.openRaids = response.data
                })
                .catch(() => {

                })
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>