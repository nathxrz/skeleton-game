
let key;

function keyPress(element){
    element.addEventListener('keydown',event=>{
        window.start = true;
        key = event.key
    })
}

export {keyPress, key}