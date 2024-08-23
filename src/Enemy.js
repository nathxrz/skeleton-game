import Circle from "./geometries/Circle";

export default class Enemy extends Circle{
	constructor(x, y, size, speed = 10, color = "#00f") {
		super(x,y,size,speed,color)
		this.line = 1
		this.size = size
	}

	move(limits){
		this.y +=this.speed
		this.limits(limits)
	}

	updatePosition(limits){
		this.x = Math.random()*limits.width,
		this.y = 0
	}

	limits(limits){
		if(this.y - this.size > limits.height ){
			this.y = -2*this.size
			this.x = Math.random()*limits.width;
		}
	}
}







