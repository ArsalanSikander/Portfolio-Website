let scrollPos = window.scrollY;
let scrollVel = 0;
let animationFrameId = null; // which animation frame are we on

let deceleration = 0.9; // 0.95 is slippery, 0.3 is rough
let minVel = 0.1; // run on effect when at lower speeds.
var sign = document.getElementById('one');
var sign1 = document.getElementById('two');
var sign2 = document.getElementById('three');
var sign3 = document.getElementById('four');
var sign4 = document.getElementById('five');
var sign5 = document.getElementById('six');
let limit = document.documentElement.scrollHeight - window.innerHeight;
let stickyRegionSize = 0.2;
let stickyness;

let springStiffness = 0.2;

function updateScroll() {

    // decelerate in normal region
    if (scrollPos > 100) {
        scrollVel *= deceleration; // deceleration only in non springy section
        sign4.innerHTML = "Decelerating!";
    }
    else {
        sign4.innerHTML = "No Decel";
    }

    scrollPos += scrollVel;

    // debug
    sign.innerHTML = "Pos: " + scrollPos.toString().substring(0, 3)
    sign1.innerHTML = "Vel: " + scrollVel.toString().substring(0, 3);
    sign2.innerHTML = "Acc: " + deceleration.toString().substr(0, 3);
    sign3.innerHTML = "Spring: No";


    scrollPos = Math.max(0, Math.min(scrollPos, limit));

    // spring region logic
    if (scrollPos <= 100) {
        sign3.innerHTML = "Springing!"
        scrollVel += springStiffness * (100 - scrollPos);
        if ((Math.abs(scrollVel) < minVel)) {
            scrollVel = 0;
            window.scrollTo(0, scrollPos);
        }
    }
    else {
        if(sign3.innerHTML === "Springing!" && scrollVel < 0){
            scrollVel = 0;
        }
        sign3.innerHTML = "Spring: No";

    }


    // now scroll
    window.scrollTo(0, scrollPos);

    // when there's enough velocity or we havent reached the target yet, keep moving
    if ((Math.abs(scrollVel) > minVel)) {
        animationFrameId = requestAnimationFrame(updateScroll);
    }
    else {
        // stop if below these thresholds
        scrollVel = 0;
        animationFrameId = null;
        window.scrollTo(0, scrollPos);
    }
}

window.addEventListener('wheel', (event) => {

    event.preventDefault();

    if (event.deltaY != 0) {
        sign5.innerHTML = "Event firing!";
    }
    else {
        sign5.innerHTML = "No event firing";
    }

    // trigger movement using mouse change
    scrollVel += event.deltaY / 8;

    // if animation not happening then start
    if (animationFrameId === null) {
        scrollPos = window.scrollY;
        animationFrameId = requestAnimationFrame(updateScroll);
    }

}, { passive: false })


// if (window.scrollY >= limit * (1-stickyRegionSize)) {
//     stickyness = 1-((1-(window.scrollY/limit))/stickyRegionSize);
//     sign.innerHTML = "Below: " + stickyness.toString().substring(0,3);
//     deceleration = 0.99 - (0.9 * stickyness);
// }
// else if (window.scrollY <= limit * stickyRegionSize) {
//     stickyness = 1-((window.scrollY/limit)/stickyRegionSize)
//     deceleration = 0.99 - (0.9 * stickyness);
//     sign.innerHTML = "Top: " + (1-((window.scrollY/limit)/stickyRegionSize)).toString().substring(0,3) + "  Dec: " + deceleration ;
// }
// else {
//     deceleration = 1;
//     sign.innerHTML = "Middle";
// }