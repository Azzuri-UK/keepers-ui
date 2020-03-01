<template>
    <div align="center" style="padding-top: 20px">
        <div style="max-width: 1000px" align="right">
            <v-btn v-show="canAddCharacter" @click="addCharacterDialog = true" color="orange">ADD CHARACTER</v-btn>
            <v-btn v-show="canImportRoster" @click="importDialog = true" style="margin-left: 10px" color="orange">IMPORT
                ROSTER
            </v-btn>
        </div>
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
                style="max-width: 1000px"
                :headers="headers"
                :items="items"
                :items-per-page="itemsPerPage"
                :hide-default-footer=hideFooter
                :sort-by="['character_role','character_name']"
                :sort-desc="[true,false]"
                :disable-pagination=disablePagination
                :loading="loading"
                :search="filter"
                loading-text="Loading... Please wait">
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
                <div style="font-weight: bold" :class="'wow_' + item.character_class.toLowerCase()">{{
                    item.character_name
                    }}
                </div>
            </template>
        </v-data-table>
        <v-dialog v-model="importDialog" width="500">
            <v-card>
                <v-form ref="importRosterForm">
                    <v-card-title class="headline orange" primary-title>
                        Import Roster
                    </v-card-title>

                    <v-card-text style="padding: 20px">
                        Paste in a string from the roster export addon
                        <v-textarea v-model="toBeImported" style="margin: 10px" color="orange" filled required
                                    :rules="formRules"></v-textarea>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red" text @click="closeImportRosterDialog">
                            Cancel
                        </v-btn>
                        <v-btn color="green" text @click="importRoster">
                            Import
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog v-model="addCharacterDialog" persistent max-width="500">
            <v-form ref="addCharacterForm">
                <v-card>
                    <v-card-title class="headline orange" primary-title>Add Character
                    </v-card-title>
                    <div style="padding: 20px">
                        <v-text-field v-model="characterToAdd.name" label="Character Name" required
                                      :rules="formRules"/>
                        <v-select
                                :items="classes"
                                label="Class"
                                v-model="characterToAdd.class"
                                required
                                :rules="formRules"
                        >
                            <template slot="selection" slot-scope="data">
                                <div style="font-weight: bold" :class="'wow_' + data.item.toLowerCase()">
                                    {{data.item }}
                                </div>
                            </template>
                            <template slot="item" slot-scope="data">
                                <div style="font-weight: bold" :class="'wow_' + data.item.toLowerCase()">
                                    {{data.item }}
                                </div>
                            </template>
                        </v-select>
                        <v-select
                                :items="roles"
                                label="Role"
                                v-model="characterToAdd.role"
                                required
                                :rules="formRules"
                        ></v-select>

                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="closeAddCharacterDialog">Cancel</v-btn>
                        <v-btn color="green darken-1" text v-on:click="addCharacter">ADD</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
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
                hideFooter: true,
                loading: true,
                filter: '',
                importDialog: false,
                toBeImported: '',
                characterToAdd: {
                    name: '',
                    class: '',
                    role: ''
                },
                addCharacterDialog: false,
                classes: [
                    'Druid',
                    'Hunter',
                    'Mage',
                    'Paladin',
                    'Priest',
                    'Rogue',
                    'Warlock',
                    'Warrior'
                ],
                roles: [
                    'Tank',
                    'Healer',
                    'DPS'
                ],
                formRules: [
                    v => !!v || 'This field is required'
                ],
            }
        },
        mounted() {
            this.loadRoster()
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
            importRoster: function () {
                if (this.$refs.importRosterForm.validate()) {
                    axios
                        .post(process.env.VUE_APP_API_PATH + '/roster', {
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
            addCharacter: function () {
                if (this.$refs.addCharacterForm.validate()) {
                    axios
                        .post(process.env.VUE_APP_API_PATH + '/roster', {
                            data: this.characterToAdd
                        })
                        .then(() => {
                            this.loadRoster();
                            this.addCharacterDialog = false;
                            this.characterToAdd = {
                                name: '',
                                class: '',
                                role: ''
                            }
                        })
                        .catch(() => {
                            this.loadRoster();
                            this.importDialog = false;
                            this.characterToAdd = {
                                name: '',
                                class: '',
                                role: ''
                            }
                        })
                        .finally(() => {
                            this.resetValidation('importRosterForm')
                        });
                }
            },
            loadRoster: function () {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/roster')
                    .then(response => {
                        this.items = response.data;
                        this.loading = false;
                    })
                    .catch(() => {

                    })
            },
            resetValidation: function (formName) {
                this.$refs[formName].resetValidation()
            },
            closeAddCharacterDialog: function () {
                this.addCharacterDialog = false;
                this.resetValidation('addCharacterForm')
            },
            closeImportRosterDialog: function(){
                this.importDialog = false;
                this.resetValidation('importRosterForm')
            }
        },
        computed: {
            canAddCharacter() {
                return (this.$store.getters.getRole === 'ARCHKEEPERS' || this.$store.getters.getRole === 'KEEPERSCOUNCIL')
            },
            canImportRoster() {
                return (this.$store.getters.getRole === 'ARCHKEEPERS' || this.$store.getters.getRole === 'KEEPERSCOUNCIL')
            }
        }
    }
</script>

<style scoped>

</style>