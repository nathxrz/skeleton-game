export default class Score {
    constructor(){
        this.element = document.getElementById('score');
        this.score = 0;
    }
    
    update(){
        this.score++;
        this.element.innerText = this.score;
    }
}