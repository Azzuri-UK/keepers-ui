<template>
    <div align="center" style="padding: 10px">
        <v-text-field
                style="max-width: 1000px"
                color="orange"
                v-model="filter"
                append-icon="mdi-magnify"
                label="Search (Character or item name)"
                single-line
                hide-details
                :loading="loading"
                loading-text="Loading... Please wait">
            >
        </v-text-field>
        <v-data-table
                :headers="computedHeaders"
                :items="drops"
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
                <div v-if="item.character_status=== 1" style="font-weight: bold"
                     :class="'wow_' + item.character_class.toLowerCase()">{{
                    item.character_name
                    }}
                </div>
                <v-tooltip nudge-left="80" left v-if="item.character_status=== 0">
                    <template v-slot:activator="{ on }">
                        <div v-on="on" style="font-weight: bold;" class="guildless">
                            {{item.character_name }}
                        </div>
                    </template>
                    <span>   {{item.character_name }} is no longer in the guild</span>
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
                    {{getLootSubType(item.loot_subcategory,item.loot_type)}}
                </div>
            </template>
            <template v-slot:item.raid_date="{ item }">
                <span>{{new Date(item.raid_date).toLocaleDateString().split(",")[0]}}</span>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon
                        small
                        color="orange"
                        @click="showDeleteItem(item)"
                >
                    mdi-delete
                </v-icon>

                <v-icon v-if="item.loot_subcategory !==5"
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
        <v-dialog persistent v-model="editDialog" max-width="500px">
            <v-form ref="editLootForm" v-model="isEditFormValid">
                <v-card>
                    <v-card-title>
                        <span class="headline">Edit Item</span>
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
                                        v-model="editedItem.character_name"
                                        item-text="character_name"
                                        item-value="character_name"
                                        :items="[editedItem]"
                                        label="Character"
                                        color="orange"
                                        item-color="orange"
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
                                        :items="[editedItem]"
                                        label="Item"
                                        color="orange"
                                        item-color="orange"
                                        item-text="item_name"
                                        item-value="item_id"
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
                lootTypes: [
                    {
                        text: 'Loot Council',
                        value: 3
                    },
                ],
                lootSubTypes: [
                    {
                        text: 'Mainspec/Need',
                        value: 1
                    },
                    {
                        text: 'Minor Upgrade',
                        value: 2
                    },
                    {
                        text: 'Offspec/Other',
                        value: 3
                    },
                    {
                        text: 'Resist Gear',
                        value: 4
                    },
                ],
                headers: [
                    {text: '', value: 'character_class', width: 30},
                    {text: 'Character', value: 'character_name'},
                    {text: 'Item', value: 'item_id'},
                    {text: 'Loot Type', value: 'loot_type'},
                    {text: 'Awarded For', value: 'loot_subcategory'},
                    {text: 'Date', value: 'raid_date'},
                ],
                drops: [],
                filter: '',
                itemsPerPage: 25,
                loading: true,
                footerProps: {
                    itemsPerPageOptions: [10, 25, 50]
                },
                deleteDialog: false,
                isDeleteFormValid: false,
                dropDownRules: [
                    v => !!v || 'This field is required'
                ],
                importLootDialog: false,
                formRules: [
                    v => !!v || 'This field is required'
                ],
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
                    character_class: '',
                    item_id: 0,
                    item_name: '',
                    item_quality: 0,
                    loot_type: 3,
                    loot_subcategory: 0,
                    notes: '',
                    disenchant: false,
                    reason: ''
                },
                editDialog: false,
                isEditFormValid: false,
                defaultItem: {
                    character_id: '',
                    item_id: 0,
                    item_name: '',
                    item_quality: 0,
                    loot_type: 3,
                    loot_subcategory: 0,
                    notes: '',
                    reason: '',
                    id:null
                }
            }
        },
        mounted() {
            this.getLoot()
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
                        case 4:
                            return 'EPGP'
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
            getLootSubType: function (loot_subtype,loot_type) {
                switch (loot_type) {
                    case 1:
                        return 'Best in Slot';
                    case 2:
                        return 'Free Roll';
                    case 3:
                        switch (loot_subtype) {
                            case 1:
                                return 'Mainspec/Need';
                            case 2:
                                return 'Minor Upgrade';
                            case 3:
                                return 'Offspec/Other';
                            case 4:
                                return 'Resist Gear';
                            case 5:
                                return 'Disenchanted';
                            default:
                                return ''
                        }
                    case 4:
                        switch (loot_subtype) {
                            case 1:
                                return 'Need';
                            case 2:
                                return 'Minor Upgrade';
                            case 3:
                                return 'Offspec';
                            case 5:
                                return 'Disenchanted';
                            default:
                                return ''
                        }
                }

            },
            getLoot: function () {
                if (this.cancelToken) {
                    let source = this.cancelToken.source();
                    source.cancel();
                } else {
                    this.cancelToken = axios.CancelToken;
                }
                axios
                    .get(process.env.VUE_APP_API_PATH + '/loot?search=' + this.filter)
                    .then(response => {
                        this.drops = response.data;
                        this.loading = false;
                    })
                    .catch(() => {

                    })
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
                            this.getLoot();
                            this.deleteDialog = false;
                        })
                        .catch(() => {

                        });
                }
            },
            editItem(item) {

                this.editedIndex = this.drops.indexOf(item);
                if (item.loot_subcategory === 5){
                    item.disenchant = true;
                }
                this.editedItem = Object.assign({}, item);
                this.attendees = [
                    {
                        character_name: item.character_name,
                        character_class: item.character_class
                    }
                ];

                this.editDialog = true
            },
            close() {
                this.editDialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                    this.$refs.editLootForm.reset()
                }, 300)
            },
            save() {
                let item = this.editedItem;
                //eslint-disable-next-line
                console.log(item);
                if (item.disenchant === true) {
                    item.loot_subtype = 5;
                }
                if (this.$refs.editLootForm.validate() || item.disenchant === true) {
                    axios
                        .put(process.env.VUE_APP_API_PATH + '/loot/'+ item.id, {
                            data: item
                        })
                        .then(() => {
                            this.editedItem = this.defaultItem;
                            this.getLoot();
                            this.close();
                        })
                        .catch(() => {

                        });
                }

            }
        },
        watch: {
            filter: {
                handler: function () {
                    if (this.filter.length > 3 || this.filter.length === 0) {
                        this.getLoot()
                    }
                },
                immediate: false
            }
        },
        computed: {
            computedHeaders() {
                if (this.$store.getters.getRole === 'OFFICER') {
                    return [
                        {text: '', value: 'character_class', width: 30},
                        {text: 'Character', value: 'character_name'},
                        {text: 'Item', value: 'item_id'},
                        {text: 'Loot Type', value: 'loot_type'},
                        {text: 'Awarded For', value: 'loot_subcategory'},
                        {text: 'Date', value: 'raid_date'},
                        {text: 'Actions', value: 'action', sortable: false, width: 75},
                    ]
                } else {
                    return [
                        {text: '', value: 'character_class', width: 30},
                        {text: 'Character', value: 'character_name'},
                        {text: 'Item', value: 'item_id'},
                        {text: 'Loot Type', value: 'loot_type'},
                        {text: 'Awarded For', value: 'loot_subcategory'},
                        {text: 'Date', value: 'raid_date'},
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>