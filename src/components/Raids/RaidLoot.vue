<template>
    <div align="center" style="padding-top: 10px">
        <v-data-table
                style="max-width: 1000px"
                :headers="computedHeaders"
                :items="loot"
                :items-per-page="itemsPerPage"
                :hide-default-footer=hideFooter
                :hide-default-header="hideHeader"
                :sort-by="['character_role','character_name']"
                :sort-desc="[true,false]"
                :disable-pagination=disablePagination
                class="recentTable"

        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-dialog persistent v-model="importLootDialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn v-show="raidOpen" color="orange" dark class="mb-2 mr-2" v-on="on">Import loot</v-btn>
                        </template>
                        <v-form ref="importLootForm" v-model="isImportFormValid">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Import Loot</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-card-text style="padding: 20px">
                                            Paste in a list the full export text from RC Loot Council
                                            <v-textarea v-model="lootToBeImported" style="margin: 10px" color="orange"
                                                        filled required
                                                        :rules="formRules"></v-textarea>
                                        </v-card-text>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red" text @click="closeImport">Cancel</v-btn>
                                    <v-btn :disabled="isImportButtonDisabled"  color="green" text @click="importLoot">Import</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-dialog>
                    <v-dialog persistent v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn v-show="raidOpen" color="orange" dark class="mb-2" v-on="on">Add loot</v-btn>
                        </template>
                        <v-form ref="addLootForm" v-model="isAddFormValid">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-checkbox
                                                    v-model="editedItem.disenchant"
                                                    label="Disenchant"
                                                    :disabled="editedItem.id !==null"
                                            >
                                            </v-checkbox>
                                        </v-row>
                                        <v-row>
                                            <v-autocomplete
                                                    v-model="editedItem.character_id"
                                                    item-text="character_name"
                                                    item-value="character_id"
                                                    :items="attendees"
                                                    label="Character"
                                                    color="orange"
                                                    item-color="orange"
                                                    :return-object="returnObject"
                                                    required
                                                    :rules="dropDownRules"
                                                    :disabled="editedItem.disenchant  || editedItem.id !==null"
                                            >
                                                <template slot="selection" slot-scope="data">
                                                    <div style="font-weight: bold"
                                                         :class="'wow_' + data.item.character_class.toLowerCase()">{{
                                                        data.item.character_name }}
                                                    </div>
                                                </template>
                                                <template slot="item" slot-scope="data">
                                                    <div style="font-weight: bold"
                                                         :class="'wow_' + data.item.character_class.toLowerCase()">{{
                                                        data.item.character_name }}
                                                    </div>
                                                </template>
                                            </v-autocomplete>
                                        </v-row>
                                        <v-row>
                                            <v-autocomplete
                                                    v-model="editedItem.item_id"
                                                    :items="drops"
                                                    label="Item"
                                                    color="orange"
                                                    item-color="orange"
                                                    item-text="item_name"
                                                    item-value="item_id"
                                                    :return-object="returnObject"
                                                    required
                                                    :rules="dropDownRules"
                                                    :disabled="editedItem.id !==null"
                                            >
                                                <template slot="selection" slot-scope="data">
                                                    <div style="font-weight: bold"
                                                         :class="'q' + data.item.item_quality">{{
                                                        data.item.item_name }}
                                                    </div>
                                                </template>
                                                <template slot="item" slot-scope="data">
                                                    <div style="font-weight: bold"
                                                         :class="'q' + data.item.item_quality">{{
                                                        data.item.item_name }}
                                                    </div>
                                                </template>
                                            </v-autocomplete>
                                        </v-row>
                                        <v-row v-if="editedItem.id !==null">
                                            <v-autocomplete
                                                    dark
                                                    color="orange"
                                                    v-model="editedItem.loot_type"
                                                    item-text="text"
                                                    item-value="value"
                                                    :items="lootTypes"
                                                    item-color="orange"
                                                    label="Loot type"
                                                    required
                                                    :rules="dropDownRules"
                                                    :disabled="editedItem.disenchant || editedItem.id !==null"
                                            >
                                            </v-autocomplete>
                                        </v-row>
                                        <v-row>
                                            <v-autocomplete
                                                    dark
                                                    color="orange"
                                                    v-model="editedItem.loot_subcategory"
                                                    item-text="text"
                                                    item-value="value"
                                                    :items="lootSubTypes"
                                                    item-color="orange"
                                                    label="Awarded for"
                                                    required
                                                    :rules="dropDownRules"
                                                    :disabled="editedItem.disenchant"
                                            >
                                            </v-autocomplete>
                                        </v-row>
                                        <v-row>
                                            <v-text-field
                                                    color="orange"
                                                    v-model="editedItem.notes"
                                                    label="Notes"
                                                    :disabled="editedItem.disenchant"
                                            ></v-text-field>
                                        </v-row>
                                        <v-row v-if="editedItem.id !==null">
                                            <v-text-field
                                                    :rules="formRules"
                                                    color="orange"
                                                    v-model="editedItem.reason"
                                                    label="Reason for edit"
                                                    :disabled="editedItem.disenchant"
                                            ></v-text-field>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red" text @click="close">Cancel</v-btn>
                                    <v-btn color="green" text @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-dialog>
                </v-toolbar>
            </template>
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
                    {{getLootSubType(item.loot_subcategory,item.loot_type)}}
                </div>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon
                        small
                        color="orange"
                        @click="showDeleteItem(item)"
                >
                    mdi-delete
                </v-icon>

                <v-icon
                        small
                        color="orange"
                        @click="editItem(item)"

                >
                    mdi-pencil
                </v-icon>

            </template>
        </v-data-table>
        <v-dialog
                v-model="deleteDialog"
                width="500"
        >
            <v-form ref="deleteLootForm" v-model="isDeleteFormValid">
                <v-card>
                    <v-card-title
                            class="headline orange"
                            primary-title
                    >
                        Delete Item
                    </v-card-title>

                    <v-card-text style="vertical-align: middle;padding: 10px">
                        Are you sure you want to remove <span style="font-weight: bold"
                                                              :class="'q' + deletedItem.item_quality">{{this.deletedItem.item_name}}</span>
                        from <span style="font-weight: bold"
                                   :class="'wow_' + this.deletedItem.character_class.toLowerCase()">{{this.deletedItem.character_name}}</span>
                    </v-card-text>
                    <v-card-text style="vertical-align: middle;padding: 10px">
                        Please enter the reason why this item is being removed
                    </v-card-text>
                    <v-text-field
                            class="pa-5"
                            color="orange"
                            v-model="deletedItem.reason"
                            label="Reason"
                            :rules="formRules"
                    ></v-text-field>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="green"
                                text
                                @click="deleteDialog = false"
                        >
                            cancel
                        </v-btn>
                        <v-btn
                                color="red"
                                text
                                @click="deleteItem"
                        >
                            Remove
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    import Classes from "../../mixins/Classes";
    import Roles from "../../mixins/Roles";
    import Loot from "../../mixins/Loot";

    export default {
        name: "RaidLoot",
        props: ["attendees", "drops", "raidStatus"],
        mixins: [Classes,Roles,Loot],
        data: () => {
            return {
                loot: [],
                itemsPerPage: -1,
                disablePagination: true,
                hideFooter: true,
                hideHeader: false,
                returnObject: false,
                dialog: false,
                deleteDialog: false,
                editDialog: false,
                currentRole: '',
                deletedItem: {
                    character_name: '',
                    character_class: '',
                    item_name: '',
                    item_quality: '',
                    id: null,
                    reason: ''
                },
                editedIndex: -1,
                editedItem: {
                    id: null,
                    character_id: '',
                    item_id: 0,
                    item_name: '',
                    item_quality: 0,
                    loot_type: 4,
                    loot_subcategory: 0,
                    notes: '',
                    disenchant: false,
                    reason: ''
                },
                defaultItem: {
                    character_id: '',
                    item_id: 0,
                    item_name: '',
                    item_quality: 0,
                    loot_type: 4,
                    loot_subcategory: 0,
                    notes: '',
                    reason: '',
                    id:null
                },
                selected: [],
                isAddFormValid: false,
                isImportFormValid: false,
                isDeleteFormValid: false,
                dropDownRules: [
                    v => !!v || 'This field is required'
                ],
                importLootDialog: false,
                formRules: [
                    v => !!v || 'This field is required'
                ],
                lootToBeImported: null,
                isImportButtonDisabled: false
            }
        },
        mounted() {
            this.loadLootData()
        },
        methods: {
            loadLootData: function () {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/loot/')
                    .then(response => {
                        this.loot = response.data
                    })
                    .catch(() => {

                    })
            },
            editItem(item) {
                //eslint-disable-next-line
                this.editedIndex = this.loot.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },
            showDeleteItem(item) {
                this.deleteDialog = true;
                this.deletedItem = item;
            },
            deleteItem() {
                if (this.$refs.deleteLootForm.validate()) {
                    axios
                        .delete(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/loot/', {
                            data: this.deletedItem
                        })
                        .then(() => {
                            this.loadLootData();
                            this.deleteDialog = false;
                        })
                        .catch(() => {

                        });
                }
            },
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                    this.$refs.addLootForm.reset()
                }, 300)
            },
            closeImport() {
                this.importLootDialog = false;
            },
            importLoot() {
                if (this.$refs.importLootForm.validate()) {
                    this.isImportButtonDisabled = true;
                    axios
                        .post(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/loot/import', {
                            data: this.lootToBeImported
                        })
                        .then(() => {
                            this.$emit('reloadAttendees');

                            setTimeout(() => {
                                this.loadLootData();
                                this.closeImport();
                                this.lootToBeImported = null
                                this.isImportButtonDisabled = true;
                                }, 2000);
                        })
                        .catch(() => {
                            this.closeImport();
                            this.lootToBeImported = null;

                        });
                } else {
                    //eslint-disable-next-line
                    console.log('form not valid')
                }
            },
            save() {
                let item = this.editedItem;
                if (item.disenchant === true) {
                    item.loot_subtype = 5;
                }
                if (this.$refs.addLootForm.validate() || item.disenchant === true) {
                    if (item.id === null) {
                        axios
                            .post(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/loot/', {
                                data: item
                            })
                            .then(() => {
                                this.editedItem = this.defaultItem;
                                this.loadLootData();
                                this.close();
                            })
                            .catch(() => {

                            });
                    } else {
                        axios
                            .put(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/loot/' + item.id, {
                                data: item
                            })
                            .then(() => {
                                this.editedItem = this.defaultItem;
                                this.loadLootData();
                                this.close();
                            })
                            .catch(() => {

                            });
                    }
                }

            },
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Add loot' : 'Edit loot'
            },
            raidOpen() {
                return this.raidStatus === 1 && (this.$store.getters.getRole === 'OFFICER')
            },
            computedHeaders() {
                if (this.raidOpen === true) {
                    return [
                        {text: '', value: 'character_class', width: 30},
                        {text: 'Character', value: 'character_name'},
                        {text: 'Item', value: 'item_id'},
                        {text: 'Loot Type', value: 'loot_type'},
                        {text: 'Awarded for', value: 'loot_subcategory'},
                        {text: 'Actions', value: 'action', sortable: false, width: 75},
                    ]
                } else {
                    return [
                        {text: '', value: 'character_class', width: 30},
                        {text: 'Character', value: 'character_name'},
                        {text: 'Item', value: 'item_id'},
                        {text: 'Loot Type', value: 'loot_type'},
                        {text: 'Awarded for', value: 'loot_subcategory'},
                    ]
                }
            }
        },
        watch: {
            dialog(val) {
                val || this.close()
            },
        },


    }
</script>

<style scoped>

</style>