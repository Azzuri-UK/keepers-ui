<template>
    <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
    ></v-data-table>
</template>

<script>
    export default {
        name: "Drops"
    }
</script>

<style scoped>

</style>