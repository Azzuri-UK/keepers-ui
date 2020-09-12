export default {
    data: function () {
        return {
            roles: [
                'Tank',
                'Healer',
                'DPS'
            ]
        }
    },
    methods: {
        getRoleImage: (role) => {
            let tankImage = require("@/assets/roles/Tank.png");
            let healerImage = require("@/assets/roles/Healer.png");
            let damageImage = require("@/assets/roles/Damage.png");
            switch (role) {
                case 'Tank':
                    return tankImage;
                case 'Healer':
                    return healerImage;
                case 'Damage':
                    return damageImage;
            }
        },
    }
}