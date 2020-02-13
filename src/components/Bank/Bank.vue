<template>
    <div align="center" style="padding-top: 10px">
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
        </v-data-table>
    </div>
</template>


<script>
    import axios from 'axios'

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
                    {text: 'Item', value: 'character_name'},
                    {text: 'Quantity', value: 'item_id'}
                ],
                formRules: [
                    v => !!v || 'This field is required'
                ]
            }
        },
        methods: {
            loadBankData: function () {
                axios
                    .get(process.env.VUE_APP_API_PATH + '/bank')
                    .then(response => {
                        this.bankItems = response.data
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
                        })
                        .catch(() => {
                            this.importDialog = false;
                            this.toBeImported = '';
                        });
                }
            },
        }
    }
</script>