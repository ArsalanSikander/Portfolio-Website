// var sign = document.getElementById('one');
// var sign1 = document.getElementById('two');
// var sign2 = document.getElementById('three');
// var sign3 = document.getElementById('four');
// var sign4 = document.getElementById('five');
// var sign5 = document.getElementById('six');


let animationFrameId = null;
let limit = document.documentElement.scrollHeight - window.innerHeight;
let scrollPos = window.scrollY;
let scrollVel = 0;
const decel = 0.9;
const minVel = 0.2;
const springStiffness = 0.1;
const springDamping = 0.6;

function updateScroll() {

    if (scrollPos <= 100) {
        // sign1.innerHTML = "Top zone";
        scrollVel += springStiffness * (100 - scrollPos);
        scrollVel *= springDamping;
    }
    else if (scrollPos <= limit - 100) {
        // sign1.innerHTML = "Middle";
        scrollVel *= decel;
    }
    else {
        // sign1.innerHTML = "Bottom zone";
        scrollVel -= springStiffness * (100 - (limit - scrollPos));
        scrollVel *= springDamping;

    }

    scrollPos += scrollVel;
    scrollPos = Math.max(0, Math.min(scrollPos, limit));
    window.scrollTo(0, scrollPos);

    if (Math.abs(scrollVel) > minVel) {
        animationFrameId = requestAnimationFrame(updateScroll);
    }
    else {
        scrollVel = 0;
        animationFrameId = null;
        // sign5.innerHTML = "No Movement";
    }

}

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
window.onload = () => {
    setInterval(() => {
        loader.style.display = "none";
    }, 500)
}

// Carousel related code

let projectsArr = [{
    name: "Jobhive",
    desc: "My Final Year Project, which is a hiring platform.."
}, {
    name: "Space tourism Website",
    desc: "Fully responsive ReactJS website created as the frontend of a tourism service."
},
{
    name: "Project 3",
    desc: "..."
},
{
    name: "Project 4",
    desc: "..."
}];

let e1 = document.getElementById('e1')
let item1 = document.getElementById('item1');
let item2 = document.getElementById('item2');
let item3 = document.getElementById('item3');
let e2 = document.getElementById('e2')


let currItem = 0;
let prevItem, nextItem;

let dir = "next";  // ?


// number provided indicates the next element to show (num >= 1 means next, num < 1 means previous element)
function useCarousel(num) {
    if (num >= 1) {
        dir = "next";
        item3.className = "hiddenL";
        item1.className = "left";
        item2.className = "center";
        e2.className = "right"
    }
    else {
        dir = "prev";
        e1.className = "left";
        item3.className = "center";
        item1.className = "right";
        item2.className = "hiddenR";
    }
}

item1.addEventListener('transitionend', (event) => {
    if (event.propertyName === 'transform') {
        if (dir === 'next') {

            currItem = currItem + 1 > projectsArr.length - 1 ? 0 : currItem + 1;
            item1.innerHTML = projectsArr[currItem].name;

            nextItem = currItem + 1 > projectsArr.length - 1 ? 0 : currItem + 1;
            item2.innerHTML = projectsArr[nextItem].name;

            prevItem = currItem - 1 < 0 ? projectsArr.length - 1 : currItem - 1;
            item3.innerHTML = projectsArr[prevItem].name;


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


            e1.className = "snapLeftMost";
            item3.className = 'snapLeft';
            item1.className = "snapCenter";
            item2.className = "snapRight";

        }
    }

})