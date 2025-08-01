const progressBar = document.getElementById("progress-bar");
const steps = document.querySelectorAll(".evaluation-step");

let currentStep = 0;
const totalSteps = steps.length;
const duration = 8000; // 8 seconds
const stepDuration = duration / totalSteps;

function updateStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
}

let progress = 0;
const interval = 100; // update every 100ms
const increment = (100 / (duration / interval));
const progressLabel = document.getElementById("progress-label");

const progressInterval = setInterval(() => {
  progress += increment;
  if (progress >= 100) {
    progress = 100;
    clearInterval(progressInterval);

    setTimeout(() => {
      window.location.href = "result.html";
    }, 1000); // wait 1s after finish
  }

  progressBar.style.width = progress + "%";
  progressLabel.innerText = Math.round(progress) + "%";
  progressLabel.style.left = `calc(${progress}% - 20px)`; // Adjust to center

  // Step change every 25%
  const newStep = Math.floor(progress / 25);
  if (newStep !== currentStep) {
    currentStep = newStep;
    updateStep(currentStep);
  }
}, interval);

