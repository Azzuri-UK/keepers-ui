<template>
    <div align="center" style="padding-top: 10px">
        <v-text-field
                style="max-width: 1000px"
                color="orange"
                v-model="filter"
                append-icon="mdi-magnify"
                label="Search (item name)"
                single-line
                hide-details
                :loading="loading"
                loading-text="Loading... Please wait">
            >
        </v-text-field>
        <v-data-table
                style="max-width: 1000px"
                :headers="headers"
                :items="bankItems"
                :items-per-page="itemsPerPage"
                :hide-default-footer=hideFooter
                :hide-default-header="hideHeader"
                :disable-pagination=disablePagination
                class="recentTable"

        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-dialog
                            v-model="importDialog"
                            width="500"
                    >

                        <template v-slot:activator="{ on }">
                            <v-btn
                                    color="orange"
                                    dark
                                    v-on="on"
                                    v-show="showUpdateButton"
                            >
                                UPDATE GUILD BANK
                            </v-btn>
                        </template>
                        <v-form ref="updateBankForm">
                            <v-card>
                                <v-card-title
                                        class="headline orange"
                                        primary-title
                                >
                                    Update Guild Bank
                                </v-card-title>

                                <v-card-text style="padding: 20px">
                                    Paste in the full output of the Classic Guild Bank Addon.  Generate the output by running the following command in game:   /cgb
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
                                            @click="updateBank"
                                    >
                                        Import
                                    </v-btn>

                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.item_name="{ item }">
                <a :href="'https://classic.wowhead.com/item=' + item.item_id"
                   style="font-weight: bold;text-decoration: none"
                   :data-wowhead=item.item_id>{{item.item_name}}</a>
            </template>
            <template v-slot:item.bank_char="{ item }">
                <span :style="getCharacterColour(item.bank_char)">{{item.bank_char}}</span>
            </template>
            <template v-slot:item.updated="{ item }">
                {{relativeTime(item.updated)}}
            </template>
        </v-data-table>
    </div>
</template>


<script>
    import axios from 'axios'
    import moment from 'moment'
    import stc from 'string-to-color'
    export default {
        name: "GuildBank",
        props: ["attendees", "drops", "raidStatus"],
        data: () => {
            return {
                importDialog: false,
                toBeImported: '',
                bankItems: [],
                itemsPerPage: -1,
                disablePagination: true,
                hideFooter: true,
                hideHeader: false,
                returnObject: false,
                headers: [
                    {text: 'Item', value: 'item_name',sortable: false},
                    {text: 'Reputation', value: 'rep_total',sortable: false},
                    {text: 'Quantity', value: 'quantity',sortable: false},
                    {text: 'Banker', value: 'bank_char',sortable: false},
                    {text: 'Updated', value: 'updated',sortable: false}
                ],
                formRules: [
                    v => !!v || 'This field is required'
                ],
                filter: '',
                loading: true,
            }
        },
        mounted() {
          this.loadBankData();
            this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been rendered
            })
        },
        updated() {
            this.$nextTick(function () {

                    if(window.$WowheadPower) {
                        window.$WowheadPower.refreshLinks()
                    }

            })

        },
        methods: {
            loadBankData: function () {
                this.bankItems = []
                this.loading = true;
                axios
                    .get(process.env.VUE_APP_API_PATH + '/bank?search=' + this.filter)
                    .then(response => {
                        this.bankItems = response.data
                        this.loading = false;

                    })
                    .catch(() => {

                    })
            },
            updateBank: function () {
                if (this.$refs.updateBankForm.validate()) {
                    axios
                        .post(process.env.VUE_APP_API_PATH + '/bank', {
                            data: this.toBeImported
                        })
                        .then(() => {
                            this.$emit('reloadAttendees');
                            this.importDialog = false;
                            this.toBeImported = '';
                            this.loadBankData()
                        })
                        .catch(() => {
                            this.importDialog = false;
                            this.toBeImported = '';
                        });
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
            showUpdateButton: function(){
                return this.$store.getters.getRole==='OFFICER'
            },
            relativeTime: function (updateDate) {
                let updated = moment(parseInt(updateDate));
                return updated.fromNow();
            },
            getCharacterColour: function(bank_char){
                return "font-weight: bold; color: " + stc(bank_char);
            }
        },
        watch: {
            filter: {
                handler: function () {
                    if (this.filter.length > 3 || this.filter.length === 0) {
                        this.loadBankData()
                    }
                },
                immediate: false
            }
        },
    }
</script>