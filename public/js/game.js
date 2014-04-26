//Global Vars//
var GAME_HEIGHT = 1080;
var GAME_WIDTH = 1920;

//*Display the game**//
var game = new Phaser.Game(GAME_WIDTH,GAME_HEIGHT, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});

function preload(){
}

function create(){
	//Set Background
	game.stage.backgroundColor = 0x4488cc;

	//Say Hello
	fpsText = game.add.text(
        GAME_WIDTH/2, GAME_HEIGHT/2, 'Hello, LudumDare!', { font: '50px Lato', fill: '#ffffff' }
    );
	//Set Anchor to center
    fpsText.anchor.setTo(0.5, 0.5);

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

}

function update(){
	//Keep game window same as browser window
	util.resizeGame(game);

	//Update FPS
	if (game.time.fps !== 0) {
        fpsText.setText(game.time.fps + ' FPS');
    }
	
}




