let animationFrameId = null;
let limit = 0;
let scrollPos = 0;
let scrollVel = 0;
const decel = 0.9;
const minVel = 10;
const springStiffness = 0.12;
const springDamping = 0.6;
const pageCont = document.querySelector('#pageCont');
let place; // measures item2's current position

function updateScrollLimit() {
    if (pageCont) {
        limit = pageCont.scrollHeight - window.innerHeight;
        if (limit < 0) {
            limit = 0;
        }
        // console.log("Updated scroll limit: ", limit);
    }
}


function updateScroll() {

    updateScrollLimit();

    if (scrollPos <= 100) {
        scrollVel += springStiffness * (100 - scrollPos);
        scrollVel *= springDamping;
    }
    else if (scrollPos <= limit - 100) {
        scrollVel *= decel;
    }
    else {
        scrollVel -= springStiffness * (100 - (limit - scrollPos));
        scrollVel *= springDamping;

    }

    scrollPos += scrollVel;
    scrollPos = Math.max(0, Math.min(scrollPos, limit));
    pageCont.style.transform = `translateY(${-scrollPos}px)`;
    // window.scrollTo(0, scrollPos);

    place = item2.getBoundingClientRect();
    console.clear();
    console.log("Coords: " + place.top + " + " + place.left + " "); // this one changes, so it scrolls 
    // console.log("Coords: " + (place.top + scrollPos) + " + " + (place.left) + " ");


    if (Math.abs(scrollVel) > minVel) {
        animationFrameId = requestAnimationFrame(updateScroll);
    }
    else {
        scrollVel = 0;
        animationFrameId = null;
    }

}

let scrollSrc = document.getElementById('scrollSrc');

document.addEventListener('wheel', (event) => {
    event.preventDefault();

    if (Math.abs(event.deltaY) > 5) {
        // sign4.innerHTML = "Event firing!";
        // sign5.innerHTML = "Movement Happening!";
    }
    else {
        // sign4.innerHTML = "No Event";
    }

    scrollVel += event.deltaY / 8;

    if (animationFrameId === null) {
        // scrollPos = window.scrollY;
        animationFrameId = requestAnimationFrame(updateScroll);
    }

}, { passive: false });


let loader = document.getElementById('loader');
let niceEffect = document.getElementById('niceObj');
let starImg = document.getElementById('starImg');
let width = screen.width;
let height = document.documentElement.scrollHeight;
let gridSize = (7 * 16) / 2;
let widthDivisions = width / gridSize;
let heightDivisions = height / gridSize;

const rotateAnim = [
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(180deg)' }
];

const sizeAnim = [
    { transform: 'scale(1)' },
    { transform: 'scale(1.3)' },
    { transform: 'scale(1)' }
];

const colorAnim = [
    { backgroundColor: 'rgba(8,8,8,1)' },
    { backgroundColor: 'rgb(255, 178, 178)' },
    { backgroundColor: 'rgb(200, 255, 193)' },
    { backgroundColor: 'rgb(191, 188, 255)' },
    { backgroundColor: 'rgba(8,8,8,1)' }
]

const animationOptions = {
    duration: 2000,
    easing: 'cubic-bezier(.74,0,.2,1)',
    composite: 'add',   // allows the animations to run together (add onto each other)
}



window.onload = () => {

    updateScrollLimit();

    pageCont.style.transform = `translateY(0px)`; // Ensure this line runs

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    setInterval(() => {
        let verticalOffset = (Math.random() * heightDivisions + 1).toFixed() * gridSize;
        let horizontalOffset = (Math.random() * widthDivisions + 1).toFixed() * gridSize;
        // move the star
        niceEffect.style.top = `${verticalOffset - 11}px`;
        niceEffect.style.left = `${horizontalOffset - 11}px`;
        // play animation again
        niceEffect.animate(rotateAnim, animationOptions);
        niceEffect.animate(sizeAnim, animationOptions);
        starImg.animate(colorAnim, animationOptions);
    }, 2000);

}

// Carousel related code

let projectsArr = [{
    name: "Jobhive",
    desc: "My Final Year Project, which aims to make job-seeking and hiring easier. It provides live market statistics to jobseeker, along with aggregated job listings and a standard resume format. Recruiters can create simple coding tests for their jobs postings, allowing them to narrow their Resume collection. Further, AI interviews can be set, after which an interview score is generated. Additionally, freelance projects can be posted by clients, and collaboration can take place using a ticketing system (with chat). Jobhive aims to provide a central platform to streamline these processes.",
    src: './jobhiveBanner.JPG'
}, {
    name: "Space tourism Website",
    desc: "Fully responsive ReactJS website created as the frontend of a conceptual Tourism Service. As part of the Frontend Mentor Challenge series i attempted.",
    src: ''
},
{
    name: "Project 3",
    desc: "...",
    src: ''
},
{
    name: "Project 4",
    desc: "...",
    src: ''
}];


let e1 = document.getElementById('e1');
let item1 = document.getElementById('item1');
let item2 = document.getElementById('item2');
let item3 = document.getElementById('item3');
let e2 = document.getElementById('e2');


let pendingClicks = 0;
let currItem = 0;
let prevItem, nextItem, eItem1, eItem2;
let dir = "next";


// old function for adding innerHTML
function initialiseCarousel() {
    currItem = currItem + 1 > projectsArr.length - 1 ? 0 : currItem + 1;
    item1.innerHTML = projectsArr[currItem].name;

    nextItem = currItem + 1 > projectsArr.length - 1 ? 0 : currItem + 1;
    item2.innerHTML = projectsArr[nextItem].name;

    prevItem = currItem - 1 < 0 ? projectsArr.length - 1 : currItem - 1;
    item3.innerHTML = projectsArr[prevItem].name;

    eItem2 = nextItem + 1 > projectsArr.length - 1 ? 0 : nextItem + 1;
    e2.innerHTML = projectsArr[eItem2].name;
}

let innerContentArr = [];

function generateCarouselInnerContent() {
    let currInner;
    for (let item in projectsArr) {
        currInner = document.createElement('div');
        currInner.className = "carouselItem";
        let img = document.createElement(img);
        img.src = item.src;
        innerContentArr.push(currInner);
    }
}

// initialiseCarousel();

let clicks = document.getElementById('clicks');
let dirShower = document.getElementById('dir');
clicks.innerHTML = pendingClicks;

// number provided indicates the next element to show (num >= 1 means next, num < 1 means previous element)

function triggerAnimation(num) {
    if (num >= 1) {
        dir = "next";
        item3.className = "hiddenL"; item3.style.setProperty('--move-duration', `${(0.3 / pendingClicks)}s`);
        item1.className = "left"; item1.style.setProperty('--move-duration', `${(0.3 / pendingClicks)}s`);
        item2.className = "center"; item2.style.setProperty('--move-duration', `${(0.3 / pendingClicks)}s`);
        e2.className = "right"; e2.style.setProperty('--move-duration', `${(0.3 / pendingClicks)}s`);
    }
    else {
        dir = "prev";
        e1.className = "left"; e1.style.setProperty('--move-duration', `${(0.3 / pendingClicks)}s`);
        item3.className = "center"; item3.style.setProperty('--move-duration', `${(0.3 / pendingClicks)}s`);
        item1.className = "right"; item1.style.setProperty('--move-duration', `${(0.3 / pendingClicks)}s`);
        item2.className = "hiddenR"; item2.style.setProperty('--move-duration', `${(0.3 / pendingClicks)}s`);
    }
}

function useCarousel(num) {
    pendingClicks++;
    clicks.innerHTML = pendingClicks;
    triggerAnimation(num);
}

item1.addEventListener('transitionend', (event) => {
    if (event.propertyName === 'transform' && event.target.id === 'item1') {
        pendingClicks--;
        clicks.innerHTML = pendingClicks;
        dirShower.innerHTML = dir;
        if (dir === 'next') {

            currItem = currItem + 1 > projectsArr.length - 1 ? 0 : currItem + 1;
            item1.innerHTML = projectsArr[currItem].name;

            nextItem = currItem + 1 > projectsArr.length - 1 ? 0 : currItem + 1;
            item2.innerHTML = projectsArr[nextItem].name;

            prevItem = currItem - 1 < 0 ? projectsArr.length - 1 : currItem - 1;
            item3.innerHTML = projectsArr[prevItem].name;

            eItem2 = nextItem + 1 > projectsArr.length - 1 ? 0 : nextItem + 1;
            e2.innerHTML = projectsArr[eItem2].name;


            item3.className = 'snapLeft';
            item1.className = "snapCenter";
            item2.className = "snapRight";
            e2.className = "snapRightMost";

        }
        else if (dir === "prev") {

            currItem = currItem - 1 < 0 ? projectsArr.length - 1 : currItem - 1;
            item1.innerHTML = projectsArr[currItem].name;

            nextItem = currItem + 1 > projectsArr.length - 1 ? 0 : currItem + 1;
            item2.innerHTML = projectsArr[nextItem].name;

            prevItem = currItem - 1 < 0 ? projectsArr.length - 1 : currItem - 1;
            item3.innerHTML = projectsArr[prevItem].name;

            eItem1 = prevItem - 1 < 0 ? projectsArr.length - 1 : prevItem - 1;
            e1.innerHTML = projectsArr[eItem1].name;


            e1.className = "snapLeftMost";
            item3.className = 'snapLeft';
            item1.className = "snapCenter";
            item2.className = "snapRight";

        }

        if (pendingClicks > 0) {
            setTimeout(() => { // this setTimeout defers/accrues the call of triggerAnimation to when current operations are complete.
                // those current operations being the setting of the snapClasses. It will do those first then run triggerAnimation
                if (dir === 'next') {
                    triggerAnimation(1);
                }
                else {
                    triggerAnimation(0)
                }
            }, 0)
        }
    }
})



const blurDiv = document.getElementById('blur');
const projInfo = document.getElementById('projectInfo');

function showInfo() {

    place = item2.getBoundingClientRect();
    let yPos = place.top - 21;
    let displace = (((0.4 * window.screen.width) - (item2.offsetWidth)) / -2) + place.left;

    const expandAnim = [
        { height: item2.style.height, width: `${item2.offsetWidth}px`, transform: `translate(${place.left}px, ${yPos}px)` },
        { height: '45vh', width: '40vw', transform: `translate(${displace}px, ${yPos}px)` }
    ]

    projInfo.style.display = "block";
    projInfo.style.zIndex = "51";
    projInfo.animate(expandAnim, {
        duration: 300,
        easing: 'ease',
        fill: 'forwards'
    })
    blurDiv.style.display = "block";

}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeInfo();
    }
    switch (event.key) {
        case ('Escape'):
            closeInfo();
            break;
        case ('ArrowLeft'):
            useCarousel(1);
            break;
        case ('ArrowRight'):
            useCarousel(0);
            break;

    }
})

function closeInfo() {
    projInfo.style.display = "none";
    blurDiv.style.display = "none";
}