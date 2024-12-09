// Get elements
const drawButton = document.getElementById('drawButton');
const nameList = document.getElementById('nameList');
const userNameInput = document.getElementById('userName');
const validateNameButton = document.getElementById('validateNameButton');


const allowedNames = ["Erika", "Joy", "MJ", "Khian", "erika", "joy", "mj", "khian"];


let names = [
    "Tito Bobet", "Tita Bebe", "Angel", "Janjan", "Joyjoy", "Tito Abet", "Tita Nene", "Erika", "Aaron", "Jean", "Andrea", 
    "Aliya", "Tito Milo", "Tintin", "Khian", "Olim", "Kim", "Lola", "Tito Roger", "Tita Rina", "Badoy", "Manny", "MJ", "Zariyah"
];

// Track the number of picks for each user
let joyPicksCount = 0;
let erikaPicksCount = 0;
let khianPicksCount = 0;
let mjPicksCount = 0;

// Store the list of picked names for each user
let joyPickedNames = [];
let erikaPickedNames = [];
let khianPickedNames = [];
let mjPickedNames = [];

// Current active user
let currentUser = '';

// List of restricted names for each user
const joyRestrictedNames = ["Tito Bobet", "Tita Bebe", "Angel", "Janjan", "Joyjoy"];
const erikaRestrictedNames = ["Tito Abet", "Tita Nene", "Erika", "Aaron", "Jean", "Andrea", "Aliya"];
const khianRestrictedNames = ["Tito Milo", "Tintin", "Khian", "Olim", "Kim"];
const mjRestrictedNames = ["Lola", "Tito Roger", "Tita Rina", "Badoy", "Manny", "MJ", "Zariyah"];

// Function to update the displayed list of names
function updateNameList() {
    nameList.innerHTML = ""; // Clear the list

    // Ensure the updated names are reflected
    names.forEach((name) => {
        const li = document.createElement('li');
        li.textContent = name;
        nameList.appendChild(li);
    });

    // If there's only one item left, ensure it's visible
    if (names.length === 1) {
        const lastItem = nameList.lastChild;
        if (lastItem) {
            lastItem.scrollIntoView(); // Scroll to the last item to make sure it's visible
        }
    }
}

// Function to handle user name validation
function validateUserName(userName) {
    if (allowedNames.includes(userName)) {
        // Set the current user and enable the "PICK" button
        currentUser = userName.toLowerCase();
        drawButton.disabled = false;
        userNameInput.disabled = true;
        validateNameButton.disabled = true;
        
        // Show a welcome message based on the user
        if (currentUser === "joy") {
            alert("Welcome Joy! You can only pick 5 names.");
        } else if (currentUser === "erika") {
            alert("Welcome Erika! You can only pick 7 names.");
        } else if (currentUser === "khian") {
            alert("Welcome Khian! You can only pick 5 names.");
        } else if (currentUser === "mj") {
            alert("Welcome MJ! You can only pick 7 names.");
        }
    } else {
        alert("You are not allowed to participate.");
    }
}

// Function to handle drawing a random winner
function drawRandomWinner() {
    if (currentUser === "joy" && joyPicksCount >= 5) {
        alert("You have already picked 5 times.");
        drawButton.disabled = true;  // Disable the "PICK" button
        return;
    }
    if (currentUser === "erika" && erikaPicksCount >= 7) {
        alert("You have already picked 7 times.");
        drawButton.disabled = true;  // Disable the "PICK" button
        return;
    }
    if (currentUser === "khian" && khianPicksCount >= 5) {
        alert("You have already picked 5 times.");
        drawButton.disabled = true;  // Disable the "PICK" button
        return;
    }
    if (currentUser === "mj" && mjPicksCount >= 7) {
        alert("You have already picked 7 times.");
        drawButton.disabled = true;  // Disable the "PICK" button
        return;
    }

    // Filter out restricted names based on the current user
    let availableNames = [...names];

    if (currentUser === "mj") {
        availableNames = availableNames.filter(name => !mjRestrictedNames.includes(name));
    }
    if (currentUser === "khian") {
        availableNames = availableNames.filter(name => !khianRestrictedNames.includes(name));
    }
    if (currentUser === "erika") {
        availableNames = availableNames.filter(name => !erikaRestrictedNames.includes(name));
    }
    if (currentUser === "joy") {
        availableNames = availableNames.filter(name => !joyRestrictedNames.includes(name));
    }

    // Pick a random name from the available names
    if (availableNames.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableNames.length);
        const winner = availableNames[randomIndex];

        // Show the winner
        showWinnerAlert(winner);

        // Increment the pick count for the user
        if (currentUser === "joy") {
            joyPicksCount++;
            joyPickedNames.push(winner);
        } else if (currentUser === "erika") {
            erikaPicksCount++;
            erikaPickedNames.push(winner);
        } else if (currentUser === "khian") {
            khianPicksCount++;
            khianPickedNames.push(winner);
        } else if (currentUser === "mj") {
            mjPicksCount++;
            mjPickedNames.push(winner);
        }

        // Remove the picked name from the list
        names.splice(names.indexOf(winner), 1);

        // Update the name list after the pick
        updateNameList();

        // If the user reaches their limit, show the "Your Picks" list and reset
        if (
            joyPicksCount >= 5 || erikaPicksCount >= 7 || khianPicksCount >= 5 || mjPicksCount >= 7
        ) {
            drawButton.disabled = true;  // Disable the "PICK" button
            showAllPickedNamesAlert();
            resetForNextUser();
        }
    }
}

// Function to show the winner in a SweetAlert
function showWinnerAlert(winner) {
    Swal.fire({
        html: `<strong>→ ${winner} ←</strong>`,
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        updateNameList(); // Ensure the list is updated after the winner is drawn
    });
}

// Function to show all picked names for the user
function showAllPickedNamesAlert() {
    let pickedNamesList = [];
    if (currentUser === "joy") {
        pickedNamesList = joyPickedNames;
    } else if (currentUser === "erika") {
        pickedNamesList = erikaPickedNames;
    } else if (currentUser === "khian") {
        pickedNamesList = khianPickedNames;
    } else if (currentUser === "mj") {
        pickedNamesList = mjPickedNames;
    }

    Swal.fire({
        title: 'Your Picks:',
        html: `<strong>${pickedNamesList.join("<br>")}</strong>`,
        icon: 'info',
        confirmButtonText: 'OK'
    });
}

// Reset input and buttons for the next user
function resetForNextUser() {
    validateNameButton.disabled = false;
    userNameInput.disabled = false;
    userNameInput.value = "";  // Clear the input
    currentUser = '';
    joyPicksCount = 0;
    erikaPicksCount = 0;
    khianPicksCount = 0;
    mjPicksCount = 0;
    joyPickedNames = [];
    erikaPickedNames = [];
    khianPickedNames = [];
    mjPickedNames = [];
}

// Event listeners
validateNameButton.addEventListener('click', () => {
    const userName = userNameInput.value.trim();
    validateUserName(userName);
});

drawButton.addEventListener('click', () => {
    drawRandomWinner();
});

// Initialize the name list on page load
updateNameList();
