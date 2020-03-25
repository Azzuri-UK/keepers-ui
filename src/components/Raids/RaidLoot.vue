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
<!--                    <v-dialog persistent v-model="importLootDialog" max-width="500px">-->
<!--                        <template v-slot:activator="{ on }">-->
<!--                            <v-btn v-show="raidOpen" color="orange" dark class="mb-2 mr-2" v-on="on">Import loot</v-btn>-->
<!--                        </template>-->
<!--                        <v-form ref="addLootForm" v-model="isAddFormValid">-->
<!--                            <v-card>-->
<!--                                <v-card-title>-->
<!--                                    <span class="headline">{{ formTitle }}</span>-->
<!--                                </v-card-title>-->

<!--                                <v-card-text>-->
<!--                                    <v-container>-->
<!--                                        <v-row>-->
<!--                                            <v-autocomplete-->
<!--                                                    v-model="editedItem.character_id"-->
<!--                                                    item-text="character_name"-->
<!--                                                    item-value="character_id"-->
<!--                                                    :items="attendees"-->
<!--                                                    label="Character"-->
<!--                                                    color="orange"-->
<!--                                                    item-color="orange"-->
<!--                                                    :return-object="returnObject"-->
<!--                                                    required-->
<!--                                                    :rules="dropDownRules"-->
<!--                                            >-->
<!--                                                <template slot="selection" slot-scope="data">-->
<!--                                                    <div style="font-weight: bold"-->
<!--                                                         :class="'wow_' + data.item.character_class.toLowerCase()">{{-->
<!--                                                        data.item.character_name }}-->
<!--                                                    </div>-->
<!--                                                </template>-->
<!--                                                <template slot="item" slot-scope="data">-->
<!--                                                    <div style="font-weight: bold"-->
<!--                                                         :class="'wow_' + data.item.character_class.toLowerCase()">{{-->
<!--                                                        data.item.character_name }}-->
<!--                                                    </div>-->
<!--                                                </template>-->
<!--                                            </v-autocomplete>-->
<!--                                        </v-row>-->
<!--                                        <v-row>-->
<!--                                            <v-autocomplete-->
<!--                                                    v-model="editedItem.item_id"-->
<!--                                                    :items="drops"-->
<!--                                                    label="Item"-->
<!--                                                    color="orange"-->
<!--                                                    item-color="orange"-->
<!--                                                    item-text="item_name"-->
<!--                                                    item-value="item_id"-->
<!--                                                    :return-object="returnObject"-->
<!--                                                    required-->
<!--                                                    :rules="dropDownRules"-->
<!--                                            >-->
<!--                                                <template slot="selection" slot-scope="data">-->
<!--                                                    <div style="font-weight: bold"-->
<!--                                                         :class="'q' + data.item.item_quality">{{-->
<!--                                                        data.item.item_name }}-->
<!--                                                    </div>-->
<!--                                                </template>-->
<!--                                                <template slot="item" slot-scope="data">-->
<!--                                                    <div style="font-weight: bold"-->
<!--                                                         :class="'q' + data.item.item_quality">{{-->
<!--                                                        data.item.item_name }}-->
<!--                                                    </div>-->
<!--                                                </template>-->
<!--                                            </v-autocomplete>-->
<!--                                        </v-row>-->
<!--                                        <v-row>-->
<!--                                            <v-autocomplete-->
<!--                                                    dark-->
<!--                                                    color="orange"-->
<!--                                                    v-model="editedItem.loot_type"-->
<!--                                                    item-text="text"-->
<!--                                                    item-value="value"-->
<!--                                                    :items="lootTypes"-->
<!--                                                    item-color="orange"-->
<!--                                                    label="Loot type"-->
<!--                                                    required-->
<!--                                                    :rules="dropDownRules"-->
<!--                                            >-->
<!--                                            </v-autocomplete>-->
<!--                                        </v-row>-->
<!--                                        <v-row>-->

<!--                                            <v-text-field color="orange" v-model="editedItem.calories"-->
<!--                                                          label="Notes"></v-text-field>-->

<!--                                        </v-row>-->
<!--                                    </v-container>-->
<!--                                </v-card-text>-->

<!--                                <v-card-actions>-->
<!--                                    <v-spacer></v-spacer>-->
<!--                                    <v-btn color="red" text @click="close">Cancel</v-btn>-->
<!--                                    <v-btn color="green" text @click="save">Save</v-btn>-->
<!--                                </v-card-actions>-->
<!--                            </v-card>-->
<!--                        </v-form>-->
<!--                    </v-dialog>-->
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
                                                    v-on:change="setLootWindow"
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
                                                    :disabled="editedItem.disenchant"
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
                                        <v-row>
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
                                                    :disabled="editedItem.disenchant"
                                            >
                                            </v-autocomplete>
                                        </v-row>
                                        <v-row>
                                            <v-autocomplete
                                                    dark
                                                    color="orange"
                                                    v-model="editedItem.loot_subtype"
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
                    {{getLootSubType(item.loot_subcategory)}}
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


            </template>
        </v-data-table>
        <v-dialog
                v-model="deleteDialog"
                width="500"
        >

            <v-card>
                <v-card-title
                        class="headline orange"
                        primary-title
                >
                    Delete Item
                </v-card-title>

                <v-card-text style="vertical-align: middle;padding: 20px">
                    Are you sure you want to remove <span style="font-weight: bold"
                                                          :class="'q' + deletedItem.item_quality">{{this.deletedItem.item_name}}</span>
                    from <span style="font-weight: bold"
                               :class="'wow_' + this.deletedItem.character_class.toLowerCase()">{{this.deletedItem.character_name}}</span>
                </v-card-text>

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
        name: "RaidLoot",
        props: ["attendees", "drops", "raidStatus"],
        data: () => {
            return {
                loot: [],
                itemsPerPage: -1,
                disablePagination: true,
                hideFooter: true,
                hideHeader: false,
                returnObject: false,
                tankImage: tankImage,
                healerImage: healerImage,
                damageImage: damageImage,
                dialog: false,
                deleteDialog: false,
                currentRole: '',
                deletedItem: {
                    character_name: '',
                    character_class: '',
                    item_name: '',
                    item_quality: ''
                },
                editedIndex: -1,
                editedItem: {
                    character_id: '',
                    item_id: 0,
                    item_name: '',
                    item_quality: 0,
                    loot_type: 3,
                    loot_subcategory: 0,
                    notes: '',
                    disenchant: false
                },
                defaultItem: {
                    character_id: '',
                    item_id: 0,
                    item_name: '',
                    item_quality: 0,
                    loot_type: 3,
                    loot_subcategory: 0,
                    notes: ''
                },
                selected: [],
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
                isAddFormValid: false,
                dropDownRules: [
                    v => !!v || 'This field is required'
                ],
                importLootDialog: false
            }
        },
        mounted() {
            this.loadLootData()
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

            loadLootData: function () {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/raids/' + this.$route.params.raidId + '/loot/')
                    .then(response => {
                        this.loot = response.data
                    })
                    .catch(() => {

                    })
            },
            getLootType: function (loot_type) {
                switch (loot_type) {
                    case 1:
                        return 'Best in Slot';
                    case 2:
                        return 'Free Roll';
                    case 3:
                        return 'Loot Council'
                }
            },
            getLootSubType: function (loot_type) {
                switch (loot_type) {
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
            editItem(item) {
                this.editedIndex = this.loot.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },
            showDeleteItem(item) {
                this.deleteDialog = true;
                this.deletedItem = item;
            },
            deleteItem() {
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
            },
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            save() {
                let item = this.editedItem;
                if (item.disenchant===true){
                    item.loot_subtype = 5;
                }
                if (this.$refs.addLootForm.validate() || item.disenchant===true) {
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
                }

            },
            setLootWindow() {

            }
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
                        {text: 'Actions', value: 'action', sortable: false, width: 50},
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