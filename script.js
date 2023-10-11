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
const graph = document.getElementById('graph-output');

const onButton = document.getElementById("machineOnButton");
const offButton = document.getElementById("machineOffButton");



sample.style.display = "none";
sourceRay.style.display = "none";
detectorRay.style.display = "none";
graph.style.display = "none";



//  text and voice 

const voiceText = document.getElementById("dialogue-box-parent");
const englishButton = document.getElementById("english");
const hindiButton = document.getElementById("hindi");

function voice() {
    textToSpeech("Welcome to the XRD Simulation", "en-US");
    textToSpeech("Choose the Language you want for the instructions.", "en-US");
    textToSpeech("एक्सआरडी सिमुलेशन में आपका स्वागत है", "hi-IN");
    textToSpeech("निर्देशों के लिए अपनी इच्छित भाषा चुनें.", "hi-IN");
}
voice();

let english = true;
let hindi = false;



englishButton.addEventListener("click", function () {
    
    voiceText.style.display = "none";
    textToSpeech("Switched to English language.", "en-US");
    setTimeout(() => {
        var text = "To Open the Machine Please Click On 'ON' Button";

        typeWriter(text, textElement);
        textToSpeech("To Open the Machine Please Click On 'ON' Button", "en-US");
    }, 2500);

});

hindiButton.addEventListener("click", function () {
    voiceText.style.display = "none";
    english = false;
    hindi = true;
    textToSpeech("भाषा को हिंदी में स्विच किया गया है।", "hi-IN");
    setTimeout(() => {
        var text = "मशीन खोलने के लिए कृपया ऑन बटन पर क्लिक करें";

        typeWriter(text, textElement);
        textToSpeech("मशीन खोलने के लिए कृपया ऑन बटन पर क्लिक करें", "hi-IN");
    }, 3500);
});



function textToSpeech(text, lang) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;

    if (lang) {
        utterance.lang = lang;
    }

    // Check if speech synthesis is paused and resume it if necessary
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }

    // Start the speech synthesis
    window.speechSynthesis.speak(utterance);
}








const textElement = document.getElementById("instructions-text");



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


onButton.addEventListener("click", function(){
    onButton.style.background="black";
    onButton.style.color="white";
    offButton.style.background="";
    offButton.style.color="";
    specimenSelect.disabled = false;
    if (english) {
        textElement.textContent = "";
        text = " Machine has turned on.  If you want to stop the machine then click on the off button otherwise select the specimen.";
        typeWriter(text, textElement);
        textToSpeech(" Machine has turned on.  If you want to stop the machine then click on the off button otherwise select the specimen.", "en-US");
    }
    else if (hindi) {
        textElement.textContent = "";
        text = "मशीन ऑन हो चुकी है। अगर आप मशीन को बंद करना चाहते हैं तो आप ऑफ बटन पर क्लिक करें अन्यथा  स्पेसिमेन को सेलेक्ट करें।";
        typeWriter(text, textElement);
        textToSpeech("मशीन ऑन हो चुकी है। अगर आप मशीन को बंद करना चाहते हैं तो आप ऑफ बटन पर क्लिक करें अन्यथा  स्पेसिमेन को सेलेक्ट करें", "hi-In");
    }
})

offButton.addEventListener("click", function(){
    onButton.style.background="";
    onButton.style.color="";
    offButton.style.background="black";
    offButton.style.color="white";
    specimenSelect.disabled = true;

    if (english) {
        textElement.textContent = "";
        text = "Machine has turned off. If you want to On it again, Please Click on the 'ON'button.";
        typeWriter(text, textElement);
        textToSpeech("Machine has turned off. If you want to On it again, Please Click on the 'ON'button.", "en-US");
    }
    else if (hindi) {
        textElement.textContent = "";
        text = "मशीन बंद हो चुकी है। अगर आप उसे दोबारा चलाना चाहते हैं तो ऑन बटन पर क्लिक करें";
        typeWriter(text, textElement);
        textToSpeech("मशीन बंद हो चुकी है। अगर आप उसे दोबारा चलाना चाहते हैं तो ऑन बटन पर क्लिक करें", "hi-In");
    }
})

specimenSelect.addEventListener("change", function () {



    if (specimenSelect.value !== "") {
        specimenSelect.disabled = true;


        if (english) {
            textElement.textContent = "";
            text = "Now Click on 'OPEN' Button.";
            typeWriter(text, textElement);
            textToSpeech("Now Click on 'OPEN' Button.", "en-US");
        }
        else if (hindi) {
            textElement.textContent = "";
            text = "अब ओपन बटन पर क्लिक करें।";
            typeWriter(text, textElement);
            textToSpeech("अब ओपन बटन पर क्लिक करें।,", "hi-In");
        }


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



        if (english) {
            textElement.textContent = "";
            text = "Now Click on 'CLOSE' Button. ";
            typeWriter(text, textElement);
            textToSpeech("Now Click on 'CLOSE' Button. ", "en-US");
        }
        else if (hindi) {
            textElement.textContent = "";
            text = "अब बंद करें बटन पर क्लिक करें।";
            typeWriter(text, textElement);
            textToSpeech("अब बंद करें बटन पर क्लिक करें।", "hi-In");
        }




    }, 2000);


});

// Enable "OPEN" button and disable "CLOSE" button when "CLOSE" is clicked
closeButton.addEventListener("click", function () {
    leftDoor.classList.remove("opened");
    rightDoor.classList.remove("opened");
    standbyButton.disabled = false;

    if (english) {

        textElement.textContent = "";
        text = "Now Click on 'STANDBY/ON' Button. ";
        typeWriter(text, textElement);
        textToSpeech("Now Click on 'STANDBY/ON' Button.", "en-US");
    }
    else if (hindi) {
        textElement.textContent = "";
        text = "अब स्टैंडबाय/ऑन बटन पर क्लिक करें।";
        typeWriter(text, textElement);
        textToSpeech("अब स्टैंडबाय/ऑन बटन पर क्लिक करें।", "hi-In");
    }

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
        if (english) {
            textElement.textContent = "";
            text = " Now Set the Start Angle and End Angle.";
            typeWriter(text, textElement);
            textToSpeech("Now Set the Start Angle and End Angle.", "en-US");
        }
        else if (hindi) {
            textElement.textContent = "";
            text = "अब प्रारंभ कोण और समाप्ति कोण सेट करें.";
            typeWriter(text,  textElement);
            textToSpeech("अब प्रारंभ कोण और समाप्ति कोण सेट करें.", "hi-In");
        }


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


});


btnEndDw.addEventListener("click", function () {

    endangle += 5;


    if (endangle > 160) {
        endangle = 160;
    }
    updateEndAngle();
    if (english) {
        textElement.textContent = "";
        text = "Now input the Step size.";
        typeWriter(text, textElement);
        textToSpeech("Now input the Step size.", "en-US");
    }
    else if (hindi) {
        textElement.textContent = "";
        text = "अब स्टेप साइज इनपुट करें।";
        typeWriter(text,  textElement);
        textToSpeech("अब स्टेप साइज इनपुट करें।", "hi-In");
    }
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

   

    if (english) {
        textElement.textContent = "";
        text = "Now input the  Scan Rate.";
        typeWriter(text, textElement);
        textToSpeech("Now input the  Scan Rate", "en-US");
    }
    else if (hindi) {
        textElement.textContent = "";
        text = "अब स्कैन रेट इनपुट करें।";
        typeWriter(text,  textElement);
        textToSpeech("अब स्कैन रेट इनपुट करें।", "hi-In");
    }

});

timestep.addEventListener("change", function () {
    timestep.disabled = true;
    startAnimationButton.disabled = false;
 

    if (english) {
        textElement.textContent = "";
        text = "Now Click on 'START SCAN' Button. ";
        typeWriter(text, textElement);
        textToSpeech("Now Click on 'START SCAN' Button.", "en-US");
    }
    else if (hindi) {
        textElement.textContent = "";
        text = "अब स्टार्ट स्कैन बटन पर क्लिक करें।";
        typeWriter(text,  textElement);
        textToSpeech("अब स्टार्ट स्कैन बटन पर क्लिक करें।", "hi-In");
    }
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
        graph.style.display = "block";
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
