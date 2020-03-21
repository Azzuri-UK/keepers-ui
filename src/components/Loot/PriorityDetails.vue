<template>
    <div align="center" style="padding: 10px">
        <v-card class="ma-5"      style="max-width: 1000px">
            <v-card-title>{{this.listItem}} Priority List</v-card-title>
        </v-card>
        <v-data-table
                :headers="headers"
                :items="prioData"
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
        props: ["listId","listItem"],
        data: () => {
            return {
                prioData: [],
                headers: [
                    {text: '', value: 'character_class', width: 30},
                    {text: 'Character', value: 'character_name'},
                    {text: '# Raids Attended', value: 'count',align:'center'},
                ],
                itemsPerPage: 25,
                loading: true,
                footerProps:{
                    itemsPerPageOptions: [10,25,50]
                }
            }
        },
        mounted() {

            this.getPriorityDetails();
        },
        methods: {
            getPriorityDetails: function(){
                this.loading = true;
                axios
                    .get(process.env.VUE_APP_API_PATH + '/lists/' + this.listId)
                    .then(response => {
                        this.prioData = response.data;
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
        }

    }
</script>

<style scoped>

</style>