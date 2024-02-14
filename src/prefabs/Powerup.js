class Powerup extends Item{ 
    constructor(scene, x, y, texture, frame, _name="powerup", _canMove=true){
        super(scene, x, y, texture, frame, _name, _canMove)

        //properties
        this.setScale(2)
        .setCircle(5, true)
        .setOffset(15,9)
        .setBounce(1)
        .setCollideWorldBounds(true)

        //random movement
        super.intervalID = setInterval(()=>{ 
            this.setVelocityY(Phaser.Math.Between(this.INITAL_VELOCITY, this.MAX_VELOCITY)) 
        }, 250)

        //collider
        scene.physics.add.collider(scene.player, this, ()=>{ 
            scene.player.setVelocity(scene.player.body.velocity.x, scene.player.body.velocity.y)
            scene.player.lastCollision = _name
            clearInterval(this.intervalID) 
            scene.sound.play('powerup')
            this.destroy()
            scene.generatePowerup() //spawn more
        },  null, this)  
    } 

    update(){
        super.update()
    }
}