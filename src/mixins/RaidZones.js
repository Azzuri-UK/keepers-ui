export default {
    methods: {

        getZoneImage: function (zone,type) {
            let mcTile = require("@/assets/raids/MC.jpg");
            let mcHeader = require("@/assets/raids/mc3.jpg");
            let onyTile = require("@/assets/raids/ONY.jpg");
            let onyHeader = require("@/assets/raids/ony3.jpg");
            let bwlTile = require("@/assets/raids/BWL.jpg");
            let bwlHeader = require("@/assets/raids/bwl2.jpg");
            let zgTile = require("@/assets/raids/ZG.jpg");
            let zgHeader = require("@/assets/raids/zg3.jpg");
            let aq20Tile = require("@/assets/raids/aq202.jpg");
            let aq20header = require("@/assets/raids/aq201.jpg");
            let aq40Tile = require("@/assets/raids/aq402.jpg")
            let aq4Header = require("@/assets/raids/aq401.jpg")
            switch (zone) {
                case 'MC':
                    switch (type) {
                        case 'tile':
                            return mcTile;
                        case 'header':
                            return mcHeader;
                        default:
                            return mcTile
                    }
                case 'ONY':
                    switch (type) {
                        case 'tile':
                            return onyTile;
                        case 'header':
                            return onyHeader;
                        default:
                            return onyTile
                    }
                case 'BWL':
                    switch (type) {
                        case 'tile':
                            return bwlTile;
                        case 'header':
                            return bwlHeader;
                        default:
                            return bwlTile
                    }
                case 'ZG':
                    switch (type) {
                        case 'tile':
                            return zgTile;
                        case 'header':
                            return zgHeader;
                        default:
                            return zgTile
                    }
                case 'AQ20':
                    switch (type) {
                        case 'tile':
                            return aq20Tile;
                        case 'header':
                            return aq20header;
                        default:
                            return aq20Tile
                    }
                case 'AQ40':
                    switch (type) {
                        case 'tile':
                            return aq40Tile;
                        case 'header':
                            return aq4Header;
                        default:
                            return aq20Tile
                    }
                default:
            }
        },
        getZoneImagePosition: function (zone,type) {
            switch (zone) {
                case 'MC':
                    switch (type){
                        case 'tile':
                            return "0% 50%";
                        case 'header':
                            return "0% 0%";
                        default:
                            return "0% 50%";
                    }
                case 'ONY':
                    switch (type){
                        case 'tile':
                            return "0% 27%";
                        case 'header':
                            return "0% 27%";
                        default:
                            return "0% 27%";
                    }
                case 'BWL':
                    switch (type){
                        case 'tile':
                            return "0% 50%";
                        case 'header':
                            return "0% 30%";
                        default:
                            return "0% 50%";
                    }
                case 'ZG':
                    switch (type){
                        case 'tile':
                            return "0% 47%";
                        case 'header':
                            return "0% 30%";
                        default:
                            return "0% 47%";
                    }
                case 'AQ40':
                    switch (type){
                        case 'tile':
                            return "0% 50%";
                        case 'header':
                            return "0% 35%";
                        default:
                            return "0% 50%";
                    }
                case 'AQ20':
                    switch (type){
                        case 'tile':
                            return "35% 50%";
                        case 'header':
                            return "0% 35%";
                        default:
                            return "35% 50%";
                    }
                default:
                    return "top";
            }
        },
        getZoneName: (zone) => {
            switch (zone) {
                case 'MC':
                    return 'Molten Core';
                case 'ONY':
                    return 'Onyxia\'s Lair';
                case 'BWL':
                    return 'Blackwing Lair';
                case 'ZG':
                    return "Zul'Gurub";
                case 'AQ20':
                    return 'Ruins of Ahn\'Qiraj'
                case 'AQ40':
                    return 'Temple of Ahn\'Qiraj'
                default:

            }
        },
    }
}