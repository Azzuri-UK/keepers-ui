<template>
    <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="itemsPerPage"
            :hide-default-footer=hideFooter
            :sort-by="['character_role','character_name']"
            :sort-desc="[true,false]"
            :disable-pagination=disablePagination
    >
        <template v-slot:item.character_class="{ item }">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-img v-on="on" height="28px" width="28px" style="display: inline-block;"
                           :src=getClassImage(item.character_class)></v-img>
                </template>
                <span>{{item.character_class}}</span>
            </v-tooltip>
        </template>
        <template v-slot:item.character_role="{ item }">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-img v-on="on" height="34px" width="34px" style="display: inline-block;"
                           :src=getRoleImage(item.character_role)></v-img>
                </template>
                <span>{{item.character_role}}</span>
            </v-tooltip>
        </template>
        <template v-slot:item.character_name="{ item }">
            <div style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">{{ item.character_name
                }}
            </div>
        </template>
    </v-data-table>
</template>

<script>
    import axios from 'axios'

    let tankImage = require("@/assets/roles/Tank.png");
    let healerImage = require("@/assets/roles/Healer.png");
    let damageImage = require("@/assets/roles/Damage.png");
    let druidImage = require("@/assets/classes/wow_flat_druid.png");
    let hunterImage = require("@/assets/classes/wow_flat_hunter.png");
    let mageImage = require("@/assets/classes/wow_flat_mage.png");
    let paladinImage = require("@/assets/classes/wow_flat_paladin.png");
    let priestImage = require("@/assets/classes/wow_flat_priest.png");
    let warlockImage = require("@/assets/classes/wow_flat_warlock.png");
    let warriorImage = require("@/assets/classes/wow_flat_warrior.png");
    let rogueImage = require("@/assets/classes/wow_flat_rogue.png");

    export default {
        name: "Roster",
        data: () => {
            return {
                headers: [
                    {
                        text: 'Character',
                        value: 'character_name'
                    },
                    {
                        text: 'Class',
                        value: "character_class"
                    },
                    {
                        text: 'Role',
                        value: 'character_role'
                    },
                ],
                items: [],
                itemsPerPage: -1,
                disablePagination: true,
                hideFooter: true
            }
        },
        mounted() {
            axios
                .get(process.env.VUE_APP_API_PATH + '/roster')
                .then(response => {
                    this.items = response.data
                })
                .catch(() => {

                })
        },
        methods: {
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