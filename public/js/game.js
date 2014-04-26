//Global Vars//
var GAME_HEIGHT = 1080;
var GAME_WIDTH = 1920;
var friend;
var world;
var GRAVITY = 1500;

//*Display the game**//
var game = new Phaser.Game(GAME_WIDTH,GAME_HEIGHT, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render});

function preload(){
	game.load.image('player', "/assets/player.png");
	game.load.image('friend', "/assets/friend.png");
}

function create(){
	//Set Background
	game.stage.backgroundColor = "#1C2619";

	// Show FPS
	game.time.advancedTiming = true;
	fpsText = game.add.text(
		20, 20, '0 FPS', { font: '16px Lato', fill: '#ffffff' }
	);

	online.connect(function(){
		game.add.text(80, 20, 'Sockets connected.', { font: '16px Lato', fill: '#ffffff'});
	})

	//Capture Keys
	game.input.keyboard.addKeyCapture([
		Phaser.Keyboard.LEFT,
		Phaser.Keyboard.RIGHT,
		Phaser.Keyboard.UP,
		Phaser.Keyboard.DOWN,
		Phaser.Keyboard.F
	]);


	//Fullscreen Hotkey
	fullScreenKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
	fullScreenKey.onDown.add(function(){
		game.scale.startFullScreen(false); //bool controls AA
	}, this);

	//Gravity.
	game.physics.arcade.gravity.y = GRAVITY;

	//Add Player
	player.createSprite('player');
	player.enablePhysics();
	
	//Add Friend
	friend.createSprite('friend');

	//Build Room
	buildRoom(rooms.startingRoom);

	//Make sure the player is in front
	player.sprite.bringToTop();



}

function update(){
	//Keep game window same as browser window
	util.resizeGame(game);

	//Update FPS
	if (game.time.fps !== 0) {
		fpsText.setText(game.time.fps + ' FPS');
	}

	//Make sure the player and world collide
	game.physics.arcade.collide(player.sprite, world);

	//Update Characters
	player.update();
	friend.update();
	
}

function render(){
	// game.debug.body(player);
	// game.debug.body(world);

}

///*************Game Functions****************////

function buildRoom(room){
	world = game.add.group();

	mapWidth = room.width * rooms.tileSize;
	mapHeight = room.height * rooms.tileSize;

	room.data.forEach(function(tile, index){
		x = (index % room.width)*rooms.tileSize;
		y = Math.floor(index / room.width)*rooms.tileSize;

		if(tile === 3){ //Place player
			player.sprite.x = x + mapWidth/2;
			player.sprite.y = y + mapHeight/2 - player.sprite.height*1.5;
			friend.sprite.x = player.sprite.x + 100;
			friend.sprite.y = player.sprite.y - 100;

		}else if(tile === 0){

		}else{ //Draw tile
			bitmap = game.add.bitmapData(rooms.tileSize, rooms.tileSize);
			ctx = bitmap.context;
			ctx.fillStyle = rooms.tileColors[tile];
			ctx.fillRect(0, 0, rooms.tileSize, rooms.tileSize);
			block = game.add.sprite(GAME_WIDTH/2 - mapWidth/2 + x, GAME_HEIGHT/2 - mapHeight/2 + y, bitmap);
			game.physics.enable(block, Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.allowGravity = false;
			world.add(block);
		}
	});
}



