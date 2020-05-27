<template>
    <div align="center" style="padding: 10px">
        <v-card class="ma-5" style="max-width: 1000px">
            <v-card-title>{{this.listItem}} Priority List</v-card-title>
        </v-card>
        <v-list
                dense
                style="max-width: 1000px;margin-bottom: 10px"
        >
            <v-list-item-group v-model="prioItems" color="primary">
                <v-list-item
                        v-for="(item, i) in prioItems"
                        :key="i"
                >
                    <v-list-item-content>
                        <a :href="'https://classic.wowhead.com/item=' + item.item_id"
                           style="font-weight: bold;text-decoration: none" :class="getItemClass(item.item_quality)"
                           :data-wowhead=item.item_id>{{item.item_name}}</a>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <div>{{prioZone}}</div>
        <v-data-table
                :headers="computedHeaders"
                :items="prioData"
                style="max-width: 1000px"
                :items-per-page="itemsPerPage"
                :footer-props="footerProps"
                :sort-by="['priority','character_name']"
                :sort-desc="[true, false]"
        >
            <template v-slot:item.character_class="{ item }">
                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <v-img v-on="on" height="28px" width="28px" style="display: inline-block;"
                               :src=getClassImage(item.character_class)></v-img>
                    </template>
                    <span>{{item.character_class}}</span>
                </v-tooltip>
            </template>
            <template v-slot:item.character_name="{ item }">
                <div style="font-weight: bold"
                     :class="'wow_' + item.character_class.toLowerCase()">{{
                    item.character_name
                    }}
                </div>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import axios from 'axios';

    let druidImage = require("@/assets/classes/wow_flat_druid.png");
    let hunterImage = require("@/assets/classes/wow_flat_hunter.png");
    let mageImage = require("@/assets/classes/wow_flat_mage.png");
    let paladinImage = require("@/assets/classes/wow_flat_paladin.png");
    let priestImage = require("@/assets/classes/wow_flat_priest.png");
    let warlockImage = require("@/assets/classes/wow_flat_warlock.png");
    let warriorImage = require("@/assets/classes/wow_flat_warrior.png");
    let rogueImage = require("@/assets/classes/wow_flat_rogue.png");


    export default {
        name: "PriorityDetails",
        props: ["listId", "listItem", "listType"],
        data: () => {
            return {
                prioData: [],
                itemsPerPage: 25,
                loading: true,
                footerProps: {
                    itemsPerPageOptions: [10, 25, 50]
                },
                prioItems: [],
                prioZone: '',
                itemHeaders: [
                    {text: 'Item', value: 'item_name'},
                ]
            }
        },
        mounted() {

            this.getPriorityDetails();
            this.getPriorityItems()
            this.getPriorityZones()
        },
        methods: {
            getPriorityDetails: function () {
                this.loading = true;
                axios
                    .get(process.env.VUE_APP_API_PATH + '/lists/' + this.listId)
                    .then(response => {
                        this.prioData = response.data;
                        this.loading = false;
                    });
            },
            getPriorityItems: function () {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/lists/' + this.listId + '/items')
                    .then(response => {
                        this.prioItems = response.data;
                        this.loading = false;
                    });
            },
            getPriorityZones: function () {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/lists/' + this.listId + '/zones')
                    .then(response => {
                        switch (response.data[0].raid_zone) {
                            case 'ALL':
                                this.prioZone = 'Attendance tracked from all official raids '
                                break;
                            case 'ZG':
                                this.prioZone = 'Attendance tracked from official Zul\'Gurub raids'
                                break;
                            case 'MC':
                                this.prioZone = 'Attendance tracked from official Molten Core raids'
                                break;
                            case 'BWL':
                                this.prioZone = 'Attendance tracked from official Blackwing Lair raids'
                                break
                            case 'ONY':
                                this.prioZone = 'Attendance tracked from official Onyxia raids'
                                break;
                        }
                        this.loading = false;
                    });
            },
            getClassImage: (wowClass) => {
                switch (wowClass) {
                    case 'Warrior':
                        return warriorImage;
                    case 'Priest':
                        return priestImage;
                    case 'Mage':
                        return mageImage;
                    case 'Druid':
                        return druidImage;
                    case 'Warlock':
                        return warlockImage;
                    case 'Rogue':
                        return rogueImage;
                    case 'Hunter':
                        return hunterImage;
                    case 'Paladin':
                        return paladinImage;
                }
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
        },
        computed: {
            computedHeaders: function () {
                let headers = [];
                switch (this.listType) {
                    case 0:
                        headers = [
                            {text: '', value: 'character_class', width: 30},
                            {text: 'Character', value: 'character_name'},
                            {text: '# Raids Attended', value: 'count', align: 'center'},
                        ]
                        break;
                    case 1:
                        headers = [
                            {text: '', value: 'character_class', width: 30},
                            {text: 'Character', value: 'character_name'},
                            {text: '# Raids Attended', value: 'count', align: 'center'},
                            {text: '# Items Received', value: 'num_items', align: 'center'},
                            {text: 'Item Priority', value: 'priority', align: 'center'},
                        ]
                        break;
                }
                return headers;
            }
        }

    }
</script>

<style scoped>

</style>