export default class Life {
    constructor(){
        this.container = document.getElementById("image-container");
        this.life = 3; // Inicialmente com 3 vidas
        this.updateLives();
    }

    updateLives() {
        // Limpa o container e renderiza as vidas conforme o valor de this.life
        this.container.innerHTML = ''; // Limpa todas as imagens anteriores
        for (let i = 0; i < this.life; i++) {
            const img = document.createElement("img");
            img.src = "../../img/heart.png";
            img.alt = "Vida";
            this.container.appendChild(img);
        }
    }

    increment() {
        if (this.life < 3) { // Apenas incrementa se a vida for menor que 3
            this.life++;
            this.updateLives();
        }
    }

    decrement() {
        if (this.life > 0) { // Apenas decrementa se a vida for maior que 0
            this.life--;
            this.updateLives();
        }
    }
}
