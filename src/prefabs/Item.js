class Item extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, _name='unknown', _canMove=false, _isConsumable=false, _doesDamage=false){
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        this.name = _name
        this.canMove = _canMove
        this.isConsumable = _isConsumable
        this.doesDamage = _doesDamage
    }

    //TODO: update function
}