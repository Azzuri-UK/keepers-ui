<template style="height: 100vh">
    <div align="center" style="padding-top: 10px">
        <v-tabs
                fixed-tabs
                color="orange"
                dark
                style="max-width: 1000px"
        >
            <v-tab key="attendance ">
                Loot History
            </v-tab>
            <v-tab key="distribution">
                Loot Distribution
            </v-tab>
            <v-tab key="prio">
                Priority Lists
            </v-tab>

            <v-tab-item key="loot">
                <Drops/>
            </v-tab-item>
            <v-tab-item key="distribution">
                <Distribution/>
            </v-tab-item>
            <v-tab-item key="prio">
                <Priority/>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>

    import Drops from "./Drops";
    import Priority from "./Priority";
    import Distribution from "./Distribution";

    export default {
        name: "Loot",
        components: {Priority, Distribution, Drops}
    }
</script>

<style scoped>

</style>