const leftDoor = document.getElementById("leftDoor");
const rightDoor = document.getElementById("rightDoor");
const specimenSelect = document.getElementById("specimen");
const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");
const stepValue = document.getElementById("step-value");
const timestep = document.getElementById("time-step");
const startTxt = document.getElementById("start-txt");
const btnStartUp = document.getElementById("btn-start-up");
const btnStartDw = document.getElementById("btn-start-dw");

const endTxt = document.getElementById("end-txt");
const btnEndUp = document.getElementById("btn-end-up");
const btnEndDw = document.getElementById("btn-end-dw");

const sample = document.getElementById("circle");

const detectorRay = document.querySelector(".detector-ray");
const sourceRay = document.getElementById("source-ray");

const startAnimationButton = document.getElementById('btn-start-scan');
const shutterButton = document.getElementById("shutter");

specimenSelect.disabled = false;
sample.style.display = "none";
sourceRay.style.display = "none";
detectorRay.style.display = "none";

const textElement = document.getElementById("instructions-text");
var text = "Welcome to the simulation of XRD. Please select the specimen.";

function typeWriter(text, element) {
    let index = 0;
    const speed = 50; // Adjust the typing speed (milliseconds per character)

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Call the typewriter function
typeWriter(text, textElement);



specimenSelect.addEventListener("change", function () {



    if (specimenSelect.value !== "") {
        specimenSelect.disabled = true;

        textElement.textContent = "";
        text = "Now Click on 'OPEN' Button. ";
        typeWriter(text, textElement);

    } else {
        specimenSelect.disabled = false;
    }
    openButton.disabled = false;

});

// Enable "CLOSE" button and disable "OPEN" button when "OPEN" is clicked
openButton.addEventListener("click", function () {

    leftDoor.classList.add("opened");
    rightDoor.classList.add("opened");

    openButton.disabled = true;
    setTimeout(function () {
        sample.style.display = "block";
        sample.style.animation = "moveSample 2s backwards";
        closeButton.disabled = false;

        textElement.textContent = "";
        text = "Now Click on 'CLOSE' Button. ";
        typeWriter(text, textElement);

    }, 2000);


});

// Enable "OPEN" button and disable "CLOSE" button when "CLOSE" is clicked
closeButton.addEventListener("click", function () {
    leftDoor.classList.remove("opened");
    rightDoor.classList.remove("opened");
    standbyButton.disabled = false;

    textElement.textContent = "";
    text = "Now Click on 'STANDBY/ON' Button. ";
    typeWriter(text, textElement);

});



//  XRD TUBE ====

function animateValues() {
    const kvValue = document.getElementById("kv-val");
    const maValue = document.getElementById("ma-val");

    let kv = 10;
    let ma = 10;

    const kvTarget = 45;
    const maTarget = 40;

    const incrementStep = 5;
    const intervalDelay = 1000;

    const kvInterval = setInterval(function () {
        if (kv < kvTarget) {
            kv += incrementStep;
            kvValue.textContent = kv;
        } else {
            clearInterval(kvInterval);
        }
    }, intervalDelay);

    const maInterval = setInterval(function () {
        if (ma < maTarget) {
            ma += incrementStep;
            maValue.textContent = ma;


        } else {
            clearInterval(maInterval);
        }
    }, intervalDelay);
}

const standbyButton = document.getElementById("btn-standby");
standbyButton.addEventListener("click", function () {

    animateValues();
    standbyButton.disabled = true;
    btnStartDw.disabled = false;
    btnStartUp.disabled = false;

    setTimeout(function () {
        textElement.textContent = "";
        text = "Set the Start Angle and End Angle.";
        typeWriter(text, textElement);
    }, 4000);

});


// ==== SCAN SETTING ====


let angle = 5;

function updateAngle() {

    btnEndDw.disabled = false;
    btnEndUp.disabled = false;

    startTxt.textContent = angle + "°";


}


btnStartDw.addEventListener("click", function () {

    angle += 5;

    const maxAngle = 90;

    if (angle > maxAngle) {
        angle = maxAngle;
    }


    updateAngle();
});


btnStartUp.addEventListener("click", function () {

    angle -= 5;


    if (angle < 5) {
        angle = 5;
    }


    updateAngle();
    statsend.disabled = false;
});


let endangle = 80;

function updateEndAngle() {
    stepValue.disabled = false;
    endTxt.textContent = endangle + "°";
}

btnEndUp.addEventListener("click", function () {

    endangle -= 5;

    if (endangle < 5) {
        endangle = 5;
    }

    updateEndAngle();

    textElement.textContent = "";
    text = "Select the Step size. ";
    typeWriter(text, textElement);
});


btnEndDw.addEventListener("click", function () {

    endangle += 5;


    if (endangle > 160) {
        endangle = 160;
    }

    

    updateEndAngle();

    textElement.textContent = "";
    text = "Select the Step size. ";
    typeWriter(text, textElement);
});


// ==== STEP VALUE ====
stepValue.addEventListener("change", function () {
    btnStartDw.disabled = true;
    btnStartUp.disabled = true;
    btnEndDw.disabled = true;
    btnEndUp.disabled = true;
    stepValue.disabled = true;
    timestep.disabled = false;
    sourceRay.style.display = "block";
    detectorRay.style.display = "block";

    textElement.textContent = "";
    text = "Select the Scan Rate. ";
    typeWriter(text, textElement);

});

timestep.addEventListener("change", function () {
    timestep.disabled = true;
    startAnimationButton.disabled = false;
    textElement.textContent = "";
    text = "Click on 'START SCAN' Button. ";
    typeWriter(text, textElement);
})



const stepValueSelect = document.getElementById("step-value");
const timeStepSelect = document.getElementById("time-step");
const scanTimeValue = document.getElementById("scantime-val");

stepValueSelect.addEventListener("change", calculateScanTime);
timeStepSelect.addEventListener("change", calculateScanTime);

function calculateScanTime() {
    const startAngle = parseFloat(startTxt.textContent); // Get the start angle
    const endAngle = parseFloat(endTxt.textContent); // Get the end angle
    const stepValue = parseFloat(stepValueSelect.value); // Get the step value in degrees per step
    const timeStep = parseFloat(timeStepSelect.value); // Get the time step in degrees per second

    const numSteps = Math.ceil((endAngle - startAngle) / stepValue);

    const scanTimeSeconds = numSteps / timeStep;

    scanTimeValue.textContent = scanTimeSeconds.toFixed(2) + " seconds";
}

calculateScanTime();


// ==== SCAN BUTTON ====


startAnimationButton.addEventListener('click', function () {


    shutterButton.style.backgroundColor = "rgb(236, 208, 200)";
    shutterButton.style.borderColor = "rgb(236, 208, 232)";
    shutterButton.style.color = "rgb(216, 27, 74)";
    shutterButton.style.boxShadow = "5px 5px 30px 5px  rgb(218, 172, 213)";
    shutterButton.textContent = "OPEN";

    const detector = document.getElementById("detector");
    const source = document.getElementById("source");



    detectorRay.style.animationName = "rotateFromZeroToNeg45"
    sourceRay.style.animationName = "rotateFromZeroToPos45";

    source.style.animationName = "moveUpDown";
    detector.style.animationName = "oppMoveUpDown";
    setTimeout(function () {

        sourceRay.style.animationName = "rotateFromPos45ToZero";
        detectorRay.style.animationName = "rotateFromNeg45ToZero";

        source.style.animationName = "moveUpDownZeroToDown";
        detector.style.animationName = "oppMoveUpDownZeroToDown";
    }, 5000);

    setTimeout(function () {
        sourceRay.style.animationName = "rotateFromZeroToPos25";
        detectorRay.style.animationName = "rotateFromZeroToNeg25";

        source.style.animationName = "moveUpDownToOriginal ";
        detector.style.animationName = "oppMoveUpDownToOriginal";
    }, 10000);


    setTimeout(function () {
        shutterButton.style.backgroundColor = "rgb(179, 215, 179)";
        shutterButton.style.borderColor = "rgb(179, 215, 179)";
        shutterButton.style.color = "rgb(3, 94, 3)";
        shutterButton.style.boxShadow = "5px 5px 20px 5px  rgb(170, 217, 170)";
        shutterButton.textContent = "CLOSED";
    }, 15000);

});
