import Enemy from "./Enemy"
import { keyPress, key } from "./keyboard"
import Hero from "./Hero"
import Bone from "./Bone"
import Heart from "./Heart"
import Score from "./Score"

import { loadImage, loadAudio } from "./loaderAssets";
import Life from "./Life"

let CTX
let CANVAS
const FRAMES = 60

const qtdEnemies = 3

let enemies = Array.from({length:qtdEnemies});

const hero = new Hero(310,40,15,5,70,105,'../../img/skeleton.png',FRAMES)
const bone = new Bone(15,40,40,'../../img/bone.png');
const heart = new Heart(15,45,45,'../../img/heart.png');
const score = new Score();
const life = new Life();

let gameover = false
let anime;
let boundaries
let bgPattern = null;

let soundOfCollectingBone = null;
let soundOfCollectingHeart = null;
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

	enemies = enemies.map(i=>new Enemy(
			Math.random()*CANVAS.width,
			Math.random()*CANVAS.height,
			10, 5, 'red'
		))

	try {
		soundOfCollectingBone = await loadAudio('../../sounds/collect-bone.mp3')
		if(soundOfCollectingBone?.volume){
			soundOfCollectingBone.volume = .5
		}else{
			throw new Error(`Problemas com o Audio!!`);
		}
	} catch (error) {
		console.log(soundOfCollectingBone)
		console.error(error)
	}

	try {
		soundOfCollectingHeart = await loadAudio('../../sounds/collect-heart.mp3')
		if(soundOfCollectingHeart?.volume){
			soundOfCollectingHeart.volume = .5
		}else{
			throw new Error(`Problemas com o Audio!!`);
		}
	} catch (error) {
		console.log(soundOfCollectingHeart)
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
		heart.draw(CTX);
		
		enemies.forEach(e =>{
			e.move(boundaries, 0) 
			e.draw(CTX)
		})

		// enemies.forEach(e =>{
		// 	e.move(boundaries, 0) 
		// 	e.draw(CTX)
		// 	//  //var = teste?verdadeiro:falso;
		// 	//  gameover = !gameover 
		// 	//  		? hero.colide(e)
		// 	// 		: true;
		// })

		theme.play();

		const scoring = hero.colide(bone)
		const collectLife = hero.colide(heart)
		const colideArrow = hero.colide(enemies);
		
		if(scoring) {
			score.increment();
			bone.updatePosition();
			score.update();
			soundOfCollectingBone.play();
		}

		if(collectLife){
			life.increment;
			heart.updatePosition();
			soundOfCollectingHeart.play();
		}

		if(colideArrow && life.life > 0){
			life.decrement;
		}else{
			if (gameover){
				console.error('DEAD!!!')
				cancelAnimationFrame(anime)
			}else {
				anime = requestAnimationFrame(loop)
			}
		}

	}, 1000 / FRAMES)
}

export { init }