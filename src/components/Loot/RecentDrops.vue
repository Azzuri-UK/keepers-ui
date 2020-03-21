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
            <tr class="recentTable" v-for="item in loot" :key="item.loot_id + item.character_name">
                <td v-if="item.character_status=== 1" width="50%"><div style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">{{ item.character_name }}</div></td>
                <v-tooltip left v-if="item.character_status=== 0">
                    <template v-slot:activator="{ on }">
                <td v-on="on" v-if="item.character_status=== 0" width="50%"><div style="font-weight: bold" class="guildless">{{ item.character_name }}</div></td>
                    </template>
                    <span>   {{item.character_name }} is no longer in the guild</span>
                </v-tooltip>
                <td><a :href="'https://classic.wowhead.com/item=' + item.loot_id" style="font-weight: bold;text-decoration: none" :class="getItemClass(item.item_quality)" :data-wowhead=item.loot_id>{{item.item_name}}</a></td>
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
            },
            getItemClass: function (item_class) {
                switch (item_class) {
                    case 1:
                        return 'q1';
                    case 2:
                        return 'q2';
                    case 3:
                        return 'q3';
                    case 4:
                        return 'q4';
                    case 5:
                        return 'q5'
                }
            },
        }
    }

</script>

<style scoped>

</style>