class Listener extends Phaser.Scene{
    constructor(){
        super('Listener')
    }

    create(){  
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',{
            fontFamily: 'Comic Sans MS',
            fontSize : '28px',
            color : '#0000FF',
            align : 'right', 
            padding : {top : 5, bottom : 5},
            fixedWidth : 0,
        }).setOrigin(0.5)

        this.restartButton = this.add.sprite(game.config.width/2 - 200, 350, 'restart-button').setInteractive()  
        this.restartButton.on('pointerdown', ()=> {
            console.log('restart was clicked')
            this.scene.start('playScene')
        })

        this.menuButton = this.add.sprite(game.config.width/2 + 200, 350, 'menu-button').setInteractive()  
        this.menuButton.on('pointerdown', ()=> {
            console.log('menu was clicked')
            this.scene.start('menuScene')
        })
    }
}