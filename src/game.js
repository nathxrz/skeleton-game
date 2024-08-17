import Enemy from "./Enemy"
// import Smile from "./Smile"
import { keyPress, key } from "./keyboard"
import Hero from "./Hero"
import Bone from "./Bone"
import Score from "./Score"

import { loadImage, loadAudio } from "./loaderAssets";

let CTX
let CANVAS
const FRAMES = 60

// const qtdEnemies = 10

// let enemies = Array.from({length:qtdEnemies});

// const smile = new Smile(300, 100, 20, 5, 'yellow')

const hero = new Hero(310,40,15,5,70,105,'../../img/skeleton.png',FRAMES)
const bone = new Bone(15,40,40,'../../img/bone.png');
const score = new Score();

let gameover = false
let anime;
let boundaries
let bgPattern = null;

let sound = null;
let theme = null;

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')

	const bgImage = await loadImage('../../img/game-background.png');
    bgPattern = CTX.createPattern(bgImage, 'repeat');
	
	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}

	// enemies = enemies.map(i=>new Enemy(
	// 		Math.random()*CANVAS.width,
	// 		Math.random()*CANVAS.height,
	// 		10, 5, 'red'
	// 	))

	try {
		sound = await loadAudio('../../sounds/collect-items.mp3')
		if(sound?.volume){
			sound.volume = .5
		}else{
			throw new Error(`Problemas com o Audio!!`);
		}
	} catch (error) {
		console.log(sound)
		console.error(error)
	}

	try {
		theme = await loadAudio('../sounds/background_music.mp3')
		theme.volume = .2
		theme.loop = true;
	} catch (error) {
		console.error(error)
	}

	keyPress(window)
	loop()

}

const loop = () => {
	setTimeout(() => {

		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
		CTX.fillStyle = bgPattern;
		CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);

		// smile.move(boundaries, key)
		// smile.draw(CTX)

		hero.move(boundaries, key)
		hero.draw(CTX)
		bone.draw(CTX);
		
		// enemies.forEach(e =>{
		// 	e.move(boundaries, 0) 
		// 	e.draw(CTX)
		// 	 //var = teste?verdadeiro:falso;
		// 	 gameover = !gameover 
		// 	 		? hero.colide(e)
		// 			: true;
		// })

		theme.play();

		const scoring = hero.colide(bone)
		
		if(scoring) {
			score.increment();
			bone.updatePosition();
			score.update();
			sound.play();
		}

		if (gameover){
			console.error('DEAD!!!')
			cancelAnimationFrame(anime)
		}else {
			anime = requestAnimationFrame(loop)
		}
	}, 1000 / FRAMES)
}

export { init }