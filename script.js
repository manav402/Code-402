//Notice for github public :- Highly sensetive area beware before changes if thing is working dont you dare to change it

'use Strict';
let goingLeft = true;
let i = 0;
let j = 0;
let HeroGoingleft = false;
let version = "1.4 - added collison";
let alredyColided = false;

//Laptop Coding Starts Here

// console.log(document.documentElement.clientWidth);

let width = document.querySelector(".score-heading");
width.textContent = "version is " + version;

// document.addEventListener("DOMContentLoaded", function () {
//     //   if(e.key==="w"){
//     // console.log("dom contant loaded");
//     // moveEnemy();
//     //   }
// });

document.addEventListener("keydown", function (e) {
    moveHero(e.key);
});
let lastHeroPosition;
let alredyFired=false;
function moveHero(key) {
    let standingStill = false;
    let shooting = false;
    let speedH = 10;
    let hero = document.querySelector(".hero");
    let heroImg = document.querySelector(".heroImg");
    let heroProgress = document.querySelector(".progressHero");
    let width = document.documentElement.clientWidth;
    let onMobile = false;
    positionH = hero.style.left;
    progressPositionH = heroProgress.style.left;
    if (document.documentElement.clientWidth <= 1100) {
        onMobile = true;
        speedH = 3;
    }
    progressPositionH = Number(progressPositionH.substring(0, progressPositionH.length - 2));
    // console.log(position);

    let imgH = "Hero/hero-left-1.png";
    if (key === "ArrowLeft" || key === "a") {
        HeroGoingleft = true;
        standingStill = false;
    }
    else if (key === "ArrowRight" || key === "d") {
        HeroGoingleft = false;
        standingStill = false;
    }
    else if (key == "v") {
        standingStill = true;
        shooting = false;
        // console.log(document.querySelector(".gun").style.visibility);
        if (!alredyFired) {
            alredyFired = true;
            // shoot(positionH.substring(0, positionH.length - 2)); //100px -> 100
            shoot();
        }
    }
    else if (key === " ") {
        let jumpMe = document.querySelector(".Heros");
        let delay = 800;
        // let jumpBar=document.querySelector(".progressHero");
        (onMobile) ? jumpMe.style.animation = "jump ease-in-out 0.5s 1" : jumpMe.style.animation = "jump ease-in-out 0.8s 1";
        // jumpBar.style.animation="jumpBar ease-in-out 0.8s 1";
        onMobile ? delay = 500 : delay = 800;
        setTimeout(function () {
            jumpMe.style.animation = "";
            // jumpBar.style.animation="";
        }, delay);
        standingStill = true;
        j = 0;
    }
    else {
        standingStill = true;
        j = 0;
    }
    positionH = Number(positionH.substring(0, positionH.length - 2));
    // console.log(positionH);

    (!HeroGoingleft) ? imgH = "Hero/hero-right-" + j % 3 + ".png" : imgH = "Hero/hero-left-" + j % 3 + ".png";
    // console.log(img1);
    // position+=10;
    // console.log(HeroGoingleft);
    if (!standingStill) {
        standingStill = true;
        if ((positionH + speedH) <= width - 150 && !HeroGoingleft) {
            positionH = positionH + speedH;
            progressPositionH = progressPositionH + speedH;
            if (positionH === width - 150) {
                HeroGoingleft = true;
                heroImg.src = "Hero/hero-0-right.png"
            }
        }
        else {
            // console.log(positionH);//
            positionH = positionH - speedH;
            progressPositionH = progressPositionH - speedH;
            if (positionH <= 0) {
                HeroGoingleft = false;
                heroImg.src = "Hero/hero-0-left.png"
                positionH = 0;
                progressPositionH = 0;
            }
        }
    }
    if (positionH % 6 === 0) {
        j++;
    }
    heroImg.src = imgH;
    // console.log(position);
    lastHeroPosition = positionH;
    positionH += "px";
    progressPositionH += "px";
    // console.log(position);
    hero.style.left = positionH;
    heroProgress.style.left = progressPositionH;
}

function shoot() {
    let gun = document.querySelector(".gun");
    let bulletPosition = Number(lastHeroPosition);
    let gunImg = document.querySelector(".gunImg");
    gun.style.top=document.querySelector(".hero").style.top;
    let speedG = 80;
    alredyColided=false;
    // gun.classList.remove("hidden");
    // console.log(gun.style.visibility);
    gun.style.visibility = "visible";
    // console.log(gun.style.visibility);
    // gun.style.display = "inline-block";
    gun.style.left = bulletPosition;
    gun.style.left = bulletPosition + "px";
    if (!HeroGoingleft) {
        gun.style.animation = "GunRight linear 2s 1";
        gunImg.src = "Bullets/bullet-0.png";
    }
    else {
        gun.style.animation = "GunLeft linear 2s 1";
        gunImg.src = "Bullets/bullet-1.png";
    }
    setTimeout(() => {
        // gun.classList.add("hidden");
        gun.style.visibility="hidden";
        gun.style.animation="";
        gun.style.left=lastHeroPosition;
        gun.style.top="57vh";
        alredyFired=false;
        // gun.style.display="none";
    }, 2000);
}



//Mobile Coding Starts Here

let upButton = document.querySelector(".up");
let leftButton = document.querySelector(".left");
let rightButton = document.querySelector(".right");
let shootButton = document.querySelector(".shoot");

upButton.addEventListener("click", function () {
    moveHero(" ");
});
leftButton.addEventListener("click", function () {
    moveHero("a");
});
rightButton.addEventListener("click", function () {
    moveHero("d");
});
shootButton.addEventListener("click", function () {
    moveHero("v");
});

//touch sensetive area

let touchArea = document.querySelector(".arrows");
let oldX = 0, oldY = 0, newX, newY;
let shootElement = document.querySelector(".shoot");
touchArea.addEventListener("touchmove", function (e) {
    // setTimeout(() => {
    // console.log("even if you tuch this will only print after 1 second");

    // console.log("touch is in " + e.touches[0].clientX + " " + e.touches[0].clientY);
    newX = e.touches[0].clientX;
    newY = e.touches[0].clientY;
    if (newX > oldX && newY <= oldY + 50 && newY >= oldY - 50) {
        // console.log("here");
        moveHero("d");
    }
    else if (newX < oldX && newY <= oldY + 50 && newY >= oldY - 50) {
        // console.log("here");
        moveHero("a");
    }
    else if (newY > oldY && newX <= oldX + 50 && newX >= oldX - 50) {
        // console.log("here");
        moveHero(" ");
    }
    oldX = newX;
    oldY = newY;
    // }, 200);
});
shootElement.addEventListener("touchstart", function (ex) {
    // console.log("touch is in " + ex.touches[0].clientX + " " + ex.touches[0].clientY);
    oldX = ex.touches[0].clientX;
    oldY = ex.touches[0].clientY;
    shoot();
});

let enemyImg = document.querySelector(".enemyImg");
let enemy = document.querySelector(".enemy");
let animationSpeed = 15000;
// setInterval(() => {
//     // console.log("interval");
//     // console.log(enemyImg.src);
//     // if(enemy.style.right==="0vw"){
//     //     console.log("enemy is at 0vw");
//     //     enemyImg.src="Enemy/enemy-0.png";
//     // }
//     // else if(enemy.style.right==="95vw"){
//     //     console.log("enemy is at 95vw");
//     //     enemyImg.src="Enemy/enemy-1.png";
//     // }
//     if (enemyImg.src === "http://127.0.0.1:5500/Enemy/enemy-left-0.png") {
//         enemyImg.src = "Enemy/enemy-right-0.png";
//     }
//     else {
//         enemyImg.src = "Enemy/enemy-left-0.png";
//     }
// }, animationSpeed / 2);
upButton.addEventListener("click", function () {
    moveHero(" ");
});
leftButton.addEventListener("click", function () {
    moveHero("a");
});
rightButton.addEventListener("click", function () {
    moveHero("d");
});
shootButton.addEventListener("click", function () {
    moveHero("v");
});


// Enemy Running Code
let EnemyStanding = true;
let oldPosition=0;
let EnemygoingLeft=true;
setInterval(() => {
    // console.log("started");
    let progressEnemy= document.querySelector(".progressEnemy");
    let ej=0;
    // if (!EnemyStanding) {
        let speedE = 15;
        let tempImg;
        let positionE="";
        (!EnemygoingLeft) ? tempImg = "Enemy/enemy-right-" + ej % 3 + ".png" : tempImg = "Enemy/enemy-left-" + ej % 3 + ".png";

        let widthE = document.documentElement.clientWidth;
        // let positionE = enemy.style.right;
        positionE = Number(positionE.substring(0, positionE.length - 2));
        // console.log("initial position " + positionE);
        let progressPositionE = progressEnemy.style.right;
        // if (progressPositionE.substring(progressPositionE.length - 2) == " ") {
            // positionE = 10 - width;
            positionE = oldPosition;
            // progressPositionE = 10 - width;
            progressPositionE=oldPosition;
        // } else {
            // progressPositionE = Number(progressPositionE.substring(0, progressPositionE.length - 2));
        // }
        // console.log(progressPositionE);
        // console.log("firts bool "+EnemygoingLeft);
        if (EnemygoingLeft) {
            positionE = positionE + speedE;
            progressPositionE = progressPositionE + speedE;
            if ((positionE) >= (widthE-200)) {
                positionE=width-150;
                progressPositionE = widthE-150;
                EnemygoingLeft = false;
                // console.log("ifs bool "+ EnemygoingLeft);
                // console.log("take1");
                tempImg.src = "Enemy/enemy-right-0.png"
            }
        } 
        else if(!EnemygoingLeft) {
            // console.log("else bool "+ EnemygoingLeft);
            // console.log("position in right side "+positionE);
            positionE = positionE - speedE;
            // console.log(positionE);
            // progressPositionE = progressPositionE - speedE;
            if (positionE <= 50) {
                EnemygoingLeft = true;
                // console.log("take10");
                tempImg.src = "Enemy/enemy-left-0.png"
                positionE = 50;
                progressPositionE = 50;
            }
        }

        ej++;
        if (ej % 3 === 0) {
            ej = 0;
        }
        // positionE=progressPositionE;
        progressPositionE=positionE;
        oldPosition=positionE;
        // console.log(oldPosition,positionE);
        enemyImg.src = tempImg;
        positionE += "px";
        progressPositionE += "px";
        enemy.style.right = positionE;
        progressEnemy.style.right = progressPositionE;
        // console.log("ended" + positionE);
    // }
}, 100);

//Enemy Jumping code

setInterval(() => {
    // EnemyStanding = true;
    let jumpEnemy = (Math.floor(Math.random() * 15) >= 3) ? true : false;
    // console.log("Jump code: " + jumpEnemy);
    jumpEnemy=false;  //--------------->>>>>
    if (jumpEnemy) {
        let jumpEnemy = document.querySelector(".Enemys");
        if (!(jumpEnemy.style.animation)) {
            jumpEnemy.style.animation = "jump ease-in-out 0.8s 1";
            setTimeout(function () {
                jumpEnemy.style.animation = "";
            }, 1000);
        }
    }
    // console.log("interrupted");
    // EnemyStanding = false;
}, 1000);



// Gun and Collision Logic Goes Here
let gun= document.querySelector(".gun");
let enemyPos= document.querySelector(".enemy");
let enemydiv= document.querySelector(".Enemys");
let enemyHealth=document.querySelector("#ProgEnemy");
let playerpos= document.querySelector(".Heros");

setInterval(() => {
    let gunpos=gun.getBoundingClientRect();
    let enemypos=enemyPos.getBoundingClientRect();
// console.log(enemypos.top, enemypos.bottom-enemypos.top, gunpos.top, enemypos.right,enemypos.left);
if(gunpos.top <= enemypos.bottom && !alredyColided){
    // alert("Collision");
    if(gunpos.right >= enemypos.left-20 && gunpos.right <= enemypos.left+20){
        // alert("Collision");
        alredyColided=true;
        enemyHealth.value=Number(enemyHealth.value)-10;
        if(enemyHealth.value<=0){
            enemydiv.classList.add("hidden");
            document.querySelector(".winbox").classList.remove("hidden");
            document.querySelector(".winPage").classList.remove("hidden");
        }
        gun.style.left=playerpos.style.left;
        gun.style.animation="";
        alredyFired=false;
        gun.style.visibility="hidden";
        // console.log(Number(enemyHealth.value));
    }
}
},100);


function vanish(){
// let x=document.querySelector(".again").addEventListener("click",function(){
    // console.log("cl");
       document.querySelector(".winbox").classList.add("hidden");
       document.querySelector(".winPage").classList.add("hidden");
    //   let e= document.querySelector(".Enemys").classList.remove("hidden");
    //   e.style.right="0px";
    enemydiv.classList.remove("hidden");
    enemyHealth.value="100";
    enemyPos.style.right="0px";
    oldPosition=0;
    playerpos.style.left="0px";
    document.querySelector(".hero").style.left="0px";
    document.querySelector(".progressHero").style.left="0px";
    // lastHeroPosition="0";

    //    document.querySelector(".winPage").style.visibility="hidden";
}




// to-do
//gun should be fired even in mid air
//NAN means ke ema pixel aavta hache check karva