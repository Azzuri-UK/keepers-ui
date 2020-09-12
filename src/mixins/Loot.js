export default {
    data: function () {
        return {
            lootTypes: [
                {
                    text: 'EPGP',
                    value: 4
                },
            ],
            lootSubTypes: [
                {
                    text: 'Need',
                    value: 1
                },
                {
                    text: 'Minor Upgrade',
                    value: 2
                },
                {
                    text: 'Offspec',
                    value: 3
                },
            ]
        }
    },
    methods: {
        getLootType: function (loot_type) {
            switch (loot_type) {
                case 1:
                    return 'Best in Slot';
                case 2:
                    return 'Free Roll';
                case 3:
                    return 'Loot Council'
                case 4:
                    return 'EPGP'
            }
        },
        getLootSubType: function (loot_subtype, loot_type) {
            switch (loot_type) {
                case 1:
                    return 'Best in Slot';
                case 2:
                    return 'Free Roll';
                case 3:
                    switch (loot_subtype) {
                        case 1:
                            return 'Mainspec/Need';
                        case 2:
                            return 'Minor Upgrade';
                        case 3:
                            return 'Offspec/Other';
                        case 4:
                            return 'Resist Gear';
                        case 5:
                            return 'Disenchanted';
                        default:
                            return ''
                    }
                case 4:
                    switch (loot_subtype) {
                        case 1:
                            return 'Mainspec';
                        case 2:
                            return 'Minor Upgrade';
                        case 3:
                            return 'Offspec';
                        case 5:
                            return 'Disenchanted';
                        default:
                            return ''
                    }
            }

        },
        getItemClass: function (item_class) {
            switch (item_class) {
                case 1:
                    return 'q1';
                case 2:
                    return 'q2';
                case 3:
                    return 'q3';
                case 4:
                    return 'q4';
                case 5:
                    return 'q5'
            }
        },
    }
}