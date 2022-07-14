'use Strict';
let goingLeft = true;
let i = 0;
let j = 0;
let HeroGoingleft = false;

//Laptop Coding Starts Here

console.log(document.documentElement.clientWidth);

let width=document.querySelector(".score-heading");
width.textContent="Width is "+document.documentElement.clientWidth;

document.addEventListener("DOMContentLoaded", function () {
    //   if(e.key==="w"){
    // console.log("dom contant loaded");
    // moveEnemy();
    //   }
});

document.addEventListener("keydown", function (e) {
    moveHero(e.key);
});

function moveHero(key) {
    let standingStill = false;
    let shooting = false;
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
        shooting = true;
    }
    else if (key === " "){
        let jumpMe=document.querySelector(".hero");
        let jumpBar=document.querySelector(".progressHero");
        jumpMe.style.animation="jump ease-in-out 0.8s 1";
        jumpBar.style.animation="jumpBar ease-in-out 0.8s 1";
        setTimeout(function(){
            jumpMe.style.animation="";
            jumpBar.style.animation="";
        },1000);
        standingStill= true;
        j= 0;
    }
    else {
        standingStill = true;
        j = 0;
    }


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
            positionH = positionH - speedH;
            progressPositionH = progressPositionH - speedH;
            if (positionH <= 0) {
                HeroGoingleft = false;
                heroImg.src = "Hero/hero-0-left.png"
            }
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
    if(shooting){
        shooting=false;
        shoot(positionH.substring(0,positionH.length-2));
    }
}

function shoot(gunPosition){
    let gun=document.querySelector(".gun");
    let bulletPosition=Number(gunPosition);
    let gunImg=document.querySelector(".gunImg");
    let speedG=80;
    gun.classList.remove("hidden");
    gun.style.left = bulletPosition;
    gun.style.left = bulletPosition + "px";
    if(!HeroGoingleft){
        gun.style.animation="GunRight linear 2s 1";
        gunImg.src="Bullets/bullet-0.png";
    }
    else{
        gun.style.animation="GunLeft linear 2s 1";
        gunImg.src="Bullets/bullet-1.png";
    }
    setTimeout(function(){
        gun.classList.add("hidden");
    },2000);
}

//Mobile Coding Starts Here

let upButton=document.querySelector(".up");
let leftButton=document.querySelector(".left");
let rightButton=document.querySelector(".right");
let shootButton=document.querySelector(".shoot");

upButton.addEventListener("click",function(){
    moveHero(" ");
});
leftButton.addEventListener("click",function(){
    moveHero("a");
});
rightButton.addEventListener("click",function(){
    moveHero("d");
});
shootButton.addEventListener("click",function(){
    moveHero("v");
});
