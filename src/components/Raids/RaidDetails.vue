<template style="height: 100vh">
    <v-tabs
            fixed-tabs
            color="orange"
            dark
    >
        <v-tab key="attendance ">
            Attendance
        </v-tab>
        <v-tab key="loot">
            Loot
        </v-tab>

        <v-tab-item key="attendance">
            <RaidAttendance/>
        </v-tab-item>
        <v-tab-item key="loot">
            <RaidLoot/>
        </v-tab-item>

    </v-tabs>
</template>

<script>
    import RaidAttendance from "./RaidAttendance";
    import RaidLoot from "./RaidLoot";

    export default {
        name: "RaidDetails",
        props: ["params"],
        components: {RaidLoot, RaidAttendance}
    }
</script>

<style scoped>

</style>