const sliders = document.querySelectorAll("input[type=range]");
const scoreDisplay = document.getElementById("score");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentStep = 0;

const steps = [
  {
    name: "Building Materials",
    fields: ["recycled", "sustainable", "local"]
  },
  {
    name: "Energy Systems",
    fields: ["solar", "efficiency", "renewable"]
  },
  {
    name: "Water Management",
    fields: ["rainwater", "fixtures", "recycling"]
  },
  {
    name: "Waste Management",
    fields: ["segregation", "composting", "effectiveness"]
  }
];

// Create moving tooltip span on each slider
sliders.forEach(slider => {
  const valSpan = document.getElementById(`${slider.id}-val`);
  const wrapper = valSpan.parentElement;

  const updateSlider = () => {
    const val = slider.value;
    valSpan.innerText = `${val}%`;

    const percent = (val - slider.min) / (slider.max - slider.min);
    const offset = slider.offsetWidth * percent;
    valSpan.style.left = `calc(${percent * 100}% - 20px)`;
  };

  slider.addEventListener("input", () => {
    updateSlider();
    updateScore();
  });

  updateSlider();
});

function updateScore() {
  const section = steps[currentStep];
  if (!section.fields.length) return;

  let total = 0;
  section.fields.forEach(id => {
    const el = document.getElementById(id);
    total += parseInt(el.value);
  });

  const average = Math.round(total / section.fields.length);

  if (section.name === "Building Materials") {
    document.getElementById("building-score").textContent = `${average}%`;
    localStorage.setItem("building-score", average);  // Add this
  } else if (section.name === "Energy Systems") {
    document.getElementById("energy-score").textContent = `${average}%`;
    localStorage.setItem("energy-score", average);  // Add this
  } else if (section.name === "Water Management") {
    document.getElementById("water-score").textContent = `${average}%`;
    localStorage.setItem("water-score", average);  // Add this
  } else if (section.name === "Waste Management") {
    document.getElementById("waste-score").textContent = `${average}%`;
    localStorage.setItem("waste-score", average);  // Add this
  }
}


// Update progress and step visuals
function updateStep(direction) {
  currentStep += direction;

  document.querySelectorAll(".materials-section").forEach((section, index) => {
    section.style.display = index === currentStep ? "block" : "none";
  });

  document.querySelectorAll(".step").forEach((step, index) => {
    step.classList.remove("active", "completed");
    if (index < currentStep) {
      step.classList.add("completed");
    } else if (index === currentStep) {
      step.classList.add("active");
    }
  });

  const stepCircles = document.querySelectorAll(".step .circle");

  stepCircles.forEach((circle, index) => {
    const stepName = steps[index].name;
    if (index === currentStep) {
      if (stepName === "Energy Systems") {
        circle.style.backgroundColor = "#FFC107"; // orange-yellow
        circle.style.color = "white";
      } else if (stepName === "Water Management") {
        circle.style.backgroundColor = "#2196F3"; // blue
        circle.style.color = "white";
      } else if (stepName === "Waste Management") {
        circle.style.backgroundColor = "#6e3acb"; // blue
        circle.style.color = "white";
      } else {
        // Leave Building Materials and others untouched
        circle.style.backgroundColor = "";
        circle.style.color = "";
      }
    } else {
      circle.style.backgroundColor = "";
      circle.style.color = "";
    }
  });


  document.querySelectorAll(".bridge").forEach((bridge, index) => {
    if (index < currentStep) {
      bridge.classList.add("completed");
    } else {
      bridge.classList.remove("completed");
    }
  });

  // Update subtext and progress bar
  document.querySelector(".eval-subtext").textContent = `Step ${currentStep + 1} of 4: ${steps[currentStep].name}`;
  document.querySelector(".progress-bar-fill").style.width = `${((currentStep + 1) / steps.length) * 100}%`;
  document.querySelector(".progress-bar-fill").textContent = `${((currentStep + 1) / steps.length) * 100}%`;

  // Show/hide nav buttons
  prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";
  nextBtn.textContent = currentStep === steps.length - 1 ? "Finish" : "Next →";

  updateScore();
}

prevBtn.addEventListener("click", () => updateStep(-1));
nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    updateStep(1);
  } else {
    window.location.href = "analysis.html"
  }
});

// Initialize on load
updateStep(0);
