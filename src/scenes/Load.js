class Loader extends Phaser.Scene{
    constructor(){
        super('loader')
    }

    preload(){
        //TODO: loading bar
       
        //load images
        this.load.image('platform', './assets/images/platform.png')
        this.load.image('powerup', './assets/images/powerup-anim-1.png')
        this.load.image('titleScreen', './assets/images/title-screen.png')
        this.load.image('startButton', './assets/images/start-button-1.png')
        this.load.image('startButton2', './assets/images/start-button-2.png')
        this.load.image('settingsButton', './assets/images/settings-button.png')
        this.load.image('settingsButton2', './assets/images/settings-button-2.png')
       

        //character spritesheet
        this.load.atlas('particles', './assets/spritesheets/particle/particle-spritesheet.png', './assets/spritesheets/particle/particle-spritesheet.json')
        this.load.atlas('player', './assets/spritesheets/player/vanilla/player-spritesheet.png', './assets/spritesheets/player/vanilla/player-spritesheet.json')
        this.load.atlas('playerAnims', './assets/spritesheets/player/elements/element-anim-spritesheet.png', './assets/spritesheets/player/elements/element-anim-spritesheet.json')
    }

    create(){
        //check for local storage browser support
        window.localStorage ? console.log('local storage enabled') : console.log('no local storage supported')
        
        //create animations

        //vanilla
        this.anims.create({
            key: 'running_vanilla',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'character-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //fire
        this.anims.create({
            key: 'running_fire',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'fire-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //air
        this.anims.create({
            key: 'running_air',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'air-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //earth
        this.anims.create({
            key: 'running_earth',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'earth-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //water
        this.anims.create({
            key: 'running_water',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'water-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //fire air
        this.anims.create({
            key: 'running_fire_air',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'fire-air-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //fire earth
        this.anims.create({
            key: 'running_fire_earth',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'fire-earth-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //fire water
        this.anims.create({
            key: 'running_fire_water',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'fire-water-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //earth air
        this.anims.create({
            key: 'running_earth_air',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'earth-air-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })
    
        
        //air water
        this.anims.create({
            key: 'running_air_water',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'air-water-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //earth water
        this.anims.create({
            key: 'running_earth_water',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'earth-water-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //earth air fire
        this.anims.create({
            key: 'running_earth_air_fire',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'earth-air-fire-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //earth water fire
        this.anims.create({
            key: 'running_earth_water_fire',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'earth-water-fire-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })  


        //air fire water
        this.anims.create({
            key: 'running_air_fire_water',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'air-fire-water-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //air earth water
        this.anims.create({
            key: 'running_air_earth_water',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'air-earth-water-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })

        //meta anim
        this.anims.create({
            key: 'running_meta',
            frames: this.anims.generateFrameNames('playerAnims', {
                prefix: 'meta-anim-',
                start: 1,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        })
        this.scene.start('menuScene')
    }   

}