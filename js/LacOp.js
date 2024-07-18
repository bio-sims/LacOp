/* Driver file for the LacOp project */
import Cell from './cellClass.js';

function RunLO(mutL, plasmid, allo, lacIn, lacOut, Glu) {
    const mutations = convert_mutList_to_dict(mutL);
    var cap = "Inactive";
    if ("Active" in mutL) { 
        cap = "Active";
    }
    var C = new Cell(mutations, allo, lacIn, lacOut, Glu, cap);
    if(plasmid.length > 0){
        var shift = [];
        for(let item of plasmid){
            /////////////
            const slicedItem = item.slice(2);
            shift.push(slicedItem);
        }
        C.add_plasmid(convert_mutList_to_dict(shift));
    }
    C.generateData();
    return C;
}


function convert_mutList_to_dict(list) {
    var mutL = {'ProMutation': null, 'BgalMutation': null,
        'RepMutation': null, 'OpMutation': null,
        'PermMutation': null};
    for (let item of list){ 
        let sliceItem = item.slice(0,4);
        if(sliceItem != "none"){ 
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

// consider instead making a "Simulation" object that takes place of the "generateData" function, allowing front end to step through the simulation
export { RunLO, convert_mutList_to_dict };
