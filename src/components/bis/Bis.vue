<template>
    <v-tabs
            fixed-tabs
            color="orange"
            dark
    >
        <v-tab key="loothelper ">
            Loot Helper
        </v-tab>
        <v-tab key="loot">
            BiS Lists
        </v-tab>

        <v-tab-item key="loothelper">
            <LootHelper test="test "/>
        </v-tab-item>
        <v-tab-item key="loot">
            <BisLists/>
        </v-tab-item>

    </v-tabs>
</template>

<script>
    import LootHelper from "./LootHelper";
    import BisLists from "./BisLists";

    export default {
        name: "Bis",
        components: {LootHelper, BisLists}
    }
</script>

<style scoped>

</style>