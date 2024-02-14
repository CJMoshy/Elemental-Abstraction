//created by CJ Moshy
//TITLE: Elemental Abstraction
//time: 20 Hours
//creative tilt- visual/clever mechanic: Collecting 'element' powerups gives the player a permanant score multiplier. I think this is clever and hopefully worth (1) pt
//creative tilt - technicaly interesting: Game defines base 'item' class which can be used to easily add new items to the game in the future.
//                  the entire code base is written with adaptation and preformance in mind. All objects are strictly propertied so manipulation of any objects is simple (1) pt

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    backgroundColor: '#000000',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },  
    scene: [Loader, Credits, Menu, Play, GameOver]
}

let game = new Phaser.Game(config)

let keyJUMP