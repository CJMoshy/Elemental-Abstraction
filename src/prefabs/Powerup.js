class Powerup extends Item{ 
    constructor(scene, x, y, texture, frame, _name="powerup", _canMove=true){
        super(scene, x, y, texture, frame, _name, _canMove)

        //properties
        this.setScale(2)
        .setCircle(5, true)
        .setOffset(15,9)
        .setBounce(1)
        .setCollideWorldBounds(true)

        super.intervalID = setInterval(()=>{ 
            this.setVelocityY(Phaser.Math.Between(this.INITAL_VELOCITY, this.MAX_VELOCITY)) //todo normaiize?
        }, 250)
    } 

    update(){
        super.update()
    }
}