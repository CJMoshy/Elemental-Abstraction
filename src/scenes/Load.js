class Loader extends Phaser.Scene{
    constructor(){
        super('loader')
    }

    preload(){
        //formatting
        this.add.text(game.config.width/2, game.config.height/2, 'Loading...',{
            fontFamily: 'Comic Sans MS',
            fontSize : '28px',
            color : '#0000FF',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        }).setOrigin(0.5)

        //loading bar -> credit Nathan Altice
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value)=>{
            loadingBar.clear()
            loadingBar.fillStyle(0x00FFFF, 1)
            loadingBar.fillRect(game.config.width/4, game.config.height/2 + 100, 400, 25)
        })
        this.load.on('complete', ()=>{
            loadingBar.destroy()
        })

        //load images
        this.load.image('info-button', './assets/images/info-button.png')
        this.load.image('menu-button', './assets/images/menu-button.png')
        this.load.image('obstacle-air', './assets/images/obstacle-air.png')
        this.load.image('obstacle-ground', './assets/images/obstacle-ground.png')
        this.load.image('platform', './assets/images/platform.png')
        this.load.image('powerup-blue', './assets/images/powerup-blue.png')
        this.load.image('powerup-green', './assets/images/powerup-green.png')
        this.load.image('powerup-red', './assets/images/powerup-red.png')
        this.load.image('powerup-teal', './assets/images/powerup-teal.png')
        this.load.image('restart-button', './assets/images/restart-button.png')
        this.load.image('start-button', './assets/images/start-button-1.png')
        this.load.image('titleScreen', './assets/images/title-screen.png')
       
        //character spritesheet
        this.load.atlas('player', './assets/spritesheets/player/vanilla/player-spritesheet.png', './assets/spritesheets/player/vanilla/player-spritesheet.json')
        this.load.atlas('playerAnims', './assets/spritesheets/player/elements/element-anim-spritesheet.png', './assets/spritesheets/player/elements/element-anim-spritesheet.json')

        //audio
        this.load.audio('main-soundtrack', ['./assets/audio/main.mp3'])
        this.load.audio('click', './assets/audio/click.wav')
        this.load.audio('powerup', './assets/audio/powerup.wav')
        this.load.audio('hit', './assets/audio/hit.wav')
        this.load.audio('gameover', './assets/audio/gameover.wav')
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

        //Enter menu
        this.scene.start('menuScene')
    }   

}