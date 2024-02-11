//created by CJ Moshy
//TITLE: Elemental Abstraction
//time
//creative tilt

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    backgroundColor: '#000000',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },  
    scene: [Loader, Menu, Play, Listener]
}

let game = new Phaser.Game(config)

let debugToggle, keyJUMP, keySTART, keyRESET