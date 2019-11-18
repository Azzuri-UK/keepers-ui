<template>
    <v-row>
        <v-col>
            <div class="title" style="color: orange;margin-left:10px">Upcoming Raids</div>
            <OpenRaids/>
        </v-col>
        <v-col lg="4">
            <div class="title" style="color: orange;margin-left: 10px">Recent Loot</div>
            <RecentDrops></RecentDrops>
        </v-col>
    </v-row>

</template>

<script>
    import OpenRaids from "./Raids/OpenRaids";
    import RecentDrops from "./Loot/RecentDrops";

    export default {
        name: "Index",
        components: {RecentDrops, OpenRaids},
        methods: {
            onChangeView(view,params){
                this.$emit('changeView', view,params)
            }
        }
    }
</script>

<style scoped>

</style>