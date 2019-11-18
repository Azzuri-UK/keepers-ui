<template>
    <v-simple-table class="recentTable  mx-2 my-2" >
        <template v-slot:default>
            <thead>
            <tr class="recentTable">
                <th class="text-left">Name</th>
                <th class="text-left">Item</th>
            </tr>
            </thead>
            <tbody>
            <tr class="recentTable" v-for="item in loot" :key="item.loot_id">
                <td><div style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">{{ item.character_name }}</div></td>
                <td><a :href="'https://www.wowhead.com/item=' + item.loot_id" style="font-weight: bold;text-decoration: none" class="q4" :data-wowhead=item.loot_id>{{item.item_name}}</a></td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "RecentDrops",
        data() {
            return {
                loot: []
            }

        },
        mounted() {
            axios
                .get(process.env.VUE_APP_API_PATH + '/loot/recent')
                .then(response => {
                    this.loot = response.data
                })
                .catch(() => {

                })
        },
        methods: {
            getItemLink: () => {
                return ''
            }
        }
    }

</script>

<style scoped>

</style>