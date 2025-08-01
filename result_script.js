const buildingScore = parseFloat(localStorage.getItem("building-score") || 0);
const energyScore = parseFloat(localStorage.getItem("energy-score") || 0);
const waterScore = parseFloat(localStorage.getItem("water-score") || 0);
const wasteScore = parseFloat(localStorage.getItem("waste-score") || 0);

const allImprovements = [
  "Install energy-efficient LED lighting.",
  "Use low-VOC paints and finishes.",
  "Install solar panels or green roofing.",
  "Upgrade to energy-efficient HVAC systems.",
  "Improve insulation in walls and ceilings.",
  "Harvest rainwater for reuse.",
  "Use smart sensors for lighting and HVAC.",
  "Switch to double-glazed windows.",
  "Promote bicycle parking and EV charging.",
  "Use locally sourced sustainable materials.",
  "Reduce water usage with low-flow fixtures.",
  "Set up a building-wide recycling program.",
  "Use motion-sensor faucets and lighting.",
  "Conduct regular energy audits.",
  "Switch to renewable energy sources.",
  "Implement green landscaping with native plants."
];

const totalScore = Math.round((buildingScore + energyScore + waterScore + wasteScore) / 4);

document.getElementById("score-number").innerText = totalScore;

let rank = "", feedback = "";

if (totalScore >= 85) {
  rank = "Excellent";
  feedback = "Your building demonstrates outstanding sustainability. Minimal improvements required!";
} else if (totalScore >= 70) {
  rank = "Good";
  feedback = "Your building is doing well. Some areas still offer room for improvement.";
} else if (totalScore >= 50) {
  rank = "Average";
  feedback = "Decent performance. Consider taking steps to improve sustainability.";
} else {
  rank = "Needs Improvement";
  feedback = "Your building has significant room for improvement. Take immediate action!";
}

document.getElementById("rank-label").innerText = rank;
document.getElementById("feedback").innerText = feedback;

// Optional: show category-wise breakdown
document.getElementById("building-score-breakdown").innerText = buildingScore + "%";
document.getElementById("energy-score-breakdown").innerText = energyScore + "%";
document.getElementById("water-score-breakdown").innerText = waterScore + "%";
document.getElementById("waste-score-breakdown").innerText = wasteScore + "%";

// Shuffle and pick 4 random improvements
function getRandomImprovements(count = 4) {
  const shuffled = [...allImprovements].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function displayImprovements() {
  const list = document.getElementById("improvements-list");
  const selected = getRandomImprovements();
  selected.forEach(improvement => {
    const li = document.createElement("li");
    li.textContent = improvement;
    list.appendChild(li);
  });
}

displayImprovements();

// Estimated Environmental Impact Calculations
const energyImpact = Math.round(energyScore * 0.9);   // Assuming 90% of energy score reflects real savings
const waterImpact = Math.round(waterScore * 0.85);    // Assuming 85% of water score translates to water conservation
const carbonImpact = Math.round((energyScore + wasteScore) / 2 * 0.7); // 70% of avg energy & waste score affects CO2

document.getElementById("energy-impact").innerText = energyImpact + "%";
document.getElementById("water-impact").innerText = waterImpact + "%";
document.getElementById("carbon-impact").innerText = carbonImpact + "%";

