<template>
    <div align="center" style="padding-top: 10px">
        <div align="right" style="padding-right: 10px">
            <v-dialog
                    v-model="importDialog"
                    width="500"
            >

                    <template v-slot:activator="{ on }">
                        <v-btn
                                color="orange"
                                dark
                                v-on="on"
                                v-show="raidOpen"
                        >
                            IMPORT ATTENDEES
                        </v-btn>
                    </template>
                <v-form ref="importRaidForm">
                    <v-card>
                        <v-card-title
                                class="headline orange"
                                primary-title
                        >
                            Import Raid Attendees
                        </v-card-title>

                        <v-card-text style="padding: 20px">
                            Paste in a list of semi-colon separated character names ie: Azzuri;Shínná;
                            <v-textarea v-model="toBeImported" style="margin: 10px" color="orange" filled required
                                        :rules="formRules"></v-textarea>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="red"
                                    text
                                    @click="importDialog = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                    color="green"
                                    text
                                    @click="importAttendees"
                            >
                                Import
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-dialog>
            <v-btn v-show="raidOpen" @click="showCloseRaid" style="margin-left: 10px" color="orange">CLOSE RAID</v-btn>
        </div>

        <v-row no-gutter>
            <v-col cols="12" sm="4">
                <v-toolbar flat>
                    <v-toolbar-title>TANKS</v-toolbar-title>
                    <v-btn v-show="raidOpen" v-on:click="showAddCharacterToRaid('tanks')" text icon color="green">
                        <v-icon>mdi-plus-box</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-simple-table class="mx-2 my-2">

                    <template>
                        <tbody>
                        <tr class="" v-for="item in tanks" :key="item.character_id">
                            <td width="30px">

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-img height="28px" width="28px" :src="getClassImage(item.character_class)"
                                               v-on="on"></v-img>
                                    </template>
                                    <span>{{item.character_class}}</span>
                                </v-tooltip>
                            </td>
                            <td>
                                <div style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">{{
                                    item.character_name }}
                                </div>
                            </td>
                            <td width="50px">
                                <v-btn v-show="raidOpen" v-on:click="deleteCharacterAttendance(item.character_id)" text
                                       icon color="orange">
                                    <v-icon>mdi-trash-can</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col cols="12" sm="4">
                <v-toolbar flat>
                    <v-toolbar-title>HEALERS</v-toolbar-title>
                    <v-btn v-show="raidOpen" v-on:click="showAddCharacterToRaid('healers')" text icon color="green">
                        <v-icon>mdi-plus-box</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-simple-table class="mx-2 my-2">
                    <template v-slot:default>
                        <tbody>
                        <tr class="" v-for="item in healers" :key="item.chracter_id">
                            <td width="30px">

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-img height="28px" width="28px" :src="getClassImage(item.character_class)"
                                               v-on="on"></v-img>
                                    </template>
                                    <span>{{item.character_class}}</span>
                                </v-tooltip>
                            </td>
                            <td>
                                <div style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">{{
                                    item.character_name }}
                                </div>
                            </td>
                            <td width="50px">
                                <v-btn v-show="raidOpen" v-on:click="deleteCharacterAttendance(item.character_id)" text
                                       icon color="orange">
                                    <v-icon>mdi-trash-can</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col cols="12" sm="4">
                <v-toolbar flat>
                    <v-toolbar-title>DPS</v-toolbar-title>
                    <v-btn v-show="raidOpen" v-on:click="showAddCharacterToRaid('damage')" text icon color="green">
                        <v-icon>mdi-plus-box</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-simple-table class="recentTable  mx-2 my-2">
                    <template v-slot:default>
                        <tbody>
                        <tr class="" v-for="item in damage" :key="item.loot_id">
                            <td width="30px">

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-img height="28px" width="28px" :src="getClassImage(item.character_class)"
                                               v-on="on"></v-img>
                                    </template>
                                    <span>{{item.character_class}}</span>
                                </v-tooltip>
                            </td>
                            <td>
                                <div style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">{{
                                    item.character_name }}
                                </div>
                            </td>
                            <td width="50px">
                                <v-btn :v-show=raidOpen v-on:click="deleteCharacterAttendance(item.character_id)" text
                                       icon color="orange">
                                    <v-icon>mdi-trash-can</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>

        </v-row>
        <v-dialog v-model="addDialog" persistent max-width="500">
            <v-card>
                <v-card-title class="headline orange" primary-title>Add {{this.currentRole.toLowerCase()}} to raid
                </v-card-title>
                <v-data-table
                        v-model="selected"
                        :headers="addRoleHeaders"
                        :items="roster"
                        item-key="character_name"
                        hide-default-footer
                        class="elevation-1"
                        height="400px"
                        show-select
                        :items-per-page="itemsPerPage"
                        :disable-pagination=disablePagination
                >
                    <template v-slot:item.character_class="{ item }" :headers="addRoleHeaders[0]">
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-img v-on="on" height="28px" width="28px" style="display: inline-block;"
                                       :src=getClassImage(item.character_class)></v-img>
                            </template>
                            <span>{{item.character_class}}</span>
                        </v-tooltip>
                    </template>
                    <template v-slot:item.character_name="{ item }">
                        <div style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">
                            {{item.character_name}}
                        </div>
                    </template>
                </v-data-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="addDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" text v-on:click="addCharactersToRaid">ADD</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="closeRaidDialog" persistent max-width="500">
            <v-card>
                <v-card-title class="headline orange" primary-title>Close Raid
                </v-card-title>
                <v-card-text style="padding: 20px">Are you sure you want to close this raid?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="closeRaidDialog = false">Cancel</v-btn>
                    <v-btn color="red darken-1" text v-on:click="closeRaid">CLOSE RAID</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
        name: "RaidAttendance",
        props: {
            "tanks": Array,
            "healers": Array,
            "damage": Array,
            "raidStatus": Number
        },
        data: () => {
            return {
                tankImage: tankImage,
                healerImage: healerImage,
                damageImage: damageImage,
                importDialog: false,
                addDialog: false,
                closeRaidDialog: false,
                currentRole: '',
                roster: [],
                addRoleHeaders: [
                    {
                        text: '',
                        width: '30px',
                        value: 'character_class',
                        sortable: false
                    },
                    {
                        text: '',
                        value: 'character_name',
                        sortable: false
                    }
                ],
                selected: [],
                toBeImported: '',
                itemsPerPage: -1,
                disablePagination: true,
                formRules: [
                    v => !!v || 'This field is required'
                ]
            }
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
            },
            showAddCharacterToRaid: function (role) {
                this.selected = [];
                let apiRole;
                switch (role) {
                    case 'tanks':
                        apiRole = 'tank';
                        break;
                    case 'damage':
                        apiRole = 'damage';
                        break;
                    case 'healers':
                        apiRole = 'healer';
                        break;
                }
                this.currentRole = role;
                this.addDialog = true;
                axios
                    .get(process.env.VUE_APP_API_PATH + '/roster/' + apiRole)
                    .then(response => {
                        response.data.forEach((record, index) => {
                            if (this[role].some(character => character.character_name === record.character_name)) {
                                delete response.data[index];
                            }
                        });
                        this.roster = response.data;
                    })
                    .catch(() => {

                    })
            },
            addCharactersToRaid: function () {
                axios
                    .post(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/attendance/', {
                        data: this.selected
                    })
                    .then(() => {
                        this.$emit('reloadAttendees');
                        this.addDialog = false;
                    })
                    .catch(() => {

                    });
            },
            deleteCharacterAttendance: function (character_id) {
                axios
                    .delete(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/attendance/' + character_id)
                    .then(() => {
                        this.$emit('reloadAttendees');
                    })
                    .catch(() => {

                    });
            },
            importAttendees: function () {
                if (this.$refs.importRaidForm.validate()) {
                    axios
                        .post(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/attendance/import', {
                            data: this.toBeImported
                        })
                        .then(() => {
                            this.$emit('reloadAttendees');
                            this.importDialog = false;
                            this.toBeImported = '';
                        })
                        .catch(() => {
                            this.importDialog = false;
                            this.toBeImported = '';
                        });
                }
            },
            showCloseRaid: function () {
                this.closeRaidDialog = true;
            },
            closeRaid: function () {
                axios
                    .put(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/close/')
                    .then(() => {
                        this.closeRaidDialog = false;
                        this.raidStatus = 0;
                    })
                    .catch(() => {

                    });
            }
        },
        computed: {
            raidOpen() {
                return this.raidStatus === 1 && this.$store.getters.getRole === 'ARCHKEEPERS'
            }
        }
    }
</script>

<style scoped>

</style>