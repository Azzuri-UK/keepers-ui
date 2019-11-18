<template>
    <div>{{this.$route.params.raidId}}</div>
</template>

<script>
    export default {
        name: "RaidDetails",
        props:["params"]
    }
</script>

<style scoped>

</style>