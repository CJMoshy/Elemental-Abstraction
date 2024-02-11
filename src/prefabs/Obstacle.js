class Obstacle extends Item {
    constructor(scene, x, y, texture, frame, _name="unknown", _canMove=true, _isConsumable=false, _doesDamage=true){
      super(scene, x, y, texture, frame, _name, _canMove, _isConsumable, _doesDamage)
      this.setScale(5.5)
      .setSize(12,5)
      .setOffset(10, 10)
      .setImmovable(true)
    }

    update(){
      super.update()
    }
}