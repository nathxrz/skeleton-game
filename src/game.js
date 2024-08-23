import { keyPress, key } from "./keyboard"
import { loadImage, loadAudio } from "./loaderAssets";

import Enemy from "./Enemy"
import Hero from "./Hero"
import Bone from "./Bone"
import Score from "./Score"
import Heart from "./Heart"
import Life from "./Life"

window.start = false;
let CTX
let CANVAS
const FRAMES = 60

//enemy variables
const qtdEnemies = 1
let enemies = Array.from({length:qtdEnemies});

//objects
const hero = new Hero(310,40,15,5,70,105,'../../img/skeleton.png',FRAMES)
const bone = new Bone(15,40,40,'../../img/bone.png');
const heart = new Heart(15,45,45,'../../img/heart.png');
const score = new Score();
const life = new Life();

//sound variables
let soundOfCollectingBone = null;
let soundOfCollectingHeart = null;
let soundOfLoseLife = null;
let soundOfGameOver = null;
let theme = null;

//others variables
let gameover = false
let anime;
let boundaries
let bgPattern = null;

const init = async () => {
	
	//canvas
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')

	//canvas background image
	const bgImage = await loadImage('../../img/game-background.png');
  bgPattern = CTX.createPattern(bgImage, 'repeat');
	
	//canvas limitations
	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}

	//creation of enemies
	enemies = enemies.map(i=>new Enemy(
			Math.random()*CANVAS.width,
			Math.random()*CANVAS.height,
			10, 5, 'red'
		))

	//loading audio (bone)
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

	//loading audio (heart)
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

	//loading audio (lose life)
	try {
		soundOfLoseLife = await loadAudio('../../sounds/lose-life.mp3')
		if(soundOfLoseLife?.volume){
			soundOfLoseLife.volume = .5
		}else{
			throw new Error(`Problemas com o Audio!!`);
		}
	} catch (error) {
		console.log(soundOfLoseLife)
		console.error(error)
	}

	//loading audio (game over)
	try {
		soundOfGameOver = await loadAudio('../../sounds/game-over.mp3')
		if(soundOfGameOver?.volume){
			soundOfGameOver.volume = .5
		}else{
			throw new Error(`Problemas com o Audio!!`);
		}
	} catch (error) {
		console.log(soundOfGameOver)
		console.error(error)
	}

	//loading audio (theme)
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

		hero.move(boundaries, key)
		hero.draw(CTX)
		bone.draw(CTX);

		enemies.forEach(e =>{
			e.move(boundaries) 
			e.draw(CTX)
			
			if(hero.colide(e) && life.qtdlife > 0){
				life.decrement();
				e.updatePosition(boundaries)
				soundOfLoseLife.play();
			}else{
				gameover = gameover || hero.colide(e);
			}
		})

		if(life.qtdlife < 3){
			heart.draw(CTX);
		}

		if(window.start){
			theme.play();
		}

		const scoring = hero.colide(bone)
		const collectLife = hero.colide(heart)

		if(scoring) {
			score.increment();
			bone.updatePosition();
			score.update();
			soundOfCollectingBone.play();
		}

		if(collectLife){
			life.increment();
			heart.updatePosition();
			soundOfCollectingHeart.play();
		}

		if (gameover){
			soundOfGameOver.play();
			cancelAnimationFrame(anime)
		}else {
			anime = requestAnimationFrame(loop)
		}

	}, 1000 / FRAMES)
}

export { init }