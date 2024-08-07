// Author : Richard Charczenko
// Edited By : Gina Philipose, Rena Ahn, Zachary Mullen
/* JavaScript File : lacop.js
     The original File was a Python file (lacOp_App.py) hosted with Flask
     Translation By : Gina Philipose, Zachary Mullen
*/
// Last Update : August 7th, 2024

// Purpose : Define main functions for the LacOp project/simulation

import Cell from './cellClass.js';

// Creates and returns a Cell object upon simulating cell activity
// Utilizes Function(s)...converMutListToDict, Cell.addPlasmid
// Pre : PARAM mutList is a list of string variables,
//       PARAM plasmid is a list of string variables,
//       PARAM allo is a number variable,
//       PARAM lacIn is a number variable, PARAM lacOut is a number variable,
//       PARAM glucose is a number variable
// Post : a Cell object is created
function runLO(mutList, plasmid, allo, lacIn, lacOut, glucose) {
    const mutations = convertMutListToDict(mutList);
    let cap = "Inactive";
    if ("Active" in mutList) { 
        cap = "Active";
    }
    var C = new Cell(mutations, allo, lacIn, lacOut, glucose, cap);
    if(plasmid.length > 0) {
        let shift = [];
        for(let item of plasmid){
            const slicedItem = item.slice(2);
            shift.push(slicedItem);
        }
        C.addPlasmid(convertMutListToDict(shift));
    }
    C.generateData();
    return C;
}

// Helper Function to RunLO
// Creates and returns a dictionary with values that are defined based on
// corresponding existence of <item>s in PARAM list
// Pre : PARAM list is a list of string variables
// Post : a dictionary is created
function convertMutListToDict(list) {
    var mutations = {'ProMutation': null, 'BgalMutation': null,
        'RepMutation': null, 'OpMutation': null,
        'PermMutation': null};
    for (let item of list){ 
        let sliceItem = item.slice(0,4);
        if(sliceItem != "none") {
            if (item == "lacP-") {
                mutations["ProMutation"] = item;
            } else if (item == "lacIs" || item == "lacI-") {
                mutations["RepMutation"] = item;
            } else if (item == "lacY-") {
                mutations["PermMutation"] = item;
            } else if (item == "lacOc") {
                mutations["OpMutation"] = item;
            } else if (item == "lacZ-") {
                mutations["BgalMutation"] = item;
            }
        }
    }
    return mutations;
}

// consider instead making a "Simulation" object that takes place of the
// "generateData" function, allowing front end to step through the simulation
export {
    runLO,
    convertMutListToDict
};
