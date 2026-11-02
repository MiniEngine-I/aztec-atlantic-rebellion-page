const state = {
  turn: 1,
  selectedRegion: "Mexico Basin",
  resources: {
    food: 130,
    wood: 105,
    stone: 80,
    metal: 55,
    gold: 60,
    labor: 100,
    prestige: 35,
    powder: 18,
    sailors: 22,
    steel: 12
  },
  fleet: {
    ships: 4,
    warships: 2,
    caravels: 1,
    transports: 1,
    cannons: 8,
    crews: 28
  },
  tech: {
    shipbuilding: 1,
    metallurgy: 1,
    navalScience: 0,
    firearms: 0,
    medicine: 0,
    cartography: 0,
    diplomacy: 0
  },
  diplomacy: {
    nearbyAllies: 3,
    enemyThreat: 72,
    tradeRoutes: 1
  },
  objectives: {
    survive: 0,
    controlGulf: 0,
    masterSea: 0,
    invadeSpain: 0
  },
  world: {
    "Mexico Basin": {
      id: "Mexico Basin",
      type: "core",
      control: 88,
      population: 68,
      food: 18,
      wood: 12,
      metal: 6,
      gold: 4,
      harbor: 0,
      fort: 1,
      workshop: 1,
      threat: 24,
      owner: "player",
      summary: "The central heartland of the empire. Grain, labor, and legitimacy flow from here."
    },
    Tlaxcala: {
      id: "Tlaxcala",
      type: "allied",
      control: 76,
      population: 55,
      food: 12,
      wood: 8,
      metal: 4,
      gold: 3,
      harbor: 0,
      fort: 1,
      workshop: 0,
      threat: 26,
      owner: "player",
      summary: "A vital allied state supplying soldiers and grain."
    },
    Yucatán: {
      id: "Yucatán",
      type: "coast",
      control: 58,
      population: 42,
      food: 10,
      wood: 10,
      metal: 2,
      gold: 5,
      harbor: 0,
      fort: 0,
      workshop: 0,
      threat: 30,
      owner: "player",
      summary: "A gateway to the Gulf and the Caribbean trade routes."
    },
    "Gulf Coast": {
      id: "Gulf Coast",
      type: "harbor",
      control: 40,
      population: 28,
      food: 9,
      wood: 8,
      metal: 4,
      gold: 6,
      harbor: 0,
      fort: 0,
      workshop: 0,
      threat: 46,
      owner: "player",
      summary: "A contested coast where the future fleet must be born."
    },
    Caribbean: {
      id: "Caribbean",
      type: "sea",
      control: 12,
      population: 8,
      food: 4,
      wood: 5,
      metal: 2,
      gold: 4,
      harbor: 0,
      fort: 0,
      workshop: 0,
      threat: 58,
      owner: "neutral",
      summary: "Spanish shipping lanes and pirate waters. Highly contested."
    },
    Hispaniola: {
      id: "Hispaniola",
      type: "island",
      control: 6,
      population: 12,
      food: 5,
      wood: 6,
      metal: 3,
      gold: 8,
      harbor: 0,
      fort: 0,
      workshop: 0,
      threat: 62,
      owner: "neutral",
      summary: "A rich island colony, vulnerable to seizure and raids."
    },
    Castile: {
      id: "Castile",
      type: "enemy",
      control: 95,
      population: 72,
      food: 14,
      wood: 10,
      metal: 9,
      gold: 15,
      harbor: 1,
      fort: 2,
      workshop: 2,
      threat: 88,
      owner: "spain",
      summary: "The Spanish heartland. Rich, defiant, and the final prize."
    },
    Andalusia: {
      id: "Andalusia",
      type: "enemy",
      control: 84,
      population: 58,
      food: 10,
      wood: 7,
      metal: 8,
      gold: 12,
      harbor: 1,
      fort: 1,
      workshop: 1,
      threat: 82,
      owner: "spain",
      summary: "Spain's Atlantic gate and the likely staging ground for retaliation."
    }
  }
};

const ui = {
  resourceList: document.getElementById("resourceList"),
  techList: document.getElementById("techList"),
  objectiveList: document.getElementById("objectiveList"),
  fleetList: document.getElementById("fleetList"),
  diplomacyList: document.getElementById("diplomacyList"),
  map: document.getElementById("map"),
  regionName: document.getElementById("regionName"),
  regionDetails: document.getElementById("regionDetails"),
  turnDisplay: document.getElementById("turnDisplay"),
  campaignStatus: document.getElementById("campaignStatus"),
  log: document.getElementById("log")
};

const messages = [];

function addLog(message) {
  messages.unshift(message);
  ui.log.innerHTML = messages
    .slice(0, 10)
    .map((entry) => `<div class="log-entry">${entry}</div>`)
    .join("");
}

function getSelectedRegion() {
  return state.world[state.selectedRegion];
}

function calculateRegionalControl() {
  const regions = Object.values(state.world);
  const controlled = regions.filter((region) => region.owner === "player").length;
  return Math.round((controlled / regions.length) * 100);
}

function getResourceSummary() {
  return [
    ["Food", state.resources.food],
    ["Wood", state.resources.wood],
    ["Stone", state.resources.stone],
    ["Metal", state.resources.metal],
    ["Gold", state.resources.gold],
    ["Labor", state.resources.labor],
    ["Prestige", state.resources.prestige],
    ["Powder", state.resources.powder],
    ["Sailors", state.resources.sailors],
    ["Steel", state.resources.steel]
  ];
}

function getTechSummary() {
  return [
    ["Shipbuilding", state.tech.shipbuilding],
    ["Metallurgy", state.tech.metallurgy],
    ["Naval Science", state.tech.navalScience],
    ["Firearms", state.tech.firearms],
    ["Medicine", state.tech.medicine],
    ["Cartography", state.tech.cartography],
    ["Diplomacy", state.tech.diplomacy]
  ];
}

function getFleetSummary() {
  return [
    ["Ships", state.fleet.ships],
    ["Warships", state.fleet.warships],
    ["Caravels", state.fleet.caravels],
    ["Transports", state.fleet.transports],
    ["Cannons", state.fleet.cannons],
    ["Crew", state.fleet.crews]
  ];
}

function getDiplomacySummary() {
  return [
    ["Allied States", state.diplomacy.nearbyAllies],
    ["Spanish Threat", `${state.diplomacy.enemyThreat}%`],
    ["Trade Routes", state.diplomacy.tradeRoutes],
    ["Regional Control", `${calculateRegionalControl()}%`]
  ];
}

function getObjectiveSummary() {
  return [
    ["Survive", state.objectives.survive],
    ["Secure Gulf", state.objectives.controlGulf],
    ["Master Seas", state.objectives.masterSea],
    ["Invade Spain", state.objectives.invadeSpain]
  ];
}

function renderPanels() {
  ui.resourceList.innerHTML = getResourceSummary()
    .map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`)
    .join("");

  ui.techList.innerHTML = getTechSummary()
    .map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`)
    .join("");

  ui.objectiveList.innerHTML = getObjectiveSummary()
    .map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`)
    .join("");

  ui.fleetList.innerHTML = getFleetSummary()
    .map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`)
    .join("");

  ui.diplomacyList.innerHTML = getDiplomacySummary()
    .map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`)
    .join("");
}

function renderMap() {
  const entries = Object.entries(state.world);

  ui.map.innerHTML = entries
    .map(([name, region]) => {
      const selectedClass = name === state.selectedRegion ? "selected" : "";
      const badge = region.owner === "player" ? "Allied" : region.owner === "spain" ? "Spanish" : "Contested";

      return `
        <button class="region-card ${selectedClass}" type="button" data-region="${name}">
          <span class="name">${name}</span>
          <span class="badge">${badge}</span>
          <span class="meta">Control: ${region.control}%</span>
          <span class="meta">Threat: ${region.threat}%</span>
          <span class="meta">Population: ${region.population}</span>
        </button>
      `;
    })
    .join("");

  ui.map.querySelectorAll(".region-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedRegion = card.dataset.region;
      render();
    });
  });
}

function renderRegionPanel() {
  const region = getSelectedRegion();

  ui.regionName.textContent = region.id;

  ui.regionDetails.innerHTML = `
    <p>${region.summary}</p>
    <div class="region-detail-grid">
      <div class="detail-box"><strong>Owner</strong>${region.owner === "player" ? "Aztec Alliance" : region.owner === "spain" ? "Spain" : "Unclaimed"}</div>
      <div class="detail-box"><strong>Control</strong>${region.control}%</div>
      <div class="detail-box"><strong>Food</strong>${region.food}</div>
      <div class="detail-box"><strong>Wood</strong>${region.wood}</div>
      <div class="detail-box"><strong>Metal</strong>${region.metal}</div>
      <div class="detail-box"><strong>Gold</strong>${region.gold}</div>
      <div class="detail-box"><strong>Harbor</strong>${region.harbor}</div>
      <div class="detail-box"><strong>Fortress</strong>${region.fort}</div>
    </div>
  `;
}

function calculateVictoryScore() {
  const score =
    state.resources.prestige * 0.8 +
    state.tech.navalScience * 15 +
    state.tech.firearms * 12 +
    state.tech.medicine * 10 +
    state.tech.cartography * 10 +
    state.fleet.ships * 5 +
    state.diplomacy.nearbyAllies * 9;

  return Math.min(100, Math.round(score));
}

function renderCampaignStatus() {
  const score = calculateVictoryScore();
  const statusText = `Your empire has ${calculateRegionalControl()}% control of the major strategic zones. Victory pressure: ${score}/100. Spain is watching the Atlantic and preparing retaliation.`;
  ui.campaignStatus.innerHTML = `<strong>Campaign Status:</strong><br>${statusText}`;
}

function renderLog() {
  ui.log.innerHTML = messages
    .slice(0, 10)
    .map((entry) => `<div class="log-entry">${entry}</div>`)
    .join("");
}

function checkVictoryConditions() {
  const control = calculateRegionalControl();

  if (state.diplomacy.enemyThreat <= 35 && control >= 55) {
    state.objectives.survive = 1;
  }

  if (state.objectives.controlGulf >= 2 || state.diplomacy.tradeRoutes >= 3) {
    state.objectives.controlGulf = 1;
  }

  if (state.tech.navalScience >= 2 && state.fleet.ships >= 4) {
    state.objectives.masterSea = 1;
  }

  if (state.objectives.invadeSpain === 1 && state.objectives.masterSea === 1) {
    state.objectives.invadeSpain = 2;
    addLog("Victory is within reach: the empire has the fleet, the knowledge, and the momentum to challenge Spain itself.");
  }

  if (state.objectives.invadeSpain === 2) {
    const victoryText = "The Aztec Atlantic Rebellion has triumphed. Spain is no longer the master of the ocean. The empire begins the age of a new naval power.";
    ui.campaignStatus.innerHTML = `<strong>Final Victory:</strong><br>${victoryText}`;
    addLog(victoryText);
  }
}

function applyTurnIncome() {
  state.resources.food += 14 + Math.floor(state.diplomacy.nearbyAllies * 2);
  state.resources.wood += 8 + state.tech.shipbuilding;
  state.resources.metal += 5 + state.tech.metallurgy;
  state.resources.gold += 6 + state.tech.diplomacy;
  state.resources.labor += 8 + Math.floor(state.resources.prestige / 12);

  const playerRegions = Object.values(state.world).filter((region) => region.owner === "player");
  playerRegions.forEach((region) => {
    state.resources.food += region.food;
    state.resources.wood += region.wood;
    state.resources.metal += region.metal;
    state.resources.gold += region.gold;
    state.resources.labor += Math.floor(region.population / 12);
  });

  state.diplomacy.enemyThreat = Math.min(100, state.diplomacy.enemyThreat + 3 + state.tech.navalScience);
  state.diplomacy.nearbyAllies = Math.min(9, state.diplomacy.nearbyAllies + (state.tech.diplomacy > 0 ? 1 : 0));

  if (state.turn % 3 === 0) {
    state.world.Caribbean.control = Math.min(100, state.world.Caribbean.control + 5);
    addLog("The Caribbean grows more contested as both empires fight for the sea lanes.");
  }

  if (state.turn % 5 === 0) {
    state.resources.sailors += 5;
    state.resources.powder += 4;
    addLog("New crews are trained and powder stores are replenished for the fleet.");
  }
}

function nextTurn() {
  state.turn += 1;
  applyTurnIncome();
  addLog("The empire adjusts to the next season of war and commerce.");
  ui.turnDisplay.textContent = `Turn ${state.turn}`;
  render();
}

function buildShip() {
  if (state.resources.wood < 22 || state.resources.metal < 10 || state.resources.labor < 10) {
    addLog("You do not have enough materials to construct another ship.");
    return;
  }

  state.resources.wood -= 22;
  state.resources.metal -= 10;
  state.resources.labor -= 10;
  state.fleet.ships += 1;
  state.fleet.crews += 8;
  state.tech.shipbuilding += 1;

  addLog("A new ship is launched in the fleet yards. The Atlantic ambitions of the empire grow.");
  render();
}

function recruitEngineer() {
  if (state.resources.gold < 18 || state.resources.prestige < 8) {
    addLog("You need more wealth and prestige to secure a Spanish engineer.");
    return;
  }

  state.resources.gold -= 18;
  state.resources.prestige -= 8;
  state.tech.metallurgy += 1;
  state.tech.shipbuilding += 1;
  state.resources.steel += 3;
  state.resources.sailors += 6;

  addLog("A captured Spanish engineer and shipwright are brought into the imperial workshops.");
  render();
}

function researchNavalScience() {
  if (state.resources.gold < 20 || state.resources.prestige < 12) {
    addLog("Your empire needs more surplus and prestige for deep naval study.");
    return;
  }

  state.resources.gold -= 20;
  state.resources.prestige -= 12;
  state.tech.navalScience += 1;
  state.tech.cartography += 1;

  addLog("Your pilots study Atlantic currents, winds, and distant coastlines.");
  render();
}

function raidPort() {
  if (state.fleet.ships < 2) {
    addLog("You need at least two ships to strike a Spanish port.");
    return;
  }

  state.fleet.ships -= 1;
  state.resources.gold += 24;
  state.resources.powder += 10;
  state.resources.food += 9;
  state.tech.firearms += 1;

  addLog("A bold raid on a Spanish port captures cannon, powder, and maps. Your naval doctrine improves.");
  render();
}

function fortifyFrontier() {
  if (state.resources.stone < 14 || state.resources.wood < 14 || state.resources.labor < 8) {
    addLog("You do not yet have enough raw materials to fortify the frontier.");
    return;
  }

  state.resources.stone -= 14;
  state.resources.wood -= 14;
  state.resources.labor -= 8;
  state.diplomacy.enemyThreat -= 12;

  addLog("Frontier redoubts and watch towers are reinforced against a second Spanish invasion.");
  render();
}

function launchInvasion() {
  const invasionReady =
    state.tech.navalScience >= 2 &&
    state.tech.firearms >= 1 &&
    state.tech.cartography >= 1 &&
    state.fleet.ships >= 6 &&
    state.diplomacy.tradeRoutes >= 3 &&
    state.objectives.controlGulf >= 1;

  if (!invasionReady) {
    addLog("The empire is not ready to launch a transatlantic invasion of Spain. More ships, maps, and control are needed.");
    return;
  }

  state.objectives.invadeSpain = 1;
  state.diplomacy.enemyThreat -= 18;
  state.resources.prestige += 18;

  addLog("The Atlantic campaign is set in motion. Spain fears the empire beyond the ocean.");
  render();
}

document.getElementById("nextTurn").addEventListener("click", nextTurn);

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "buildShip") buildShip();
    if (action === "recruitEngineer") recruitEngineer();
    if (action === "researchNavalScience") researchNavalScience();
    if (action === "raidPort") raidPort();
    if (action === "fortifyFrontier") fortifyFrontier();
    if (action === "launchInvasion") launchInvasion();
  });
});

function render() {
  renderPanels();
  renderMap();
  renderRegionPanel();
  renderCampaignStatus();
  renderLog();
  ui.turnDisplay.textContent = `Turn ${state.turn}`;
  checkVictoryConditions();
}

addLog("The empire survives Cortés's failed invasion. The question is no longer whether the Aztecs endure, but whether they will master the Atlantic.");
render();
