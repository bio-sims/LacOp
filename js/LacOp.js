// Author : 
// Edited By : Gina Philipose, Rena Ahn, Zachary Mullen
// JavaScript File : LacOp.js
//   Original File : Python
//   Translated By : Gina Philipose
// Last Update : July 24th, 2024

// Purpose : Driver file for the LacOp project/simulation

import Cell from './cellClass.js';

// Creates and returns a Cell object upon simulating cell activity
// Utilizes Function(s)...convert_mutList_to_dict, Cell.add_plasmid
// Pre : PARAM mutL is a list of string variables,
//       PARAM plasmid is a list of string variables,
//       PARAM allo is a number variable,
//       PARAM lacIn is a number variable, PARAM lacOut is a number variable,
//       PARAM Glu is a number variable !!!!! why capitalized?
// Post : a Cell object is created
function RunLO(mutL, plasmid, allo, lacIn, lacOut, Glu) {   // !!!!! camelCase?
    const mutations = convert_mutList_to_dict(mutL);
    var cap = "Inactive";   // converts to let?
    if ("Active" in mutL) { 
        cap = "Active";
    }
    var C = new Cell(mutations, allo, lacIn, lacOut, Glu, cap);
    if(plasmid.length > 0){
        var shift = [];   // !!!!! convert to let?
        for(let item of plasmid){
            const slicedItem = item.slice(2);
            shift.push(slicedItem);
        }
        C.add_plasmid(convert_mutList_to_dict(shift));
    }
    C.generateData();
    return C;
}

// Helper Function to RunLO
// Creates and returns a dictionary with values that are defined based on
// corresponding existence of <item>s in PARAM list
// Pre : PARAM list is a list of string variables
// Post : a dictionary is created
function convert_mutList_to_dict(list) {
    var mutL = {'ProMutation': null, 'BgalMutation': null,
        'RepMutation': null, 'OpMutation': null,
        'PermMutation': null};
    for (let item of list){ 
        let sliceItem = item.slice(0,4);
        if(sliceItem != "none") {   // !!!!! implement else?
            if (item == "lacP-"){
                mutL["ProMutation"] = item;
            }
            if (item == "lacIs" || item == "lacI-"){
                mutL["RepMutation"] = item;
            }
            if (item == "lacY-"){
                mutL["PermMutation"] = item;
            }
            if (item == "lacOc"){
                mutL["OpMutation"] = item;
            }
            if (item == "lacZ-"){
                mutL["BgalMutation"] = item;
            }
        }
    }
    return mutL;
}

// consider instead making a "Simulation" object that takes place of the
// "generateData" function, allowing front end to step through the simulation
export {
    RunLO,
    convert_mutList_to_dict
};
