'use Strict';
let goingLeft = true;
let i = 0;
let j = 0;
let HeroGoingleft = false;

function moveEnemy() {
    let speed = 5;
    let enemy = document.querySelector(".enemy");
    let enemyImg = document.querySelector(".enemyImg");
    let enemyProgress = document.querySelector(".progressEnemy");
    let width = document.documentElement.clientWidth;
    position = enemy.style.right;
    progressPosition = enemyProgress.style.right;
    position = Number(position.substring(0, position.length - 2));
    progressPosition = Number(progressPosition.substring(0, progressPosition.length - 2));
    // console.log(position);

    let img1 = "Enemy/enemy-left-1.png";

    (goingLeft) ? img1 = "Enemy/enemy-left-" + i % 3 + ".png" : img1 = "Enemy/enemy-right-" + i % 3 + ".png";
    // console.log(img1);
    // position+=10;
    if ((position + speed) <= width - 50 && goingLeft) {
        position = position + speed;
        progressPosition = progressPosition + speed;
        if (position === width - 50) {
            goingLeft = false;
            enemyImg.src = "Enemy/enemy-0-right.png"
        }
    }
    else {
        position = position - speed;
        progressPosition = progressPosition - speed;
        if (position === 0) {
            goingLeft = true;
            enemyImg.src = "Enemy/enemy-0-left.png"
        }
    }
    if (position % 6 === 0) {
        i++;
    }
    enemyImg.src = img1;
    // console.log(position);
    position += "px";
    progressPosition += "px";
    // console.log(position);
    enemy.style.right = position;
    enemyProgress.style.right = progressPosition;
}

document.addEventListener("mousemove", function () {
    //   if(e.key==="w"){
    moveEnemy();
    //   }
});

document.addEventListener("keydown", function (e) {
    moveHero(e.key);
});

function moveHero(key) {
    let speedH = 10;
    let hero = document.querySelector(".hero");
    let heroImg = document.querySelector(".heroImg");
    let heroProgress = document.querySelector(".progressHero");
    let width = document.documentElement.clientWidth;
    positionH = hero.style.left;
    progressPositionH = heroProgress.style.left;
    positionH = Number(positionH.substring(0, positionH.length - 2));
    progressPositionH = Number(progressPositionH.substring(0, progressPositionH.length - 2));
    // console.log(position);

    let imgH = "Hero/hero-left-1.png";

    // if(key==="")

    (!HeroGoingleft) ? imgH = "Hero/hero-right-" + j % 3 + ".png" : imgH = "Hero/hero-left-" + j % 3 + ".png";
    // console.log(img1);
    // position+=10;
    // console.log(HeroGoingleft);
    if ((positionH + speedH) <= width - 150 && !HeroGoingleft) {
        positionH = positionH + speedH;
        progressPositionH = progressPositionH + speedH;
        if (positionH === width - 150) {
            HeroGoingleft = true;
            heroImg.src = "Hero/hero-0-right.png"
        }
    }
    else {
        positionH = positionH - speedH;
        progressPositionH = progressPositionH - speedH;
        if (positionH <= 0) {
            HeroGoingleft = false;
            heroImg.src = "Hero/hero-0-left.png"
        }
    }
    if (positionH % 6 === 0) {
        j++;
    }
    heroImg.src = imgH;
    // console.log(position);
    positionH += "px";
    progressPositionH += "px";
    // console.log(position);
    hero.style.left = positionH;
    heroProgress.style.left = progressPositionH;
}