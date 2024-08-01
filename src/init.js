import { loadImage } from "./loaderAssets"

let CTX
let CANVAS
const FRAMES = 60

let goblinImage = null
let bgImage = null
let bgPattern=null
let x = 0
let y = 0

let cellWidth = 32		//largura da celular de recorte
let cellHeight = 50	//altura da celula de recorte
let totalSprites = 4	//Total de sprites
let goblinSpeed =  5 	//Velocidade de troca de sprites (anime)

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	goblinImage = await loadImage('img/skeleton.png')
	bgImage = await loadImage('img/background-gray.png')
	bgPattern = CTX.createPattern(bgImage,'repeat')
	loop()
	animeSprite(goblinSpeed)
}

const animeSprite = (spriteSpeed)=>{ //Controla a animacao do sprite
	setInterval(() => {
		x = x < totalSprites - 1 ? x + 1 : 0;
	}, 1000 / (FRAMES*spriteSpeed/100))
}

const loop = () => {

	setTimeout(() => {
		CTX.fillStyle = bgPattern;
		CTX.fillRect(0,0,CANVAS.width,CANVAS.height)

		CTX.drawImage(
			goblinImage,
			x * cellWidth,
			y,
			cellWidth,
			cellHeight, //source
			100, 10, 32, 50 //draw
		)

		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init }


