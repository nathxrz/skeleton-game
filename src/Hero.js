import Rect from "./geometries/Rect";
import { loadImage } from "./loaderAssets";

export default class Hero extends Rect{

	constructor(x, y, size, speed, width, height,imgUrl,FRAMES) {
		super(x, y, size);

		this.imgUrl = imgUrl;
		loadImage(this.imgUrl).then(img=>{
			this.img = img;
		});
		this.width = width;
		this.height = height;

		this.speed = speed;
		this.cellWidth = 32;
		this.cellHeight= 49.2;
		this.cellX = 0;
		this.totalSprites = 4;
		this.spriteSpeed = 1;

		this.status = 'right';

		this.hit = new Rect(this.x - this.width/2, this.y - this.height/2, this.size, 0,"rgba(0,0,255,.5)");

		this.animeSprite(FRAMES);
		this.setControls();
	}

	draw(CTX){
		this.setCellY();

		CTX.drawImage(
			this.img,
			this.cellX * this.cellWidth,
			this.cellY * this.cellHeight,
			this.cellWidth,
			this.cellHeight,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}

	animeSprite(FRAMES){
		setInterval(() => {
			this.cellX = this.cellX < this.totalSprites - 1 
						 ? this.cellX + 1 
						 : 0;
		}, 1000 / (FRAMES*this.spriteSpeed/10))
	}

	setControls(){
		this.controls = {
			'ArrowDown':'down',
			'ArrowUp':'up',
			'ArrowLeft':'left',
			'ArrowRight':'right'
		}
	}

	setCellY(){
		let sprites = {
			'down': 0,
			'up': 3,
			'left': 1,
			'right':2
		}

		this.cellY = sprites[this.status];
	}

	move(limits, key){
		let movements = {
			'down': {
				x: this.x,
				y: this.y + this.speed 
			},
			'up': 	{ x: this.x, y: this.y - this.speed },
			'left': { x: this.x - this.speed, y: this.y },
			'right': { x: this.x + this.speed, y: this.y }
		}

		this.status = this.controls[key] ? this.controls[key] : this.status;

		this.x = movements[this.status].x;
		this.y = movements[this.status].y;

		this.updateHit();
		this.limits(limits);
	}
	
	updateHit(){
		this.hit.x = this.x + 15
		this.hit.y = this.y + 13
	}

	limits(limits){
		this.x = this.x - this.size > limits.width 
							? -this.size 
							: this.x;

		this.x = this.x + this.size < 0 ? limits.width - this.size : this.x;

		this.y = this.y - this.size > limits.height+this.size ? -this.size : this.y;
		this.y = this.y + this.size < 0 ? limits.height + this.size : this.y;
	}

	colide(other){
		return (this.hit.size + other.size >= Math.sqrt(
			(this.hit.x-other.x)**2 + (this.hit.y-other.y)**2)
		)
	}
}