<template>
    <div>
        <v-row>
        <div style="margin: auto;padding-top: 20px">Drag markers to assignments.  Names are optional</div>
        </v-row>
        <v-row >
            <v-btn style="margin: 20px auto 20px auto" text color="orange" dark   @click="resetMarkers">RESET</v-btn>
        </v-row>
        <v-row  class="text-center">

            <v-data-iterator
                    style="margin: auto;"
                    :items="markers"
                    :disable-pagination=disablePagination
                    hide-default-footer
                    no-data-text=""
            >


                <template v-slot:default="props">

                    <v-row>
                        <draggable v-model="markers" group="marks" style="display:inherit;min-height: 10px">
                        <v-col
                                v-for="item in props.items"
                                :key="item.id"
                        >

                                <v-img height="40" width="40" :src="item.src"></v-img>

                        </v-col>
                        </draggable>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-row>
        <v-container fluid>
            <v-layout align-start justify-center>

                <v-flex xs4 class="elevation-1 pa-3 ma-2">
                    <v-list two-line>
                        <v-subheader>
                            TANKS
                        </v-subheader>
                        <draggable v-model="tanks" group="marks" style="min-height: 10px">
                            <template v-for="tank in tanks">
                                <v-list-item
                                        :key="tank.id"
                                >
                                    <v-list-item-avatar>
                                        <v-img :src="tank.src"></v-img>
                                    </v-list-item-avatar>
                                    <v-text-field v-model="tank.assignee"></v-text-field>
                                </v-list-item>
                            </template>
                        </draggable>
                    </v-list>
                </v-flex>

                <v-flex xs4 class="elevation-1 pa-3 ma-2">
                    <v-list two-line>
                        <v-subheader>
                            SHEEP
                        </v-subheader>
                        <draggable v-model="sheep" group="marks" style="min-height: 10px">
                            <template v-for="s in sheep">
                                <v-list-item
                                        :key="s.id"
                                >
                                    <v-list-item-avatar>
                                        <v-img :src="s.src"></v-img>
                                    </v-list-item-avatar>
                                    <v-text-field v-model="s.assignee"></v-text-field>
                                </v-list-item>
                            </template>
                        </draggable>
                    </v-list>
                </v-flex>
                <v-flex xs4 class="elevation-1 pa-3 ma-2">
                    <v-list two-line>
                        <v-subheader>
                            BANISH
                        </v-subheader>
                        <draggable v-model="banish" group="marks" style="min-height: 10px">
                            <template v-for="b in banish">
                                <v-list-item
                                        :key="b.id"
                                >
                                    <v-list-item-avatar>
                                        <v-img :src="b.src"></v-img>
                                    </v-list-item-avatar>
                                    <v-text-field v-model="b.assignee"></v-text-field>
                                </v-list-item>
                            </template>
                        </draggable>
                    </v-list>
                </v-flex>
            </v-layout>
        </v-container>
        <v-row>
            <div style="margin: auto;padding-top: 20px">Kill Order</div>
        </v-row>
        <v-row>
        <v-data-iterator
                style="margin: auto;"
                :items="killOrder"
                :disable-pagination=disablePagination
                hide-default-footer
                no-data-text=""
        >


            <template v-slot:default="props">

                <v-row>
                    <draggable v-model="killOrder" group="killorder" style="display:inherit;min-height: 10px">
                        <v-col
                                v-for="item in props.items"
                                :key="item.id"
                        >
                            <v-img height="40" width="40" :src="item.src"></v-img>

                        </v-col>
                    </draggable>
                </v-row>
            </template>
        </v-data-iterator>
        </v-row>
        <v-row>
            <v-dialog
                    v-model="showMacro"
                    width="500"

            >
                <template v-slot:activator="{ on }">
                    <v-btn style="margin: 20px auto 20px auto"  color="orange" dark  @click="generateMacro">GENERATE MACRO</v-btn>
                </template>

                <v-card>
                    <v-card-title
                            class="headline orange"
                            primary-title
                    >
                        Macro
                    </v-card-title>
                    <div class="ma-5">Copy the text below into a macro in WoW</div>
                   <v-textarea   background-color="#303030" style="border-width: 1px" class="pa-5" rows=10 v-model="macro" readonly></v-textarea>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn
                                color="green"
                                text
                                @click="showMacro = false"
                        >
                            CLOSE
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

    </div>
</template>

<script>
    import draggable from 'vuedraggable';

    let starImage = require("@/assets/macros/star.png");
    let squareImage = require("@/assets/macros/square.png");
    let skullImage = require("@/assets/macros/skull.png");
    let diamondImage = require("@/assets/macros/diamond.png");
    let crossImage = require("@/assets/macros/cross.png");
    let triangleImage = require("@/assets/macros/triangle.png");
    let circleImage = require("@/assets/macros/circle.png");
    let moonImage = require("@/assets/macros/moon.png");
    let bossImage = require("@/assets/macros/boss4.png");
    export default {
        components: {
            draggable,
        },
        name: "Macros",
        data: () => {
            return {
                default: [
                    {
                        id: 0,
                        src: bossImage,
                        assignee: '',
                        name: 'BOSS',
                        raidIcon: 'BOSS'
                    },
                    {
                        id: 1,
                        src: skullImage,
                        assignee: '',
                        name: 'Skull',
                        raidIcon: '{skull}'
                    },
                    {
                        id: 2,
                        src: squareImage,
                        assignee: '',
                        name: 'Square',
                        raidIcon: '{square}'
                    },
                    {
                        id: 3,
                        src: circleImage,
                        assignee: '',
                        name: 'Circle',
                        raidIcon: '{circle}'
                    },
                    {
                        id:4,
                        src: starImage,
                        assignee: '',
                        name: 'Star',
                        raidIcon: '{star}'
                    },
                    {
                        id: 5,
                        src: crossImage,
                        assignee: '',
                        name: 'X',
                        raidIcon: '{cross}'
                    },
                    {
                        id: 6,
                        src: triangleImage,
                        assignee: '',
                        name: 'Triangle',
                        raidIcon: '{triangle}'
                    },
                    {
                        id: 7,
                        src: moonImage,
                        assignee: '',
                        name: 'Moon',
                        raidIcon: '{moon}'
                    },
                    {
                        id: 8,
                        src: diamondImage,
                        assignee: '',
                        name: 'Diamond',
                        raidIcon: '{diamond}'
                    }
                ],
                markers: [
                    {
                        id: 0,
                        src: bossImage,
                        assignee: '',
                        name: 'BOSS',
                        raidIcon: 'BOSS'
                    },
                    {
                        id: 1,
                        src: skullImage,
                        assignee: '',
                        name: 'Skull',
                        raidIcon: '{skull}'
                    },
                    {
                        id: 2,
                        src: squareImage,
                        assignee: '',
                        name: 'Square',
                        raidIcon: '{square}'
                    },
                    {
                        id: 3,
                        src: circleImage,
                        assignee: '',
                        name: 'Circle',
                        raidIcon: '{circle}'
                    },
                    {
                        id:4,
                        src: starImage,
                        assignee: '',
                        name: 'Star',
                        raidIcon: '{star}'
                    },
                    {
                        id: 5,
                        src: crossImage,
                        assignee: '',
                        name: 'X',
                        raidIcon: '{cross}'
                    },
                    {
                        id: 6,
                        src: triangleImage,
                        assignee: '',
                        name: 'Triangle',
                        raidIcon: '{triangle}'
                    },
                    {
                        id: 7,
                        src: moonImage,
                        assignee: '',
                        name: 'Moon',
                        raidIcon: '{moon}'
                    },
                    {
                        id: 8,
                        src: diamondImage,
                        assignee: '',
                        name: 'Diamond',
                        raidIcon: '{diamond}'
                    }
                ],
                killOrder: [
                    {
                        id: 0,
                        src: bossImage,
                        assignee: '',
                        name: 'BOSS',
                        raidIcon: 'BOSS'
                    },
                    {
                        id: 1,
                        src: skullImage,
                        assignee: '',
                        name: 'Skull',
                        raidIcon: '{skull}'
                    },
                    {
                        id: 2,
                        src: squareImage,
                        assignee: '',
                        name: 'Square',
                        raidIcon: '{square}'
                    },
                    {
                        id: 3,
                        src: circleImage,
                        assignee: '',
                        name: 'Circle',
                        raidIcon: '{circle}'
                    },
                    {
                        id:4,
                        src: starImage,
                        assignee: '',
                        name: 'Star',
                        raidIcon: '{star}'
                    },
                    {
                        id: 5,
                        src: crossImage,
                        assignee: '',
                        name: 'X',
                        raidIcon: '{cross}'
                    },
                    {
                        id: 6,
                        src: triangleImage,
                        assignee: '',
                        name: 'Triangle',
                        raidIcon: '{triangle}'
                    },
                    {
                        id: 7,
                        src: moonImage,
                        assignee: '',
                        name: 'Moon',
                        raidIcon: '{moon}'
                    },
                    {
                        id: 8,
                        src: diamondImage,
                        assignee: '',
                        name: 'Diamond',
                        raidIcon: '{diamond}'
                    }
                ],
                tanks: [],
                banish: [],
                sheep: [],
                disablePagination: true,
                showMacro: false,
                macro: ''
            }
        },
        methods: {
            resetMarkers: function () {
              this.markers = [
                  {
                      id: 0,
                      src: bossImage,
                      assignee: '',
                      name: 'BOSS',
                      raidIcon: 'BOSS'
                  },
                  {
                      id: 1,
                      src: skullImage,
                      assignee: '',
                      name: 'Skull',
                      raidIcon: '{skull}'
                  },
                  {
                      id: 2,
                      src: squareImage,
                      assignee: '',
                      name: 'Square',
                      raidIcon: '{square}'
                  },
                  {
                      id: 3,
                      src: circleImage,
                      assignee: '',
                      name: 'Circle',
                      raidIcon: '{circle}'
                  },
                  {
                      id:4,
                      src: starImage,
                      assignee: '',
                      name: 'Star',
                      raidIcon: '{star}'
                  },
                  {
                      id: 5,
                      src: crossImage,
                      assignee: '',
                      name: 'X',
                      raidIcon: '{cross}'
                  },
                  {
                      id: 6,
                      src: triangleImage,
                      assignee: '',
                      name: 'Triangle',
                      raidIcon: '{triangle}'
                  },
                  {
                      id: 7,
                      src: moonImage,
                      assignee: '',
                      name: 'Moon',
                      raidIcon: '{moon}'
                  },
                  {
                      id: 8,
                      src: diamondImage,
                      assignee: '',
                      name: 'Diamond',
                      raidIcon: '{diamond}'
                  }
              ];



                this.tanks = [];
                this.sheep = [];
                this.banish = [];

            },
            generateMacro: function (){
                let macro ='';

                if (this.tanks.length > 0 ) {
                    macro += '/rw TANKS: ';

                    this.tanks.forEach(tank => {
                        if (tank.assignee){
                            macro +=  tank.assignee.trim() + ' ' + tank.raidIcon + ' ';
                        } else {
                            macro +=   tank.raidIcon + ' ';
                        }

                    });

                }

                if (this.sheep.length > 0 ) {
                    macro += "\n"
                    macro += '/rw SHEEP: ';

                    this.sheep.forEach(sheep => {
                        if (sheep.assignee){
                            macro +=  sheep.assignee.trim() + ' ' + sheep.raidIcon + ' ';
                        } else {
                            macro +=   sheep.raidIcon + ' ';
                        }
                    });

                }
                if (this.banish.length > 0 ) {
                    macro += "\n"
                    macro += '/rw BANISH: ';

                    this.banish.forEach(banish => {
                        if (banish.assignee){
                            macro +=  banish.assignee.trim() + ' ' + banish.raidIcon + ' ';
                        } else {
                            macro +=   banish.raidIcon + ' ';
                        }
                    });
                }
                macro += "\n";
                macro += '/rw KILL ORDER: ';
                this.killOrder.forEach(icon => {
                    macro += icon.raidIcon;
                });

                if (macro.length > 255){
                    alert('too long')
                } else {
                    //eslint-disable-next-line
                    this.macro = macro
                    this.showMacro = true;
                }


            },
        }
    }
</script>

<style scoped>

</style>