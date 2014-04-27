var friend = {
	gravCounter: 0,
	floaty: 0,
	dialogue:[["Can you hear me? Press SPACE if so.", "Good. You've fully connected.", "Did your memories survive the transfer?", 
	"...","Ok. Let's go over this... AGAIN.", "I'm Bitxl.", "You are connected to the simulated reality, NAME.", "I made it myself. Nice, huh?", "I'm sure you love the avatar I made you.",
	"You connected to help me squash some bugs in my code.","We're best friends in the \"main\" reality, you know.", "Anyway, let's get started.",""],
	[""],
	["Ok, I'm bringing down some source code.","",""],
	["Alright.","Use WASD to move through the simulation.","Adjust the source to get to the white area.","Try not to break anything.",""],
	["Oh.","Uh...","That wasn't supposed to happen.","",""]
	],
	dialogueCount: 0,
	dialogueStage: 0
};

friend.createSprite = function(image){
	friend.sprite = game.add.sprite(0,0,image);
	friend.sprite.anchor.setTo(.5,.5);
}

friend.talk = function(){
	friend.currentText = game.add.text(
		friend.sprite.x, friend.sprite.y , '', { font: '25px Lato', fill: '#ffffff' }
	);

	friend.currentText.anchor.setTo(.5,.5);
	friend.currentText.wordWrap = true;
	friend.currentText.wordWrapWidth = 500;
	friend.currentText.align = "center";

}

friend.update = function(){
	//Position Friend
    friend.sprite.x = player.sprite.x + 150;
    friend.basey = player.sprite.y - 230;

    if(scene===0){
	    //"Hover" the friend
	    if(friend.gravCounter >= 120){
	    	friend.gravCounter = 0;
	    }else if(friend.gravCounter > 60 && friend.gravCounter < 120){
	    	friend.floaty += 1 * Math.sin(((friend.gravCounter-60)/30) * Math.PI/2);
	    	friend.gravCounter++;
		}else{
			friend.floaty -= 1 * Math.sin((friend.gravCounter/30) * Math.PI/2);
			friend.gravCounter++;
		}

		friend.sprite.y = friend.basey + friend.floaty;

		//Move text as well
		friend.currentText.y = friend.sprite.y - 80;
		friend.currentText.x = friend.sprite.x;
	}else if(scene === 1){
		friend.currentText.y = 300;
		friend.currentText.x = GAME_WIDTH/2;

		if(friend.sprite.y > -200){
			friend.sprite.y -= 8;
		}else{
			scene = 2;
			sfx.talk.play();
		}

	}else if(scene === 2){
		friend.sprite.y = -200;

		if(friend.dialogueCount === 1 && !codeBox.toggleRequest){
			codeBox.toggleRequest = true;
			friend.currentText.y = 300;
		}else if(codeBox.down){
			friend.dialogueCount = 0;
			scene = 3;
			sfx.talk.play();
		}

	}else if(scene === 3){
		friend.sprite.y = -200;

		friend.currentText.x = GAME_WIDTH/2;
		friend.currentText.y = 300;

	}else if(scene === 4){
		
	}

	//check for text continue
	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR, 10)){
		if(scene===0||scene===2){
			if(friend.dialogueCount + 1 < friend.dialogue[scene].length){
				friend.dialogueCount++;
				sfx.talk.play();

				if(scene === 0){
					if(friend.dialogueCount + 1 === friend.dialogue[scene].length){
						scene++;
						friend.dialogueCount = 0;
					}

				}
			}
		}else if(scene === 3 || scene === 4){
			if(friend.dialogueCount + 1 < friend.dialogue[scene].length){
				friend.dialogueCount++;
				sfx.talk.play();
			}

		}
		
	};

	//Update text
	friend.currentText.setText(friend.dialogue[scene][friend.dialogueCount]);
}

