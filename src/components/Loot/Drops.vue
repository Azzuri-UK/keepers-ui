<template>
    <div align="center">
        <v-text-field
                style="max-width: 1000px"
                color="orange"
                v-model="filter"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                :loading="loading"
                loading-text="Loading... Please wait">
        ></v-text-field>
        <v-data-table
                :headers="headers"
                :items="drops"
                style="max-width: 1000px"
                :hide-default-footer=hideFooter
                :disable-pagination=disablePagination
                :search="filter"
                :custom-filter="lootFilter"
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
                <div v-if="item.character_status=== 1" style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">{{
                    item.character_name
                    }}
                </div>
                <v-tooltip top v-if="item.character_status=== 0">
                    <template v-slot:activator="{ on }">
                <div v-on="on"  style="font-weight: bold" class="guildless">
                    {{item.character_name }}
                </div>
                    </template>
                    <span>   {{item.character_name }} is no longer a keeper</span>
                </v-tooltip>
            </template>
            <template v-slot:item.item_id="{ item }">
                <a :href="'https://classic.wowhead.com/item=' + item.item_id"
                   style="font-weight: bold;text-decoration: none" :class="getItemClass(item.item_quality)"
                   :data-wowhead=item.item_id>{{item.item_name}}</a>
            </template>
            <template v-slot:item.loot_type="{ item }">
                {{getLootType(item.loot_type)}}
            </template>
            <template v-slot:item.loot_subcategory="{ item }">
                <div :class="'loot_' + item.loot_subcategory">
                {{getLootSubType(item.loot_subcategory)}}
                </div>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import axios from 'axios'

    let druidImage = require("@/assets/classes/wow_flat_druid.png");
    let hunterImage = require("@/assets/classes/wow_flat_hunter.png");
    let mageImage = require("@/assets/classes/wow_flat_mage.png");
    let paladinImage = require("@/assets/classes/wow_flat_paladin.png");
    let priestImage = require("@/assets/classes/wow_flat_priest.png");
    let warlockImage = require("@/assets/classes/wow_flat_warlock.png");
    let warriorImage = require("@/assets/classes/wow_flat_warrior.png");
    let rogueImage = require("@/assets/classes/wow_flat_rogue.png");

    export default {
        name: "Drops",
        data: () => {
            return {
                headers: [
                    {text: '', value: 'character_class', width: 30},
                    {text: 'Character', value: 'character_name'},
                    {text: 'Item', value: 'item_id'},
                    {text: 'Loot Type', value: 'loot_type'},
                    {text: 'Awarded For', value: 'loot_subcategory'}
                ],
                drops: [],
                filter: '',
                disablePagination: true,
                hideFooter: true,
                loading: true
            }
        },
        mounted() {
            axios
                .get(process.env.VUE_APP_API_PATH + '/loot?search=' + this.filter)
                .then(response => {
                    this.drops = response.data;
                    this.loading = false;
                })
                .catch(() => {

                })
        },
        methods: {
            getLootType: function (loot_type) {
                switch (loot_type) {
                    case 1:
                        return 'Best in Slot';
                    case 2:
                        return 'Free Roll';
                    case 3:
                        return 'Loot Council';
                    default:
                        return '';
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
            lootFilter(value, search, item) {
                return value != null &&
                    search != null &&
                    typeof value === 'string' && (item.item_name.toUpperCase().includes(search.toUpperCase())
                        || item.character_class.toUpperCase().includes(search.toUpperCase())
                        || item.character_name.toUpperCase().includes(search.toUpperCase())
                        || this.getLootType(item.loot_type).toUpperCase().includes(search.toUpperCase())
                    )
            },
            getLootSubType: function (loot_type) {
                switch (loot_type) {
                    case 1:
                        return 'Mainspec/Need';
                    case 2:
                        return 'Minor Upgrade';
                    case 3:
                        return 'Offspec/Other';
                    case 4:
                        return 'Resist Gear';
                    case 5:
                        return 'Disenchant';
                    default:
                        return ''
                }
            },
        }
    }
</script>

<style scoped>

</style>