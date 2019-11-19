<template>
    <v-row no-gutters>
        <v-col cols="12" sm="4">
            <v-card class="pa-2" outlined tile style="color: orange">
                <div style="display: inline-block">
                    <v-img  style="display: inline-block;vertical-align: middle" height="32px" width="32px" :src=tankImage />
                    <div style="display: inline-block;color: orange;margin-left: 5px">Tanks</div>
                    <div style="position: absolute; right: 10px;top: 13px">{{this.tanks.length}}</div>
                </div>
            </v-card>
            <v-simple-table class="  mx-2 my-2">
                <template >
                    <tbody>
                    <tr class="" v-for="item in tanks" :key="item.loot_id">
                        <td width="30px">

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-img height="28px" width="28px" :src="getClassImage(item.character_class)" v-on="on"></v-img>
                                </template>
                                <span>{{item.character_class}}</span>
                            </v-tooltip>
                        </td>
                        <td>
                            <div style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">{{
                                item.character_name }}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col cols="12" sm="4">
            <v-card class="pa-2" outlined tile style="color: orange"
            >
                <div style="display: inline-block">
                    <v-img  style="display: inline-block;vertical-align: middle" height="32px" width="32px" :src=healerImage />
                    <div style="display: inline-block;color: orange;margin-left: 5px">Healers</div>
                    <div style="position: absolute; right: 10px;top: 13px">{{this.healers.length}}</div>
                </div>
            </v-card>
            <v-simple-table class="recentTable  mx-2 my-2">
                <template v-slot:default>
                    <tbody>
                    <tr class="recentTable" v-for="item in healers" :key="item.loot_id">
                        <td>
                            <div style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">{{
                                item.character_name }}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col cols="12" sm="4">
            <v-card class="pa-2" outlined tile style="color: orange">
                <div style="display: inline-block">
                <v-img  style="display: inline-block;vertical-align: middle" height="32px" width="32px" :src=damageImage />
                    <div style="display: inline-block;color: orange;margin-left: 5px">DPS</div>
                   <div style="position: absolute; right: 10px;top: 13px">{{this.damage.length}}</div>
                </div>
            </v-card>
            <v-simple-table class="recentTable  mx-2 my-2">
                <template v-slot:default>
                    <tbody>
                    <tr class="recentTable" v-for="item in damage" :key="item.loot_id">
                        <td>
                            <div style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">{{
                                item.character_name }}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>

    </v-row>
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
        name: "RaidAttendance",
        data: () => {
            return {
                tanks: [],
                healers: [],
                damage: [],
                tankImage: tankImage,
                healerImage: healerImage,
                damageImage: damageImage
            }
        },
        mounted() {
            axios
                .get(process.env.VUE_APP_API_PATH + '/raids/1/attendance/')
                .then(response => {
                    let data = {
                        tanks: [],
                        healers: [],
                        damage: []
                    };
                    response.data.forEach((character) => {
                        switch (character.role) {
                            case 'Tank':
                                data.tanks.push(character);
                                break;
                            case 'Healer':
                                data.healers.push(character);
                                break;
                            case 'Damage':
                                data.damage.push(character);
                        }
                    });
                    this.tanks = data.tanks;
                    this.damage = data.damage;
                    this.healers = data.healers;
                })
                .catch(() => {

                })
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
            getRoleImage: (role) => {
                switch (role) {
                    case 'Tank':
                        return tankImage;
                    case 'Healer':
                        return healerImage;
                    case 'Damage':
                        return damageImage;
                }
            }
        }
    }
</script>

<style scoped>

</style>