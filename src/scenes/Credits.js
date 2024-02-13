class Credits extends Phaser.Scene{
    constructor(){
        super('Credits')
    }
    
    create(){
        //divider bar on screen
        this.divider = this.add.graphics()
        this.divider.fillStyle(0x00FFFF, 1)
        this.divider.fillRect((game.config.width/2)- 8, 0, 10, 325)
        this.add.text(game.config.width/4, game.config.height/4, 'CREDITS',{
            fontFamily: 'Comic Sans MS',
            fontSize : '18px',
            color : '#0000FF',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        }).setOrigin(0.5)

    //text config
        this.add.text(game.config.width/4, game.config.height/3, ' All visual assets created by CJ Moshy',{
            fontFamily: 'Comic Sans MS',
            fontSize : '18px',
            color : '#FFFF00',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        }).setOrigin(0.5)

        this.add.text(game.config.width/4, game.config.height/2, 'Main Background Music: `Homework` \n https://www.fesliyanstudios.com \n https://www.fesliyanstudios.com/policy',{
            fontFamily: 'Comic Sans MS',
            fontSize : '18px',
            color : '#00FF00',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        }).setOrigin(0.5)

        this.add.text(game.config.width/4, game.config.height- 150, 'All other audio created by CJ Moshy',{
            fontFamily: 'Comic Sans MS',
            fontSize : '18px',
            color : '#FF00FF',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        }).setOrigin(0.5)

        this.add.text(game.config.width - 200, game.config.height/4, 'How to Play',{
            fontFamily: 'Comic Sans MS',
            fontSize : '18px',
            color : '#0000FF',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        }).setOrigin(0.5)

        this.add.text(game.config.width - 195, game.config.height/2, 'Press `space` to jump\nAs you run you collect Elements\nElements give permanent score multiplier\nCollect all powerups and go as far as\npossible',{
            fontFamily: 'Comic Sans MS',
            fontSize : '18px',
            color : '#FF0000',
            align : 'left', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        }).setOrigin(0.5)
    
        //nav button
        this.menuButton = this.add.sprite(game.config.width/2, 375, 'menu-button').setInteractive()  
        this.menuButton.on('pointerdown', ()=> {
            this.sound.play('click')
            this.scene.start('menuScene')
        })
       
    }
}
