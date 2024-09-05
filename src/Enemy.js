import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";

export default class Enemy extends Circle{
	constructor(x, y, size, speed, imgUrl, eixo) {
		super(x,y,size)

		this.imgUrl = imgUrl
		loadImage(this.imgUrl).then(img=>{
			this.img = img
		})

		this.speed = speed;
		this.line = 1
		this.eixo = eixo
	}

	draw(CTX){
		CTX.drawImage(
			this.img,
			this.x,
			this.y,
			this.eixo === 'y' ? 42 : 64,
			this.eixo === 'y' ? 64 : 42)
	}

	updateSpeed(speed){
		this.speed = speed;
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







