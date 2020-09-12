export default {
    data: function () {
        return {
            classes: [
                'Druid',
                'Hunter',
                'Mage',
                'Paladin',
                'Priest',
                'Rogue',
                'Warlock',
                'Warrior'
            ]
        }
    },
    methods: {
        getClassImage: (wowClass) => {
            let druidImage = require("@/assets/classes/wow_flat_druid.png");
            let hunterImage = require("@/assets/classes/wow_flat_hunter.png");
            let mageImage = require("@/assets/classes/wow_flat_mage.png");
            let paladinImage = require("@/assets/classes/wow_flat_paladin.png");
            let priestImage = require("@/assets/classes/wow_flat_priest.png");
            let warlockImage = require("@/assets/classes/wow_flat_warlock.png");
            let warriorImage = require("@/assets/classes/wow_flat_warrior.png");
            let rogueImage = require("@/assets/classes/wow_flat_rogue.png")
            switch (wowClass) {
                case 'Warrior':
                    return warriorImage;
                case 'Priest':
                    return priestImage;
                case 'Mage':
                    return mageImage;
                case 'Druid':
                    return druidImage;
                case 'Warlock':
                    return warlockImage;
                case 'Rogue':
                    return rogueImage;
                case 'Hunter':
                    return hunterImage;
                case 'Paladin':
                    return paladinImage;
            }
        },
    }
}