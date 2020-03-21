<template>
    <v-data-iterator
            class="pa-10"
            :items="lists"
            hide-default-footer
    >
        <template v-slot:default="props">
            <v-hover :key="item.id" v-for="item in props.items" v-slot:default="{ hover }">

                <v-card color="orange"  :class="item.raid_status === 0 ? 'closedRaid' : 'openRaid'"
                        v-on:click="viewList(item.id,item.name)" :elevation="hover ? 12 : 2"
                        :style="hover ? 'cursor:pointer;background-color: #616161;margin: 15px;max-width: 1000px' : 'margin: 15px;max-width: 1000px'"
                >
                <v-card-subtitle style="color: black;font-weight: bold;font-size: 22px">{{item.name}}</v-card-subtitle>
                </v-card>
            </v-hover>
        </template>
    </v-data-iterator>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Priority",
        data: () => {
            return {
                lists: []
            }
        },
        mounted() {
            this.getLists()
        },
        methods: {
            getLists: function(){
                axios
                    .get(process.env.VUE_APP_API_PATH + '/lists')
                    .then(response => {
                        this.lists = response.data;
                        this.loading = false;
                    })
                    .catch(() => {

                    })
            },
            viewList: function(listId,item){
                this.$router.push({name: 'list', params: {listId: listId, listItem: item}})
            }
        }
    }
</script>

<style scoped>

</style>