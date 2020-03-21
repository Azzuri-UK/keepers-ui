<template>
    <div align="center" style="padding: 10px">
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
            >
        </v-text-field>
        <v-data-table
                :headers="headers"
                :items="distriData"
                style="max-width: 1000px"
                :items-per-page="itemsPerPage"
                :footer-props="footerProps"
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
                <div  style="font-weight: bold"
                     :class="'wow_' + item.character_class.toLowerCase()">{{
                    item.character_name
                    }}
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
        name: "Distribution",
        data: () => {
            return {
                headers: [
                    {text: '', value: 'character_class', width: 30},
                    {text: 'Character', value: 'character_name'},
                    {text: 'Mainspec/Need', value: 'mainspec',align:'center'},
                    {text: 'Minor Upgrade', value: 'minor',align:'center'},
                    {text: 'Resist', value: 'resist',align:'center'},
                    {text: 'Offspec/Other', value: 'offspec',align:'center'},
                    {text: '# Raids Attended', value: 'attendance',align:'center'}
                ],
                distriData: [],
                filter: '',
                itemsPerPage: 25,
                loading: true,
                footerProps:{
                    itemsPerPageOptions: [10,25,50]
                }
            }
        },
        mounted() {
            this.getLootDistribution()
        },
        methods: {
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
            getLootDistribution: function () {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/loot/distribution?search=' + this.filter )
                    .then(response => {
                        this.distriData = response.data;
                        this.loading = false;
                    })
                    .catch(() => {

                    })
            }
        },
        watch: {
            filter: {
                handler: function () {
                    if (this.filter.length > 3 || this.filter.length === 0 ) {
                        this.getLootDistribution()
                    }
                },
                immediate: false
            }
        }
    }
</script>

<style scoped>

</style>