export default {
    methods: {

        getZoneImage: function (zone) {
            let mcImage = require("@/assets/raids/MC.jpg");
            let onyImage = require("@/assets/raids/ONY.jpg");
            let bwlImage = require("@/assets/raids/BWL.jpg");
            let zgImage = require("@/assets/raids/ZG.jpg");
            let aq20Image = require("@/assets/raids/aq202.jpg");
            let aq40Image = require("@/assets/raids/aq402.jpg")
            switch (zone) {
                case 'MC':
                    return mcImage;
                case 'ONY':
                    return onyImage;
                case 'BWL':
                    return bwlImage;
                case 'ZG':
                    return zgImage;
                case 'AQ20':
                    return aq20Image;
                case 'AQ40':
                    return aq40Image;
                default:
            }
        },
        getZoneImagePosition: function (zone) {
            switch (zone) {
                case 'MC':
                    return "0% 50%";
                case 'ONY':
                    return "0% 27%";
                case 'BWL':
                    return "0% 50%";
                case 'ZG':
                    return "0% 47%";
                case 'AQ40':
                    return "0% 50%";
                case 'AQ20':
                    return "35% 50%";
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