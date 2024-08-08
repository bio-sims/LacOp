// Author : Gina Philipose, Zachary Mullen
// JavaScript File : main.js
// Last Update : August 7th, 2024

// Purpose : Driver file for the LacOp project/simulation

import { runLO } from "./lacop.js";

// temp, delete all below later
const simCell = runLO(['noneP', 'ALLO', 'LO', 'noneZ', 'noneY', 'LI', 'GLU', 'Inactive', 'noneO', 'noneI'], [], 0, 0, 200, 0); // Cell object
const timeTable = document.getElementById("temp-table");
// insert row for each time point
for (let i = 0; i < simCell.time; i++) {
  const row = timeTable.insertRow();
  const timeCell = row.insertCell();
  const alloCell = row.insertCell();
  const bgalCell = row.insertCell();
  const glucoseCell = row.insertCell();
  const lacInCell = row.insertCell();
  const lacOutCell = row.insertCell();
  const permCell = row.insertCell();

  timeCell.innerHTML = i;
  alloCell.innerHTML = simCell.archiveConditions.allo[i].toFixed(3);
  bgalCell.innerHTML = simCell.archiveConditions.bgal[i];
  glucoseCell.innerHTML = simCell.archiveConditions["glucose + galactose"][i].toFixed(3);
  lacInCell.innerHTML = simCell.archiveConditions.lacIn[i].toFixed(3);
  lacOutCell.innerHTML = simCell.archiveConditions.lacOut[i].toFixed(3);
  permCell.innerHTML = simCell.archiveConditions.perm[i];
}

// for debugging, get cell object from console
window.cell = simCell;
