<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex class="text-xs-center">
                <div class="orange--text font-weight-bold display-3 mb-5" align="center">MERELY A SETBACK </div>
                <div align="center" class="mb-5">There was a problem with your request. The following error was reported</div>
                <div align="center" class="red--text heading font-weight-bold">{{this.getError()}}</div>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import {Base64} from 'js-base64';

    export default {
        name: "Error",
        props: ["errorMessage"],
        methods: {
            getError: function () {
                return Base64.decode(this.$route.params.errorMessage).toUpperCase()
            },

        }

    }
</script>

<style scoped>

</style>