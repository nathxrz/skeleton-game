export default class Life {
    constructor(){
        this.container = document.getElementById("image-container");
        this.qtdlife = 3;
        this.updateLives();
    }

    updateLives() {
       
        this.container.innerHTML = ''; 
        for (let i = 0; i < this.qtdlife; i++) {
            const img = document.createElement("img");
            img.src = "../../img/heart.png";
            img.alt = "Vida";
            this.container.appendChild(img);
        }
    }

    increment() {
        if (this.qtdlife < 3) { 
            this.qtdlife++;
            this.updateLives();
        }
    }

    decrement() {
        if (this.qtdlife > 0) { 
            this.qtdlife--;
            this.updateLives();
        }
    }
}
