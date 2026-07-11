// ==========================================================
// QUEST SYSTEM
// PART 1
// ==========================================================

// ==========================================================
// PAGE REFERENCES
// ==========================================================

const homePage = document.getElementById("home-page");
const penaltySetupPage = document.getElementById("penalty-setup-page");
const missionBoardPage = document.getElementById("mission-board-page");
const mainQuestPage = document.getElementById("main-quest-page");
const skillStatsPage = document.getElementById("skill-stats-page");
const penaltyPage = document.getElementById("penalty-page");


// ==========================================================
// BUTTON REFERENCES
// ==========================================================

const enterSystemButton = document.getElementById("enter-system-btn");
const savePenaltyButton = document.getElementById("save-penalty-btn");
const beginMissionButton = document.getElementById("begin-mission-btn");
const completeMissionButton = document.getElementById("complete-mission-btn");
const returnToBoardButton = document.getElementById("return-to-board-btn");
const completePenaltyButton = document.getElementById("complete-penalty-btn");


// ==========================================================
// PENALTY INPUTS
// ==========================================================

const penaltyName = document.getElementById("penalty-name");
const penaltyDescription = document.getElementById("penalty-description");

const penaltyTitle = document.getElementById("penalty-title");
const penaltyDetails = document.getElementById("penalty-details");


// ==========================================================
// MISSION INPUTS
// ==========================================================

const missionNameInputs = [

    document.getElementById("mission1-name"),
    document.getElementById("mission2-name"),
    document.getElementById("mission3-name"),
    document.getElementById("mission4-name")

];

const missionDescriptionInputs = [

    document.getElementById("mission1-description"),
    document.getElementById("mission2-description"),
    document.getElementById("mission3-description"),
    document.getElementById("mission4-description")

];

const missionTimeInputs = [

    document.getElementById("mission1-time"),
    document.getElementById("mission2-time"),
    document.getElementById("mission3-time"),
    document.getElementById("mission4-time")

];


// ==========================================================
// MAIN QUEST
// ==========================================================

const currentMissionName = document.getElementById("current-mission-name");
const currentMissionDescription = document.getElementById("current-mission-description");
const missionTimer = document.getElementById("mission-timer");
const rewardDisplay = document.getElementById("reward-display");


// ==========================================================
// SKILL STATS
// ==========================================================

const playerLevel = document.getElementById("player-level");
const playerRank = document.getElementById("player-rank");

const xpFill = document.getElementById("xp-fill");
const xpText = document.getElementById("xp-text");

const skillMissionNames = [

    document.getElementById("skill-mission1-name"),
    document.getElementById("skill-mission2-name"),
    document.getElementById("skill-mission3-name"),
    document.getElementById("skill-mission4-name")

];

const skillBars = [

    document.getElementById("skill-fill-1"),
    document.getElementById("skill-fill-2"),
    document.getElementById("skill-fill-3"),
    document.getElementById("skill-fill-4")

];


// ==========================================================
// SYSTEM MESSAGE
// ==========================================================

const systemMessage = document.getElementById("system-message");
const systemText = document.getElementById("system-text");


// ==========================================================
// VARIABLES
// ==========================================================

let missions = [];

let currentMissionIndex = 0;

let totalXP = 0;

let missionBoardLocked = false;

let currentLevel = 1;

let timer;

let remainingSeconds = 0;


// ==========================================================
// SHOW PAGE
// ==========================================================

function showPage(pageToShow){

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page){

        page.style.display = "none";

    });

    pageToShow.style.display = "flex";

}


// ==========================================================
// SYSTEM MESSAGE
// ==========================================================

function showSystemMessage(message){

    systemText.textContent = message;

    systemMessage.style.display = "block";

    setTimeout(function(){

        systemMessage.style.display = "none";

    },2000);

}

function lockMissionBoard(lock){

    for(let i = 0; i < 4; i++){

        missionNameInputs[i].disabled = lock;

        missionDescriptionInputs[i].disabled = lock;

        missionTimeInputs[i].disabled = lock;

    }

}


// ==========================================================
// ENTER SYSTEM
// ==========================================================

enterSystemButton.addEventListener("click",function(){

    showPage(penaltySetupPage);

});


// ==========================================================
// SAVE PENALTY
// ==========================================================

savePenaltyButton.addEventListener("click",function(){

    if(
        penaltyName.value.trim()==="" ||
        penaltyDescription.value.trim()===""
    ){

        showSystemMessage("SYSTEM : Penalty information required.");

        return;

    }

    penaltyTitle.textContent = penaltyName.value;

    penaltyDetails.textContent = penaltyDescription.value;

    showSystemMessage("SYSTEM : Penalty Registered.");

    showPage(missionBoardPage);

});
// ==========================================================
// BEGIN MISSION
// ==========================================================

beginMissionButton.addEventListener("click", function(){
    

    if(missions.length === 0){

    missions = [];

    for(let i = 0; i < 4; i++){

        const name = missionNameInputs[i].value.trim();
        const description = missionDescriptionInputs[i].value.trim();
        const time = missionTimeInputs[i].value.trim();

        if(name !== ""){

            missions.push({

                name: name,
                description: description,
                time: Number(time),
                completed: false

            });

        }

    }

    if(missions.length === 0){

        showSystemMessage("SYSTEM : Register at least one mission.");

        return;

    }

    currentMissionIndex = 0;

}
     missionBoardLocked = true;

    lockMissionBoard(true);

    loadMission();

    startTimer();

    showSystemMessage("SYSTEM : Mission Registered.");

    showPage(mainQuestPage);

});


// ==========================================================
// LOAD CURRENT MISSION
// ==========================================================

function loadMission(){

    const mission = missions[currentMissionIndex];

    currentMissionName.textContent = mission.name;

    currentMissionDescription.textContent = mission.description;

    rewardDisplay.textContent =
    "Reward : +" + (mission.time * 2) + " XP";

    remainingSeconds = mission.time * 60;

    updateTimerDisplay();

}


// ==========================================================
// TIMER DISPLAY
// ==========================================================

function updateTimerDisplay(){

    let hours = Math.floor(remainingSeconds / 3600);

    let minutes = Math.floor((remainingSeconds % 3600) / 60);

    let seconds = remainingSeconds % 60;

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");

    missionTimer.textContent =
    `${hours} : ${minutes} : ${seconds}`;

}


// ==========================================================
// COMPLETE MISSION
// ==========================================================

completeMissionButton.addEventListener("click", function(){

    clearInterval(timer);

    const mission = missions[currentMissionIndex];

    mission.completed = true;

    totalXP += mission.time * 2;

    updateSkillStats();

    showSystemMessage("SYSTEM : Objective Cleared.");

    showPage(skillStatsPage);

});
// ==========================================================
// UPDATE SKILL STATS
// ==========================================================

function updateSkillStats(){

    while(totalXP >= currentLevel * 100){

    currentLevel++;

}

    playerLevel.textContent = "Level " + currentLevel;

    if(currentLevel <= 5){

        playerRank.textContent = "Beginner";

    }
    else if(currentLevel <= 10){

        playerRank.textContent = "Intermediate";

    }
    else{

        playerRank.textContent = "Advanced";

    }

        xpText.textContent = totalXP + " XP";

    for(let i = 0; i < missions.length; i++){

        skillMissionNames[i].textContent = missions[i].name;

        if(missions[i].completed){

            skillBars[i].style.width = "100%";

        }

    }

}


// ==========================================================
// RETURN TO MISSION BOARD
// ==========================================================





// ==========================================================
// CLEAR MISSION BOARD
// ==========================================================

function clearMissionBoard(){

    for(let i = 0; i < 4; i++){

        missionNameInputs[i].value = "";

        missionDescriptionInputs[i].value = "";

        missionTimeInputs[i].value = "";
        

    }

    missions = [];

    currentMissionIndex = 0;
    
    totalXP = 0;

    xpText.textContent = "0 XP";

    for(let i = 0; i < 4; i++){

    skillMissionNames[i].textContent = "Mission " + (i + 1);

    skillBars[i].style.width = "0%";

   }
   missionBoardLocked = false;

   lockMissionBoard(false);

}



// ==========================================================
// START NEXT MISSION
// ==========================================================



// ==========================================================
// START TIMER
// ==========================================================

function startTimer(){

    clearInterval(timer);

    timer = setInterval(function(){

        remainingSeconds--;

        updateTimerDisplay();

        if(remainingSeconds <= 0){

            clearInterval(timer);

            missionFailed();

        }

    },1000);

}


// ==========================================================
// MISSION FAILED
// ==========================================================

function missionFailed(){

    showSystemMessage(
        "SYSTEM : Mission Failed. Penalty Protocol Initiated."
    );

    showPage(penaltyPage);

}


// ==========================================================
// COMPLETE PENALTY
// ==========================================================

completePenaltyButton.addEventListener("click",function(){

    showSystemMessage(
        "SYSTEM : Penalty Cleared."
    );

    loadMission();

    showPage(mainQuestPage);

    startTimer();

});


// ==========================================================
// MODIFY BEGIN MISSION
// ==========================================================






// ==========================================================
// MODIFY RETURN BUTTON
// ==========================================================

returnToBoardButton.addEventListener("click",function(){

    currentMissionIndex++;

    if(currentMissionIndex < missions.length){

        showSystemMessage(
            "SYSTEM : Accept Next Mission."
        );

        showPage(missionBoardPage);

    }

    else{

        showSystemMessage(
            "SYSTEM : All Missions Cleared."
        );

        clearMissionBoard();

        showPage(missionBoardPage);

    }

});


// ==========================================================
// PAGE LOAD
// ==========================================================

showPage(homePage);
