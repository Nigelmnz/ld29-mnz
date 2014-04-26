var player = {
	acceleration: 1200,
	jumpSpeed: -600,
	drag: 5000,
	maxSpeed: 300
};

player.createSprite = function(image){
	player.sprite = game.add.sprite(0,0,image);
}

player.enablePhysics = function(){
	// Enable physics on the player
	game.physics.enable(player.sprite, Phaser.Physics.ARCADE);

	 // Make player collide with world boundaries so he doesn't leave the stage
	player.sprite.body.collideWorldBounds = true;

	//Give the player drag
	player.sprite.body.drag.setTo(player.drag,0);

	//Set Speed limits
	player.sprite.body.maxVelocity.setTo(player.maxSpeed, player.maxSpeed*10);

}

player.update = function(){
	//Move the player as needed
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		player.sprite.body.acceleration.x = -player.acceleration;
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		player.sprite.body.acceleration.x = player.acceleration;
	} else {
		player.sprite.body.acceleration.x = 0;
	}

	//Check if on ground
    var onFloor = player.sprite.body.touching.down;

    //Jumping, 
    if (onFloor && game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
        player.sprite.body.velocity.y = player.jumpSpeed;
    }

}


// player.acceleration = 1200;
// player.jumpSpeed: -600,
// player.drag: 5000,
// player.maxSpeed: 300