'use Strict';
let goingLeft = true;
let i = 0;
let j = 0;
let HeroGoingleft = false;
let version = "1.3.2"
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
    else if (key === "v") {
        standingStill = true;
        shooting = false;
        if (document.querySelector(".gun").classList.contains("hidden")) {
            shoot(positionH.substring(0, positionH.length - 2)); //100px -> 100
        }
    }
    else if (key === " ") {
        let jumpMe = document.querySelector(".Heros");
        let delay = 800;
        // let jumpBar=document.querySelector(".progressHero");
        (onMobile) ? jumpMe.style.animation = "jump ease-in-out 0.1s 1" : jumpMe.style.animation = "jump ease-in-out 0.8s 1";
        // jumpBar.style.animation="jumpBar ease-in-out 0.8s 1";
        onMobile ? delay = 100 : delay = 800;
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
    let speedG = 80;
    gun.classList.remove("hidden");
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
        gun.classList.add("hidden");
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
    console.log("even if you tuch this will only print after 1 second");

    console.log("touch is in " + e.touches[0].clientX + " " + e.touches[0].clientY);
    newX = e.touches[0].clientX;
    newY = e.touches[0].clientY;
    if (newX > oldX && newY <= oldY + 50 && newY >= oldY - 50) {
        console.log("here");
        moveHero("d");
    }
    else if (newX < oldX && newY <= oldY + 50 && newY >= oldY - 50) {
        console.log("here");
        moveHero("a");
    }
    else if (newY > oldY && newX <= oldX + 50 && newX >= oldX - 50) {
        console.log("here");
        moveHero(" ");
    }
    oldX = newX;
    oldY = newY;
    // }, 200);
});
shootElement.addEventListener("touchstart", function (ex) {
    console.log("touch is in " + ex.touches[0].clientX + " " + ex.touches[0].clientY);
    oldX = ex.touches[0].clientX;
    oldY = ex.touches[0].clientY;
    shoot();
});

let enemyImg = document.querySelector(".enemyImg");
let enemy = document.querySelector(".enemy");
let animationSpeed = 15000;
setInterval(() => {
    // console.log("interval");
    // console.log(enemyImg.src);
    // if(enemy.style.right==="0vw"){
    //     console.log("enemy is at 0vw");
    //     enemyImg.src="Enemy/enemy-0.png";
    // }
    // else if(enemy.style.right==="95vw"){
    //     console.log("enemy is at 95vw");
    //     enemyImg.src="Enemy/enemy-1.png";
    // }
    if (enemyImg.src === "http://127.0.0.1:5500/Enemy/enemy-left-0.png") {
        enemyImg.src = "Enemy/enemy-right-0.png";
    }
    else {
        enemyImg.src = "Enemy/enemy-left-0.png";
    }
}, animationSpeed / 2);
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

setInterval(() => {

    if (!EnemyStanding) {
        let speedE = -100;
        let tempImg;
        (!goingLeft) ? tempImg = "Hero/hero-right-" + ej % 3 + ".png" : tempImg = "Hero/hero-left-" + ej % 3 + ".png";

        let width = document.documentElement.clientWidth;
        let positionE = enemyCh.style.right;
        positionE = Number(positionE.substring(0, positionE.length - 2));
        let progressPositionE = progressEnemy.style.right;
        if (progressPositionE.substring(progressPositionE.length - 2) == "") {
            positionE = 10 - width;
            progressPositionE = 10 - width;
        } else {
            progressPositionE = Number(progressPositionE.substring(0, progressPositionE.length - 2));
        }

        if (width + (positionE + speedE) >= 10 && !goingLeft) {
            positionE = positionE + speedE;
            progressPositionE = progressPositionE + speedE;
            if ((width + positionE) <= 100) {
                goingLeft = true;
                tempImg.src = "Hero/hero-right-0.png"
            }
        } else {
            positionE = positionE - speedE;
            progressPositionE = progressPositionE - speedE;
            if (positionE > -100) {
                goingLeft = false;
                tempImg.src = "Hero/hero-left-0.png"
                positionE = -100;
                progressPositionE = -100;
            }
        }

        ej++;
        if (ej % 3 === 0) {
            ej = 0;
        }
        enemyImg.src = tempImg;
        positionE += "px";
        progressPositionE += "px";
        enemyCh.style.right = positionE;
        progressEnemy.style.right = progressPositionE;
    }
}, 1000);

//Enemy Jumping code

setInterval(() => {
    EnemyStanding = true;
    let jumpEnemy = (Math.floor(Math.random() * 10) >= 3) ? true : false;
    // console.log("Jump code: " + jumpEnemy);
    if (jumpEnemy) {
        let jumpEnemy = document.querySelector(".Enemys");
        if (!(jumpEnemy.style.animation)) {
            jumpEnemy.style.animation = "jump ease-in-out 0.8s 1";
            setTimeout(function () {
                jumpEnemy.style.animation = "";
            }, 1000);
        }
    }
    EnemyStanding = false;
}, 5000);
