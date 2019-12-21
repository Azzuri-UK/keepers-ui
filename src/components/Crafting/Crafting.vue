<template>
    <div align="center" style="padding-top: 20px">
        <div style="max-width: 1000px" align="right">
            <v-btn v-show="canAddRecipe" @click="addRecipeDialog = true" color="orange">ADD RECIPE</v-btn>
            <v-btn v-show="canAddCrafter" @click="addCrafterDialog = true" style="margin-left: 10px" color="orange">ADD
                CRAFTER
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
                :headers="headers"
                :items="drops"
                style="max-width: 1000px"
                :hide-default-footer=hideFooter
                :disable-pagination=disablePagination
                :search="filter"
                :sort-by="['profession','recipe']"
                :sort-desc="[false,false]"
                class="recentTable"
        >
            <template v-slot:item.recipe="{ item }">
                <a :href="'https://classic.wowhead.com/item=' + item.item_id"
                   style="font-weight: bold;text-decoration: none" :class="getItemClass(item.item_quality)"
                   :data-wowhead=item.item_id>{{item.recipe}}</a>
            </template>
            <template v-slot:item.crafter_count="{ item }">
                {{item.crafter_count}}
                <v-btn style="margin-top: -2px;margin-left: 40px" color="orange" text v-if="item.crafter_count > 0">VIEW CRAFTERS</v-btn>
            </template>
            <template v-slot:expanded-item="{ headers }">
                <td :colspan="headers.length">Peek-a-boo!</td>
            </template>
        </v-data-table>
        <v-dialog v-model="addRecipeDialog" persistent max-width="500">
            <v-form ref="addRecipeForm">
                <v-card>
                    <v-card-title class="headline orange" primary-title>Add Recipe
                    </v-card-title>
                    <div style="padding: 20px">
                        <v-text-field v-model="recipeToAdd.name" label="Item name (of the crafted item)" required
                                      :rules="formRules"/>
                        <v-text-field v-model="recipeToAdd.itemId" label="Item ID (of the plans/formula etc)" required
                                      :rules="formRules"/>
                        <v-select
                                :items="qualities"
                                label="Quality (of the crafted item)"
                                item-text="quality_name"
                                item-value="quality_id"
                                v-model="recipeToAdd.quality"
                                required
                                :rules="formRules"
                        >
                            <template slot="selection" slot-scope="data">
                                <div style="font-weight: bold" :class="'q' + data.item.quality_id">{{
                                    data.item.quality_name }}
                                </div>
                            </template>
                            <template slot="item" slot-scope="data">
                                <div style="font-weight: bold" :class="'q' + data.item.quality_id">{{
                                    data.item.quality_name }}
                                </div>
                            </template>
                        </v-select>
                        <v-select
                                :items="professions"
                                label="Profession"
                                v-model="recipeToAdd.profession"
                                required
                                :rules="formRules"
                        ></v-select>

                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="addRecipeDialog = false">Cancel</v-btn>
                        <v-btn color="green darken-1" text v-on:click="addRecipe">ADD</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        <v-dialog v-model="addCrafterDialog" persistent max-width="500">
            <v-form ref="addCrafterForm">
                <v-card>
                    <v-card-title class="headline orange" primary-title>Add Crafter
                    </v-card-title>
                    <div style="padding: 20px">
                        <v-autocomplete

                                item-text="character_name"
                                item-value="character_id"
                                :items="roster"
                                label="Character"
                                color="orange"
                                item-color="orange"
                                :return-object=returnObject
                                v-model="crafterToAdd.character"
                                required
                                :rules="formRules"
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
                        <v-autocomplete
                                :items="drops"
                                label="Item"
                                color="orange"
                                item-color="orange"
                                item-text="item_name"
                                item-value="item_id"
                                :return-object="returnObject"
                                v-model="crafterToAdd.item"
                                required
                                :rules="formRules"
                        >
                            <template slot="selection" slot-scope="data">
                                <div style="font-weight: bold" :class="'q' + data.item.item_quality">{{
                                    data.item.recipe }}
                                </div>
                            </template>
                            <template slot="item" slot-scope="data">
                                <div style="font-weight: bold" :class="'q' + data.item.item_quality">{{
                                    data.item.recipe }}
                                </div>
                            </template>
                        </v-autocomplete>
                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="addCrafterDialog = false">Cancel</v-btn>
                        <v-btn color="green darken-1" text v-on:click="addCrafter">ADD</v-btn>
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
        name: "Crafting",
        data: () => {
            return {
                headers: [
                    {text: 'Recipe', value: 'recipe'},
                    {text: 'Profession', value: 'profession'},
                    {text: '# Crafters', value: 'crafter_count'}
                ],
                drops: [],
                roster: [],
                filter: '',
                disablePagination: true,
                hideFooter: true,
                loading: true,
                addRecipeDialog: false,
                addCrafterDialog: false,
                crafterToAdd: {
                    character: '',
                    item: ''
                },
                defaults: {
                    recipe: {
                        name: '',
                        itemId: '',
                        quality: null,
                        profession: ''
                    },
                    crafter: {
                        character: '',
                        item: ''
                    }
                },
                recipeToAdd: {
                    name: '',
                    itemId: '',
                    quality: null,
                    profession: ''
                },
                returnObject: true,
                qualities: [
                    {
                        quality_name: 'Poor',
                        quality_id: '0'
                    },
                    {
                        quality_name: 'Common',
                        quality_id: '1'
                    },
                    {
                        quality_name: 'Uncommon',
                        quality_id: '2'
                    },
                    {
                        quality_name: 'Rare',
                        quality_id: '3'
                    },
                    {
                        quality_name: 'Epic',
                        quality_id: '4'
                    },
                    {
                        quality_name: 'Legendary',
                        quality_id: '5'
                    }
                ],
                professions: [
                    'Alchemy',
                    'Blacksmithing',
                    'Cooking',
                    'Enchanting',
                    'Engineering',
                    'Leatherworking',
                    'Tailoring'
                ],
                expanded: [],
                singleExpand: true,
                formRules: [
                    v => !!v || 'This field is required'
                ],
            }
        },
        mounted() {
            this.loadCrafterData()
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
            addCrafter: function () {
                if (this.$refs.addCrafterForm.validate()) {
                    axios
                        .post(process.env.VUE_APP_API_PATH + '/Crafting/crafter', {
                            data: {
                                character: this.crafterToAdd.character.character_id,
                                recipe: this.crafterToAdd.item.item_id
                            }
                        })
                        .then(() => {
                            this.crafterToAdd = this.defaults.crafter;
                            this.loadCrafterData();
                            this.addCrafterDialog = false;
                        })
                        .catch(() => {

                        });
                }
            },
            addRecipe: function () {
                if (this.$refs.addRecipeForm.validate()) {
                    axios
                        .post(process.env.VUE_APP_API_PATH + '/Crafting/recipe', {
                            data: this.recipeToAdd
                        })
                        .then(() => {
                            this.recipeToAdd = this.defaults.recipe;
                            this.loadCrafterData();
                            this.addRecipeDialog = false;
                        })
                        .catch(() => {

                        });
                }

            },
            loadCrafterData: function () {

                axios
                    .get(process.env.VUE_APP_API_PATH + '/Crafting')
                    .then(response => {
                        this.drops = response.data;
                        this.loading = false;
                    })
                    .catch(() => {

                    });
                axios
                    .get(process.env.VUE_APP_API_PATH + '/roster')
                    .then(response => {
                        this.roster = response.data;
                        this.loading = false;
                    })
                    .catch(() => {

                    })
            }
        },
        computed: {
            canAddRecipe() {
                return (this.$store.getters.getRole === 'ARCHKEEPERS' || this.$store.getters.getRole === 'KEEPERSCOUNCIL')
            },
            canAddCrafter() {
                return (this.$store.getters.getRole === 'ARCHKEEPERS' || this.$store.getters.getRole === 'KEEPERSCOUNCIL')
            }
        }
    }
</script>

<style scoped>

</style>