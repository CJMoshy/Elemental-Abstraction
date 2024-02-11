class Platform extends Item{ 
    constructor(scene, x, y, texture, frame, _name="platform", _canMove=true, v_init=-250){
        super(scene, x, y, texture, frame, _name, _canMove, v_init)

        this.setImmovable(true)
        this.setFriction(0)
        this.setOrigin(1)

        //platforms start non-interactive and spawn in after their first pass
        this.body.checkCollision.down = false
        this.body.checkCollision.left = false
        this.body.checkCollision.right = false

        scene.physics.add.collider(scene.player, this, ()=>{console.log('collision @plat')},  null, this) 
    }
    
    update(){ 
        super.update()
    }
}