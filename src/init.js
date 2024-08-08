import { loadImage } from "./loaderAssets";
import { keyDownUp, hasKey } from "./keyboard"; // Pegar no repositório dele

let CTX;
let CANVAS;
const FRAMES = 60;

let goblinImage = null;
let bgImage = null;
let bgPattern = null;
let boneImage = null;
let x = 0;
let y = 0;

// sistema de pontuaçao
let pontuacao = document.getElementById('pontos');
let pontos = 0;

let cellWidth = 32; // Largura da célula de recorte
let cellHeight = 50; // Altura da célula de recorte
let totalSprites = 4; // Total de sprites
let goblinSpeed = 10; // Velocidade de troca de sprites (anime)
let goblinPositionY = 0;
let goblinPositionX = 0;
let bonePositionX = 0;
let bonePositionY = 0;
let goblinDistancia = 2.2;
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
    boneImage = await loadImage('img/bone.png');

    const {x,y} = generateBonePosition();
    bonePositionX = x;
    bonePositionY = y;
    
    keyDownUp(window);
    loop();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
};

const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown' && !animationFrameId) {
        animeSpriteDown(performance.now());
    }
    if (event.key === 'ArrowUp' && !animationFrameId) {
        animeSpriteUp(performance.now());
    }

    if (event.key === 'ArrowLeft' && !animationFrameId) {
        animeSpriteLeft(performance.now());
    }

    if (event.key === 'ArrowRight' && !animationFrameId) {
        animeSpriteRight(performance.now());
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

const animeSpriteDown = (time) => {
    if (time - lastTime >= spriteInterval) {
        y= 0;
        if (x < (totalSprites - 1)) {
            x = x + 1;
        } else {
            x = 0;
        }
        lastTime = time;
    }
    animationFrameId = requestAnimationFrame(animeSpriteDown);
};

const animeSpriteUp = (time) => {
	if (time - lastTime >= spriteInterval) {
        y= 3;
        if (x < totalSprites - 1) {
            x = x + 1;
        } else {
            x = 0;
        }
			lastTime = time;
	}
	animationFrameId = requestAnimationFrame(animeSpriteUp);
};

const animeSpriteLeft = (time) => {
	if (time - lastTime >= spriteInterval) {
        y= 1;
        if (x < totalSprites - 1) {
            x = x + 1;
        } else {
            x = 0;
        }
			lastTime = time;
	}
	animationFrameId = requestAnimationFrame(animeSpriteLeft);
};

const animeSpriteRight = (time) => {
	if (time - lastTime >= spriteInterval) {
        y= 1.9;
        if (x < totalSprites - 1) {
            x = x + 1;
        } else {
            x = 0;
        }
			lastTime = time;
	}
	animationFrameId = requestAnimationFrame(animeSpriteRight);
};

const generateBonePosition = () =>{
    const x = Math.random() * (750 - 50) + 50;
    const y = Math.random() * (550 - 50) + 50;
    
    return {
        x, y
    }
}

const createBone = (CTX) => {
    CTX.drawImage(boneImage, bonePositionX, bonePositionY, 50, 50);
}

const checkPosition = () => {
    if(parseInt(goblinPositionX) === parseInt(bonePositionX) || parseInt(goblinPositionY) === parseInt(bonePositionY)){
        pontos++;
    }
}

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

    createBone(CTX);
    checkPosition();

    pontuacao.innerText = pontos;

    requestAnimationFrame(loop);
};

export { init }