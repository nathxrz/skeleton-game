import Circle from "./geometries/Circle";

export default class Enemy extends Circle{
	constructor(x, y, size, speed, color) {
		super(x,y,size)
		this.color = color;
		this.speed = speed;
		this.line = 1
		this.size = size
	}

	
	moveY(limits){
		this.y +=this.speed
		this.limitsY(limits)
	}

	updatePositionY(limits){
		this.x = Math.random()*limits.width,
		this.y = 0
	}

	limitsY(limits){
		if(this.y - this.size > limits.height ){
			this.y = -2*this.size
			this.x = Math.random()*limits.width;
		}
	}

	moveX(limits){
		this.x +=this.speed
		this.limitsX(limits)
	}

	updatePositionX(limits){
		this.x = 0,
		this.y = Math.random()*limits.width
	}

	limitsX(limits){
		if(this.x - this.size > limits.width){
			this.x = this.size
			this.y = Math.random()*limits.width;
		}
	}

}







