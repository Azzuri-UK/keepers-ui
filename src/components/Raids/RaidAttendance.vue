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
                        <v-radio-group  class="pl-5" v-model="importType" row>
                            <v-radio color="orange" label="CSV" value="CSV"></v-radio>
                            <v-radio color="orange" label="ATGC" value="ATGC"></v-radio>
                            <v-radio color="orange"  label="MRT" value="MRT"></v-radio>
                        </v-radio-group>
                        <v-card-text class="pl-5">
                            <span v-if="importType==='CSV'">Paste in a list of comma separated character names ie: Azzuri,Shínná</span>
                            <span v-if="importType==='ATGC'">Paste in the output of /atgc <a target="_blank" href="https://www.curseforge.com/wow/addons/at-raid-export">https://www.curseforge.com/wow/addons/at-raid-export</a></span>
                            <span v-if="importType==='MRT'">Paste in the output of an "Export H" from /mrt  <br> Output must be set to plain text <a target="_blank" href="https://www.curseforge.com/wow/addons/mizusraidtracker">https://www.curseforge.com/wow/addons/mizusraidtracker</a></span>
                            <v-textarea class="mt-5" v-model="toBeImported"  color="orange" filled required
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
            <v-btn v-show="raidClosed" @click="showOpenRaid" style="margin-left: 10px" color="orange">REOPEN RAID</v-btn>
        </div>

        <v-row no-gutter>
            <v-col cols="12" sm="3">
                <v-toolbar flat>
                    <v-toolbar-title>TANKS</v-toolbar-title>
                    <v-btn v-show="raidOpen" v-on:click="showAddCharacterRoleToRaid('tanks')" text icon color="green">
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
            <v-col cols="12" sm="3">
                <v-toolbar flat>
                    <v-toolbar-title>HEALERS</v-toolbar-title>
                    <v-btn v-show="raidOpen" v-on:click="showAddCharacterRoleToRaid('healers')" text icon color="green">
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
            <v-col cols="12" sm="3">
                <v-toolbar flat>
                    <v-toolbar-title>DPS</v-toolbar-title>
                    <v-btn v-show="raidOpen" v-on:click="showAddCharacterRoleToRaid('damage')" text icon color="green">
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
            <v-col cols="12" sm="3">
                <v-toolbar flat>
                    <v-toolbar-title>BENCH</v-toolbar-title>
                    <v-btn v-show="raidOpen" v-on:click="showAddCharacterToBench()" text icon color="green">
                        <v-icon>mdi-plus-box</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-simple-table class="mx-2 my-2">

                    <template>
                        <tbody>
                        <tr class="" v-for="item in bench" :key="item.character_id">
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
        <v-dialog v-model="openRaidDialog" persistent max-width="500">
            <v-card>
                <v-card-title class="headline orange" primary-title>Close Raid
                </v-card-title>
                <v-card-text style="padding: 20px">Are you sure you want to reopen this raid?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="openRaidDialog = false">Cancel</v-btn>
                    <v-btn color="red darken-1" text v-on:click="openRaid">REOPEN RAID</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    import Roles from '../../mixins/Roles'
    import Classes from '../../mixins/Classes'

    export default {
        name: "RaidAttendance",
        mixins: [Roles,Classes],
        props: {
            "tanks": Array,
            "healers": Array,
            "damage": Array,
            "bench": Array,
            "raidStatus": Number
        },
        data: () => {
            return {
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
                ],
                importType: 'CSV',
                openRaidDialog: false
            }
        },

        methods: {
            showAddCharacterRoleToRaid: function (role) {
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
            showAddCharacterToBench: function () {
                this.selected = [];
                this.addDialog = true;
                this.currentRole = 'Benched Character';
                axios
                    .get(process.env.VUE_APP_API_PATH + '/roster/')
                    .then(response => {
                        response.data.forEach((record, index) => {
                            if (this.tanks.some(character => character.character_name === record.character_name)) {
                                delete response.data[index];
                            }
                            if (this.damage.some(character => character.character_name === record.character_name)) {
                                delete response.data[index];
                            }
                            if (this.healers.some(character => character.character_name === record.character_name)) {
                                delete response.data[index];
                            }
                        });
                        this.roster = response.data;
                    })
                    .catch(() => {

                    })
            },
            addCharactersToRaid: function () {
                this.selected.forEach((char)=> {
                    if (this.currentRole ==='Benched Character'){
                       char.character_role = 'Bench'
                    }
                });
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

                                import: this.toBeImported,
                                mode: this.importType

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
            showOpenRaid: function () {
                this.openRaidDialog = true;
            },
            closeRaid: function () {
                axios
                    .put(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/close/')
                    .then(() => {
                        this.closeRaidDialog = false;
                        this.raidStatus = 0;
                        location.reload();
                    })
                    .catch(() => {

                    });
            },
            openRaid: function () {
                axios
                    .put(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/open/')
                    .then(() => {
                        this.openRaidDialog = false;
                        this.raidStatus = 1;
                        location.reload();
                    })
                    .catch(() => {

                    });
            }
        },
        computed: {
            raidOpen() {
                return this.raidStatus === 1 && (this.$store.getters.getRole === 'OFFICER')
            },
            raidClosed() {
                return this.raidStatus === 0 && (this.$store.getters.getRole === 'OFFICER')
            }
        }
    }
</script>

<style scoped>

</style>