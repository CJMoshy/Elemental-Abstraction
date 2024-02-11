class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)


        //general properties
        this.setVelocity(0)
        this.setOrigin(0)
        this.setScale(0.5)
        this.setCollideWorldBounds(true)
        this.setGravityY(1400)
        this.setSize(70,240)

        //score, gamestate
        this.scoreMultiplier = 1
        this.lives = 5


        //jump stuff
        this.PLAVER_JUMP_VELOCITY = 550
        this.isjumping = false
        this.playerVector = new Phaser.Math.Vector2(0, -1)
        this.playerVector.normalize()

        //positioning on map
        this.resetFlag = true

        //states
        this.lastCollision = null    
        this.FSM = new StateMachine('vanilla', {
            vanilla: new mainState(),
            fire: new fireState(),
            water: new waterState(),
            earth: new earthState(),
            air: new airState(),
            fireAir: new fireAirState(),
            fireEarth: new fireEarthState(),
            fireWater: new fireWaterState(),
            airEarth: new airEarthState(),
            airWater: new airWaterState(),
            earthWater: new earthWaterState(),
            fireAirEarth: new fireAirEarthState(),
            fireAirWater: new fireAirWaterState(),
            airEarthWater: new airEarthWaterState(),
            earthWaterFire: new earthWaterFireState(),
            meta: new metaState()
        }, [scene, this])   
    }


    update(){

        this.FSM.step()
        //jump mechanic
        if(!this.isjumping && Phaser.Input.Keyboard.JustDown(keyJUMP)){
            this.anims.pause()
            this.isjumping = true
            this.setVelocity(this.PLAVER_JUMP_VELOCITY * this.playerVector.x, this.PLAVER_JUMP_VELOCITY * this.playerVector.y)
            this.scene.time.delayedCall(500, ()=>{
                this.scene.player.anims.resume()
            },null, null)
        }

        if(this.y > 175){ //enforce jump height -> TODO maybe change this to jump cooldown
            this.isjumping = false
        }

        if(this.resetFlag){
            this.fixPosition()
        }

    }
 
    fixPosition(){
        if(!this.isjumping){
            if(this.x < 95){
                this.setVelocityX(100)
            }

            if(this.x > 95 && this.x < 105){
                this.setVelocityX(0)
            }

            if(this.x > 105){
                this.setVelocityX(-100)
            }
        }
    }

}

//FA, FE, FW, AE, AW, EW

//FAE, FAW, AEW, EWF

class mainState extends State{
    enter(scene, player){
        player.anims.play('running_vanilla')
    }

    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-red': //collided with blue
                this.stateMachine.transition('fire')
                return
            case 'powerup-blue': //collided with blue
                this.stateMachine.transition('water')
                return
            case 'powerup-green': //collided with blue
                this.stateMachine.transition('earth')
                return
            case 'powerup-teal': //collided with blue
                this.stateMachine.transition('air')
                return
        }
    }
}

class fireState extends State{
    enter(scene, player){
        player.anims.play('running_fire')
    }

    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-blue': //collided with blue
                this.stateMachine.transition('fireWater')
                break
            case 'powerup-green': //collided with blue
                console.log('here')
                this.stateMachine.transition('fireEarth')
                break
            case 'powerup-teal': //collided with blue
                this.stateMachine.transition('fireAir')
                break
        }
    }
}

class waterState extends State{
    enter(scene, player){
        player.anims.play('running_water')
    }

    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-red': //collided with blue
                this.stateMachine.transition('fireWater')
                return
            case 'powerup-green': //collided with blue
                this.stateMachine.transition('earthWater')
                return
            case 'powerup-teal': //collided with blue
                this.stateMachine.transition('airWater')
                return
        }
    }
}

class earthState extends State{
    enter(scene, player){
        player.anims.play('running_earth')
    }

    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-red': //collided with blue
                this.stateMachine.transition('fireEarth')
                return
            case 'powerup-blue': //collided with blue
                this.stateMachine.transition('earthWater')
                return
            case 'powerup-teal': //collided with blue
                this.stateMachine.transition('airEarth')
                return
        }
    }
}

class airState extends State{
    enter(scene, player){
        player.anims.play('running_air')
    }

    
    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-red': //collided with blue
                this.stateMachine.transition('fireAir')
                return
            case 'powerup-blue': //collided with blue
                this.stateMachine.transition('airWater')
                return
            case 'powerup-green': //collided with blue
                this.stateMachine.transition('airEarth')
                return
        }
    }
}

class fireAirState extends State{
    enter(scene, player){
        player.anims.play('running_fire_air')
        player.scoreMultiplier = 2
    }
 
    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-blue': //collided with blue
                this.stateMachine.transition('fireAirWater')
                return
            case 'powerup-green': //collided with blue
                this.stateMachine.transition('fireAirEarth')
                return
        }
    }
}

class fireEarthState extends State{
    enter(scene, player){
        player.anims.play('running_fire_earth')
        player.scoreMultiplier = 2
    }
 
    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-blue': //collided with blue
                this.stateMachine.transition('earthWaterFire')
                return
            case 'powerup-teal': //collided with blue
                this.stateMachine.transition('fireAirEarth')
                return
        }
    }
}

class fireWaterState extends State{
    enter(scene, player){
        player.anims.play('running_fire_water')
        player.scoreMultiplier = 2
    }

    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-green': //collided with blue
                this.stateMachine.transition('earthWaterFire')
                break
            case 'powerup-teal': //collided with blue
                this.stateMachine.transition('fireAirWater')
                break
        }
    }
}

class airEarthState extends State{
    enter(scene, player){
        player.anims.play('running_earth_air')
        player.scoreMultiplier = 2
    }
 
    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-blue': //collided with blue
                this.stateMachine.transition('airEarthWater')
                return
            case 'powerup-red': //collided with blue
                this.stateMachine.transition('fireAirEarth')
                return
        }
    }
}


class airWaterState extends State{
    enter(scene, player){
        player.anims.play('running_air_water')
        player.scoreMultiplier = 2
    }
 
    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-green': //collided with blue
                this.stateMachine.transition('airEarthWater')
                return
            case 'powerup-red': //collided with blue
                this.stateMachine.transition('fireAirWater')
                return
        }
    }

}
class earthWaterState extends State{
    enter(scene, player){
        player.anims.play('running_earth_water')
        player.scoreMultiplier = 2
    }
 
    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-teal': //collided with blue
                this.stateMachine.transition('airEarthWater')
                return
            case 'powerup-red': //collided with blue
                this.stateMachine.transition('earthWaterFire')
                return
        }
    }

}
class fireAirEarthState extends State{
    enter(scene, player){
        player.anims.play('running_earth_air_fire')
        player.scoreMultiplier = 3
    }
 
    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-blue': //collided with blue
                this.stateMachine.transition('meta')
                return
        }
    }

}
class fireAirWaterState extends State{
    enter(scene, player){
        player.anims.play('running_air_fire_water')
        player.scoreMultiplier = 3
    }
 
    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-green': //collided with blue
                this.stateMachine.transition('meta')
                return
        }
    }

}
class airEarthWaterState extends State{
    enter(scene, player){
        player.anims.play('running_air_earth_water')
        player.scoreMultiplier = 3
    }
 
    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-red': //collided with blue
                this.stateMachine.transition('meta')
                return
        }
    }

}
class earthWaterFireState extends State{
    enter(scene, player){
        player.anims.play('running_earth_water_fire')
        player.scoreMultiplier = 3
    }
 
    execute(scene, player){
        switch(player.lastCollision){
            case 'powerup-teal': //collided with blue
                this.stateMachine.transition('meta')
                return
        }
    }
}

class metaState extends State{
    enter(scene, player){
        player.anims.play('running_meta')
        player.scoreMultiplier = 4
    }
}

