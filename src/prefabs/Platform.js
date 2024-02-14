//platform subclass
class Platform extends Item{ 
    constructor(scene, x, y, texture, frame, _name="platform", _canMove=true, v_init=-250){
        super(scene, x, y, texture, frame, _name, _canMove, v_init)

        //properties
        this.setImmovable(true)
        this.setFriction(0)
        this.setOrigin(1)
        this.body.checkCollision.down = false
        this.body.checkCollision.left = false
        this.body.checkCollision.right = false

        //collider
        scene.physics.add.collider(scene.player, this, ()=>{
            if(scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown){
                scene.player.setVelocityY(250)
                this.body.checkCollision.up = false
                return true
            }
        }, 
      null,this)
    }
    
    update(){ 
        super.update()
    }
}