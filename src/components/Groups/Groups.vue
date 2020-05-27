<template>
    <div>hi</div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Groups",
        mounted() {
            this.getGroupDetails();
        },
        methods: {
            getGroupDetails: function(){
                axios
                    .get(process.env.VUE_APP_API_PATH + '/groups')
                    .then(response => {
                        this.raid = response.data[0];

                    })
                    .catch(() => {

                    })
            }
        }
    }
</script>

<style scoped>

</style>