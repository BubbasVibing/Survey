function goToQuestion(nextQuestionNumber) {
  var totalQuestions = 8;
  var currentQuestionNumber = nextQuestionNumber - 1;

  var currentQuestion = document.getElementById(
    "question" + currentQuestionNumber
  );
  var nextQuestion = document.getElementById("question" + nextQuestionNumber);

  // Check if the current question contains radio buttons
  var radioInputs = currentQuestion.querySelectorAll('input[type="radio"]');
  var hasRadioButtons = radioInputs.length > 0;

  if (hasRadioButtons) {
    var selectedOption = false;
    for (var i = 0; i < radioInputs.length; i++) {
      if (radioInputs[i].checked) {
        selectedOption = true;
        break;
      }
    }

    if (!selectedOption) {
      // Show error message
      var errorMessage = document.getElementById("error" + currentQuestionNumber);
      errorMessage.textContent = "Please select an option before proceeding.";
      return;
    }
  }

  // If at least one radio option is selected or no radio buttons in the question, proceed to the next question
  currentQuestion.classList.remove("show");

  setTimeout(function () {
    currentQuestion.style.display = "none";
    nextQuestion.style.display = "block";

    setTimeout(function () {
      nextQuestion.classList.add("show");
    }, 10);
  }, 500);

  var progressPercentage = (nextQuestionNumber / totalQuestions) * 100;
  updateProgress(progressPercentage);
}

function submitSurvey() {
  // Get the survey form data
  var homeOwner = document.querySelector(
    'input[name="homeOwner"]:checked'
  ).value;
  var homeSize = document.querySelector('input[name="homeSize"]:checked').value;
  var scopeOfProject = document.querySelector(
    'input[name="scopeOfProject"]:checked'
  ).value;
  var roofInstallation = document.querySelector(
    'input[name="roofInstallation"]:checked'
  ).value;
  var address = document.getElementById("address").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;

  // Check if required fields are empty
  if (!address || !firstName || !lastName || !email || !phone) {
    alert("Please fill in all required fields before proceeding.");
    return;
  }

  // Create a JavaScript object with the survey form data
  var surveyData = {
    homeOwner: homeOwner,
    homeSize: homeSize,
    scopeOfProject: scopeOfProject,
    roofInstallation: roofInstallation,
    address: address,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  };

  // Send the survey data to the server using fetch or another method
  fetch("http://localhost:3000/mail-survey-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(surveyData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server (e.g., show a success message)
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error submitting survey:", error);
    });

  // Update the progress bar
  updateProgress(100);
}

function updateProgress(percentage) {
  var progressBar = document.getElementById("progress");
  var progressText = document.getElementById("progressText");

  progressBar.style.width = percentage + "%";
  progressText.textContent = percentage.toFixed(0) + "%"; // Update the text
}

// Initialize first question with fade-in effect
document.addEventListener("DOMContentLoaded", function () {
  var firstQuestion = document.getElementById("question1");
  firstQuestion.style.display = "block";
  setTimeout(function () {
    firstQuestion.classList.add("show");
  }, 10);
});