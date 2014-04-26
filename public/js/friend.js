var friend = {
	gravCounter: 0
};

friend.createSprite = function(image){
	friend.sprite = game.add.sprite(0,0,image);
}


friend.update = function(){
	//Position Friend
    friend.sprite.x = player.sprite.x + 150;

    //"Hover" the friend
    if(friend.gravCounter >= 120){
    	friend.gravCounter = 0;
    }else if(friend.gravCounter > 60 && friend.gravCounter < 120){
    	friend.sprite.y += 1 * Math.sin(((friend.gravCounter-60)/30) * Math.PI/2);
    	friend.gravCounter++;
	}else{
		friend.sprite.y -= 1 * Math.sin((friend.gravCounter/30) * Math.PI/2);
		friend.gravCounter++;
	}


}