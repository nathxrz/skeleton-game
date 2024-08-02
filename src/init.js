import { loadImage } from "./loaderAssets";
import { keyDownUp, hasKey } from "./keyboard"; // Pegar no repositório dele

let CTX;
let CANVAS;
const FRAMES = 60;

let goblinImage = null;
let bgImage = null;
let bgPattern = null;
let x = 0;
let y = 0;

let cellWidth = 32; // Largura da célula de recorte
let cellHeight = 50; // Altura da célula de recorte
let totalSprites = 4; // Total de sprites
let goblinSpeed = 5; // Velocidade de troca de sprites (anime)
let goblinPositionY = 0;
let goblinPositionX = 0;
let goblinDistancia = 5;
let animationFrameId = null;
let lastTime = 0;
let spriteInterval = 1000 / (FRAMES * goblinSpeed / 100);

const init = async () => {
    console.log("Initialize Canvas");
    CANVAS = document.querySelector('canvas');
    CTX = CANVAS.getContext('2d');
    goblinImage = await loadImage('img/skeleton.png');
    bgImage = await loadImage('img/bg4.png');
    bgPattern = CTX.createPattern(bgImage, 'repeat');
    keyDownUp(window);
    loop();
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
};

const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown' && !animationFrameId) {
        animeSprite(performance.now());
    }

		if (event.key === 'ArrowUp' && !animationFrameId) {
			animeSprite(performance.now());
		}

		if (event.key === 'ArrowLeft' && !animationFrameId) {
			animeSprite(performance.now());
		}

		if (event.key === 'ArrowRight' && !animationFrameId) {
			animeSprite(performance.now());
		}
};

const handleKeyUp = (event) => {
    if (event.key === 'ArrowDown' && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

		if (event.key === 'ArrowUp' && animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		if (event.key === 'ArrowLeft' && animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		if (event.key === 'ArrowRight' && animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
};

const animeSprite = (time) => {
    if (time - lastTime >= spriteInterval) {
        x = x < totalSprites - 1 ? x + 1 : 0;
        lastTime = time;
    }
    animationFrameId = requestAnimationFrame(animeSprite);
};

const animeSprite2 = (time) => {
	if (time - lastTime >= spriteInterval) {
			y = y < totalSprites - 1 ? x + 1 : 0;
			lastTime = time;
	}
	animationFrameId = requestAnimationFrame(animeSprite);
};

const loop = () => {
    if (hasKey('ArrowDown')) {
        if (goblinPositionY <= 480) {
            goblinPositionY += goblinDistancia;
        }
    }

    if (hasKey('ArrowUp')) {
        if (goblinPositionY >= -5) {
            goblinPositionY -= goblinDistancia;
        }
    }

    if (hasKey('ArrowRight')) {
        if (goblinPositionX <= 720) {
            goblinPositionX += goblinDistancia;
        }
    }

    if (hasKey('ArrowLeft')) {
        if (goblinPositionX >= -5) {
            goblinPositionX -= goblinDistancia;
            console.log(goblinPositionX);
        }
    }

    CTX.fillStyle = bgPattern;
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);

    CTX.drawImage(
        goblinImage,
        x * cellWidth,
        y * cellHeight,
        cellWidth,
        cellHeight, // Source
        goblinPositionX, // Posição X de desenho
        goblinPositionY, // Posição Y de desenho
        84, 120 // Draw
    );

    requestAnimationFrame(loop);
};

export { init }