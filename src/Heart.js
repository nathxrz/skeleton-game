import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";

export default class Heart extends Circle{
    constructor(size, width, height,imgUrl) {
			const x = Math.random() * (750 - 50) + 50;
			const y = Math.random() * (550 - 50) + 50;
	    super(x, y, size);

			this.imgUrl = imgUrl;
			loadImage(this.imgUrl).then(img=>{
				this.img = img;
			})
			this.width = width;
			this.height = height;

			this.cellWidth = 290;
			this.cellHeight= 300;
			this.cellX = 0;
			this.cellY = 0;
			this.totalSprites = 2;
			this.spriteSpeed = 1;

			this.hit = new Circle(this.x + this.width/2, this.y + this.height/2, this.size, 0,"rgba(0,0,255,.5)");

			this.animeSprite(20);
		}

		draw(CTX){
			CTX.drawImage(
				this.img,
				this.cellX * this.cellWidth,
				this.cellY,
				this.cellWidth,
				this.cellHeight,
				this.x,
				this.y,
				this.width,
				this.height
			)
		}

		animeSprite(speed){ 
			setInterval(() => {
				this.cellX = this.cellX < this.totalSprites - 1 
							? this.cellX + 1.34 
							: 0;
							
			}, 1000 / (speed*this.spriteSpeed/10))
		}

		updatePosition(){
				const {x, y} = this.generatePosition();
				this.x = x;
				this.y = y;
				this.updateHit();        
		}

    generatePosition() {
        const x = Math.random() * (750 - 50) + 50;
        const y = Math.random() * (550 - 50) + 50;
        return {x,y}
    }

    updateHit(){
			this.hit.x = this.x + this.width/2;
			this.hit.y = this.y + this.height/2;
		}

		colide(other){
			return (this.hit.size + other.size >= Math.sqrt(
				(this.hit.x-other.x)**2 + (this.hit.y-other.y)**2)
			)
		}
}