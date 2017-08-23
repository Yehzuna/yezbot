export class YezBotBoss {
    constructor(channel) {
        this.channel = channel;
        this.overlay = document.querySelector(".overlay");
        this.boss = document.querySelector(".boss");

        this.config = {
            id: 0,
            channel: 'channel',
            name: "BOSS NAME",
            img: "https://static-cdn.jtvnw.net/jtv_user_pictures/monsieursapin-profile_image-c5a2bdf8de8fd049-300x300.png",
            hp: 1000,
            hpMax: 1000,
            mp: 100,
            mpMax: 100,
            absorbs: 0,
            reduce: 0,
            shieldCost: 20,
            shieldValue: 30,
            shieldAmount: 3,
            blockCost: 40,
            blockValue: 300,
            buff: true,
            buffValue: 200,
            critical: true,
            criticalValue: 20,
            dodge: true,
            dodgeValue: 20,
            subscriber: true,
            subscriberValue: 10,
        };

        this.log = {
            base: 0,

            subscriber: 0,
            critical: 0,
            dodge: 0,

            reduce: 0,
            absorbs: 0,

            total: 0,

            message: '',
        };

        this.data = {
            id: 0,
            channel: 'channel',
            name: "BOSS NAME",
            img: "https://static-cdn.jtvnw.net/jtv_user_pictures/monsieursapin-profile_image-c5a2bdf8de8fd049-300x300.png",
            hp: 1000,
            hpMax: 1000,
            mp: 100,
            mpMax: 100,
            absorbs: 0,
            reduce: 0,

            criticalHit: false,
            dodgeHit: false,
        };

        // this.set(this.data);
    }

    format(data) {
        if (data.hp > data.hpMax) {
            data.hp = data.hpMax
        }

        if (data.hp < 0) {
            data.hp = 0
        }

        if (data.mp > data.mpMax) {
            data.mp = data.mpMax
        }

        if (data.mp < 0) {
            data.mp = 0
        }

        return data;
    }

    attack(value) {
        this.log.base = value;

        this.log.subscriber = 0;
        if(this.data.subscriber) {
            this.log.subscriber = (value * this.data.subscriberValue / 100);
        }

        this.log.critical = 0;
        if(this.data.critical && (Math.random() * 100) <= this.data.criticalValue) {
            this.log.critical = (value * this.data.criticalValue / 100);
        }

        this.log.dodge = 0;
        if(this.data.dodge && (Math.random() * 100) <= this.data.dodgeValue) {
            this.log.dodge = (value * this.data.dodgeValue / 100);
        }

        // neutralization
        if (this.log.critical === this.log.dodge) {
            this.log.critical = 0;
            this.log.dodge = 0;
        }

        this.log.reduce = 0;
        if(this.data.reduce > 0) {
            this.log.reduce = (value * this.data.reduce / 100);
        }

        this.log.absorbs = this.data.absorbs;

        console.log(this.log);
    }

    reset() {
        this.boss.classList.remove('damage');
        this.boss.classList.remove('healing');
        this.boss.querySelectorAll(".message").forEach((message) => message.remove());
    }


    animate (data) {
        data = this.format(data);

        const message = document.createElement('div');
        message.classList.add('message');

        // Boss data
        this.boss.querySelector(".title").innerHTML = data.name;
        this.boss.querySelector(".image img").src = data.img;

        // HP
        const hp = Math.round(data.hp * 100 / data.hpMax);
        this.boss.querySelector(".bar.hp .progress").style.width = `${hp}%`;
        this.boss.querySelector(".bar.hp .count").innerHTML = `${hp}%`;
        this.boss.querySelector(".status .hp").innerHTML = `HP: ${data.hp}/${data.hpMax}`;

        // Alert message
        let diff = data.hp - this.data.hp;
        if (diff !== 0) {
            if (diff < 0) {
                message.classList.add('minus');
                message.innerHTML = `HP ${diff}`;
            } else {
                message.classList.add('plus');
                message.innerHTML = `HP +${diff}`;
            }
            this.boss.appendChild(message);
        }

        // MP
        const mp = Math.round(data.mp * 100 / data.mpMax);
        this.boss.querySelector(".bar.mp .progress").style.width = `${mp}%`;
        this.boss.querySelector(".bar.mp .count").innerHTML = `${mp}%`;
        this.boss.querySelector(".status .mp").innerHTML = `MP: ${data.mp}/${data.mpMax}`;

        // HP color
        this.boss.querySelector(".bar.hp").classList.remove('warning');
        this.boss.querySelector(".bar.hp").classList.remove('danger');
        if (hp <= 50) {
            this.boss.querySelector(".bar.hp").classList.add('warning');
        }
        if (hp <= 20) {
            this.boss.querySelector(".bar.hp").classList.add('danger');
        }

        // Animation
        if (this.data.hp > data.hp) {
            this.boss.classList.add('damage');
        } else if (this.data.hp < data.hp) {
            this.boss.classList.add('healing');
        }



        // Animation reset
        setTimeout(() => this.reset(), 1500);

        // Save data
        this.data = data;
    }
}
