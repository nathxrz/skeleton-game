
let key;

function keyPress(element){
    element.addEventListener('keydown',event=>{
        if(event.key == "Enter"){
            window.start = true;
        }
        key = event.key
    })
}

export {keyPress, key}