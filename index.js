const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;


function keyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    isJumping = true;

    let upInterval = setInterval( () => {
        if(position >= 170){
            clearInterval(upInterval);

            //Descendo
            downInterval = setInterval( () => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 25;
                    dino.style.bottom = position + "px";
                }
            }, 35);
        }else{//Subindo
            position += 25;
            dino.style.bottom = position + "px";
        }

    }, 25);
}

function criarCatos(){
    const catos = document.createElement('div');
    let catosPosition = 1200;
    let randomTime = Math.random() * 6000;

    catos.classList.add('catos');
    background.appendChild(catos);
    catos.style.left = catosPosition + "px";

    let leftInterval = setInterval( ()=> {
        if(catosPosition < 20){
            clearInterval(leftInterval);
            background.removeChild(catos);
        }else if((catosPosition > 0)&&(catosPosition < 60)&&(position < 60)){
            //Contacto com o dino
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Game Over!</h1>';
        }else{
            catosPosition -= 10;
            catos.style.left = catosPosition + "px";
        }
    }, 20);

    setTimeout(criarCatos, randomTime);
}

criarCatos();
document.addEventListener("keydown",keyUp);