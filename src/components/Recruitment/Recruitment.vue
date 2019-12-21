<template>
    <div align="center" class="mt-5">
        <div align="left"    class="mb-5" style="max-width: 1000px">The tables below indicate our current recruitment policy for slots on our raid team.  We are open to social applications of all classes and roles but social members will have low priority on raid slots </div >
        Tanks
        <v-data-table
                :headers="headers"
                :items="classes"
                style="max-width: 1000px"
                :hide-default-footer=hideFooter
                :hide-default-header="hideDefaultHeader"
                class="mb-5"
                :disable-pagination=disablePagination
                search="Tank"
                :calculate-widths="calculateWidths"
        >
            <template v-slot:item.recruitment_class="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-img v-on="on" height="28px" width="28px" style="display: inline-block;"
                               :src=getClassImage(item.recruitment_class)></v-img>
                    </template>
                    <span>{{item.recruitment_class}}</span>
                </v-tooltip>
            </template>
            <template v-slot:item.recruitment_role="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-img v-on="on" height="34px" width="34px" style="display: inline-block;"
                               :src=getRoleImage(item.recruitment_role)></v-img>
                    </template>
                    <span>{{item.recruitment_role}}</span>
                </v-tooltip>
            </template>
            <template v-slot:item.recruitment_class="{ item }">
                <div style="font-weight: bold" :class="'wow_' + item.recruitment_class.toLowerCase()">{{
                    item.recruitment_class
                    }}
                </div>
            </template>
            <template v-slot:item.recruitment_status="{ item }">
                <div style="font-weight: bold" :class="'recruitment_' + getRecruitmentStatus(item.recruitment_status).toLowerCase()">
                    {{getRecruitmentStatus(item.recruitment_status)}}
                </div>
            </template>
        </v-data-table>
        Healers
        <v-data-table
                :headers="headers"
                :items="classes"
                style="max-width: 1000px"
                :hide-default-footer=hideFooter
                :hide-default-header="hideDefaultHeader"
                class="mb-5"
                :disable-pagination=disablePagination
                search="Healer"
                :calculate-widths="calculateWidths"
        >
            <template v-slot:item.recruitment_class="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-img v-on="on" height="28px" width="28px" style="display: inline-block;"
                               :src=getClassImage(item.recruitment_class)></v-img>
                    </template>
                    <span>{{item.recruitment_class}}</span>
                </v-tooltip>
            </template>
            <template v-slot:item.recruitment_role="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-img v-on="on" height="34px" width="34px" style="display: inline-block;"
                               :src=getRoleImage(item.recruitment_role)></v-img>
                    </template>
                    <span>{{item.recruitment_role}}</span>
                </v-tooltip>
            </template>
            <template v-slot:item.recruitment_class="{ item }">
                <div style="font-weight: bold" :class="'wow_' + item.recruitment_class.toLowerCase()">{{
                    item.recruitment_class
                    }}
                </div>
            </template>
            <template v-slot:item.recruitment_status="{ item }">
                <div style="font-weight: bold" :class="'recruitment_' + getRecruitmentStatus(item.recruitment_status).toLowerCase()">
                    {{getRecruitmentStatus(item.recruitment_status)}}
                </div>
            </template>
        </v-data-table>
        DPS
        <v-data-table
                :headers="headers"
                :items="classes"
                style="max-width: 1000px"
                :hide-default-footer=hideFooter
                :hide-default-header="hideDefaultHeader"
                class="mb-5"
                :disable-pagination=disablePagination
                search="DPS"
                :calculate-widths="calculateWidths"
        >
            <template v-slot:item.recruitment_class="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-img v-on="on" height="28px" width="28px" style="display: inline-block;"
                               :src=getClassImage(item.recruitment_class)></v-img>
                    </template>
                    <span>{{item.recruitment_class}}</span>
                </v-tooltip>
            </template>
            <template v-slot:item.recruitment_role="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-img v-on="on" height="34px" width="34px" style="display: inline-block;"
                               :src=getRoleImage(item.recruitment_role)></v-img>
                    </template>
                    <span>{{item.recruitment_role}}</span>
                </v-tooltip>
            </template>
            <template v-slot:item.recruitment_class="{ item }">
                <div style="font-weight: bold" :class="'wow_' + item.recruitment_class.toLowerCase()">
                    {{item.recruitment_class}}
                </div>
            </template>
            <template v-slot:item.recruitment_status="{ item }">
                <div style="font-weight: bold" :class="'recruitment_' + getRecruitmentStatus(item.recruitment_status).toLowerCase()">
                    {{getRecruitmentStatus(item.recruitment_status)}}
                </div>
            </template>
        </v-data-table>
    </div>
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
        name: "Recruitment",
        data: () => {
            return {
                headers: [
                    {text: 'Role', value: 'recruitment_role',width: 200},
                    {text: 'Class', value: 'recruitment_class'},
                    {text: 'Status / Priority', value: 'recruitment_status',width: 200}
                ],
                classes: [],
                filter: '',
                disablePagination: true,
                hideFooter: true,
                hideDefaultHeader: false,
                loading: true,
                calculateWidths: true
            }
        },
        mounted() {
            this.loadRecruitment()
        },
        methods: {
            loadRecruitment: function () {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/recruitment')
                    .then(response => {
                        this.classes = response.data;
                        this.loading = false;
                    })
                    .catch(() => {

                    })
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
            getRoleImage: (role) => {
                switch (role) {
                    case 'Tank':
                        return tankImage;
                    case 'Healer':
                        return healerImage;
                    case 'Damage':
                    case 'DPS':
                        return damageImage;
                }
            },
            getRecruitmentStatus: (status) => {
                switch (status) {
                    case 0:
                        return 'CLOSED';
                    case 1:
                        return 'LOW';
                    case 2:
                        return 'OPEN';
                    case 3:
                        return 'HIGH';
                }
            }
        }
    }
</script>

<style scoped>

</style>