/* Driver file for the LacOp project */
import { Cell } from './cellClass';


function RunLO(mutL, plasmid, allo, lacIn, lacOut, Glu) {
    const mutations = convert_mutList_to_dict(mutL);
    var cap = "Inactive";
    if ("Active" in mutL) { 
        cap = "Active";
    }
    var C = Cell(mutations, allo, lacIn, lacOut, Glu, cap);
    if(plasmid != []){
        var shift = [];
        for(let item in plasmid){
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
    for (let item in list){ 
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
