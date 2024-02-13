//created by CJ Moshy
//TITLE: Elemental Abstraction
//time: 20 Hours
//creative tilt: Collecting 'element' powerups gives the player a permanant score multiplier

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
    scene: [Loader, Credits, Menu, Play, GameOver]
}

let game = new Phaser.Game(config)

let debugToggle, keyJUMP, keySTART, keyRESET