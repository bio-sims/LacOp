// Author : Richard Charczenko
// Edited By : Gina Philipose, Rena Ahn, Zachary Mullen
// JavaScript file : cellClass.js
//   Original File : Python
//   Translated By : Gina Philipose
// Last Update : July 24th, 2024

// Purpose : Define the Cell class

/* Future Plans
   - Add an iterator that iterates through time intervals (i.e. one iteration
     is representative of one second)
   - Switch all string variables in dictioaries to ENUMs
*/

import Repressor from './repressor.js';
import Permease from './permease.js';
import Bgal from './bGal.js';
import Genome from './GenomeInfo.js';
import CAPcAMP from './cc_Complex.js';

// Overarching class that controls all data from lactose operon
class Cell {
    // Constructor
    // Pre : PARAM mutList is a dictionary,
    //       PARAM allo is a number variable,
    //       PARAM lacIn is a number variable, PARAM lacOut is a number variable,
    //       PARAM glu is a number variable,
    //       PARAM capStatus is a string variable (default = "Inactive")
    //       PARAM time is a number variable (default = 400) !!!!! NOT USED - PARAM for later function!!!!!
    // Post : FIELD permNum is set to '0'; FIELD bgalNum  is set to '0';
    //        FIELD gluGal is set to PARAM glu;
    //        FIELD DNA is set to Genome(PARAM mutList) [delegate];
    //        FIELD plasmid is set to 'false';
    //        FIELD pasmid_date is set to 'null';
    //        FIELD allo is set to PARAM allo;
    //        FIELD lacIn is set to PARAM lacIn; FIELD lacOut is set to PARAM lacOut;
    //        FIELD rep is set to '[]' !!!!! PRONE TO CHANGE? !!!!!;
    //        FIELD CAP = CAPcAMP(PARAM capStatus) [delegate];
    constructor(mutList, allo, lacIn, lacOut, glu, capStatus = "Inactive", time = 400) {
        this.permEnz = [];
        this.bgalEnz = [];
        this.archiveConditions = {"perm":[], "bgal":[], "allo":[], "lacIn":[], "lacOut":[], "glucose + galactose":[]};
        this.time = 0.0;
        this.permNum = 0;  // !!!!! NOT USED
        this.bgalNum = 0;  // !!!!! NOT USED
        this.gluGal = glu;
        this.DNA = new Genome(mutList);
        this.plasmid = false;
        this.plasmid_data = null;
        this.allo = allo;
        this.lacIn = lacIn;
        this.lacOut = lacOut;
        this.rep = []; //new Repressor(this.get_mutation('RepMutation', this.DNA))
        this.CAP = new CAPcAMP(capStatus);
    }

    // plasmid, plasmid_data Mutator
    // Updates the class with sequence data for a plasmid
    // Pre : PARAM plasmid_Mut is a ___ variable
    // Post : FIELD plasmid_data is set to Genome(PARAM plasmid_Mut);
    //        FIELD plasmid is set to 'true'
    add_plasmid(plasmid_Mut) {
        this.plasmid_data = new Genome(plasmid_Mut);
        this.plasmid = true;
    }

    // Helper Function to translate, backgroundTranscription, generateData
    // Retrieves mutation from genome object, checks both DNA genome object and
    // plasmid genome object
    // Returns gene_data (location.mut[mutation])
    // Pre : PARAM mutation is a string variable,
    //       PARAM location is a Genome object
    // Post : none
    get_mutation(mutation, location) {
        const gene_data = location.mut[mutation];
        return gene_data;
    }

    // <Description Missing>
    // Pre : none
    // Post : FIELD allo is incremented by '2' if FIELD lacOut is greater than
    //        50 and FIELD DNA.mut["PermMutation"] is 'null'     
    signal() {
        if(this.lacOut > 50 && this.DNA.mut["PermMutation"]===null) {
            this.allo += 2;
        }
    }

    // Increases the amount of enzyme class objects (the number of new objects
    // vary based on whether the CAPcAMP complex is active or not active)
    // The previous number of objects is recorded to be used in graph data
    // Utilizes Function(s)...<location class>.transcribe, get_mutation, CAPcAMP.get_status,
    //                        Math.random
    // Pre : location is a Genome object
    // Post : Bgal(get_mutation("BgalMutation", PARM location)) objects are
    //        appended to FIELD? bgalEnz as appropriate
    //        Permease(get_mutation("PermMutation", PARM location)) objects are
    //        appended to FIELD? permEnz as appropriate
    translate(location){
        if(location.transcribe(this.allo, this.lacOut, this.rep, this.gluGal)) {
            if(location == this.DNA){
                let transNum = 1;
                if(this.CAP.get_status(this.gluGal)){
                    transNum = 6;
                }
                for(let i=0; i<transNum; i++) {
                    for(const [gene, value] of Object.entries(location.mut)) {
                        if(gene == "BgalMutation" && value === null) {
                            if((Math.floor(Math.random() * 8) + 1) == 1) { 
                                this.bgalEnz.push(new Bgal(this.get_mutation("BgalMutation", location)));
                            }
                            this.bgalEnz.push(new Bgal(this.get_mutation("BgalMutation", location)));
                        }
                        if(gene == "PermMutation" && value === null) {
                            this.permEnz.push(new Permease(this.get_mutation("PermMutation", location)));
                    }
                }
                
            } else {
                for(const [gene, value] of Object.entries(location.mut)) {
                    if(gene == "BgalMutation" && value === null) {
                        this.bgalEnz.push(new Bgal(this.get_mutation("BgalMutation", location)));
                    }
                    if(gene == "PermMutation" && value === null) {
                        this.permEnz.push(new Permease(this.get_mutation("PermMutation", location)));
                    }
                }
            }
        }

    }

    // !!!!! Purpose of Function is Unknown !!!!!
    // Mimics degradation lactose operon proteins
    // Pre : none
    // Post : the last element of FIELD permEnz and FIELD bgalEnz is removed
    degrade() { //// what is the purpose of this?? -> value isn't even used
        let degrade_rate = (this.permEnz.length + this.bgalEnz.length) / 10;
        if(degrade_rate == 0) {
            degrade_rate == 1;
        }
        for (let i = 0; i < degrade_rate; i++) {
            const num = Math.floor(Math.random() * 2) + 1;
            if(num == 1) {
                if(this.permEnz) {
                    this.permEnz.pop(); //pops last
                }
                if(this.bgalEnz) {
                    this.bgalEnz.pop();
                }
            }
        }
    }

    // Creates small amounts of protein
    // Biologically occurs even if the lac operon is being regulated
    // Utilizes Function(s)...get_mutation, Math.random
    // Pre : location is a Genome object
    // Post : a Permease object is added to FIELD permEnz;
    //        a Bgal object is added to FIELD bgalEnz
    backgroundTranscription(location) {
        if(this.get_mutation("RepMutation", this.DNA) == "lacIs") {
            return;
        }
        if(this.plasmid) {
            if(this.get_mutation("RepMutation", this.plasmid_data) == "lacIs") {
                return;
            }
        }
        const num = Math.floor(Math.random()*12) + 1;
        if(num == 1) {
            if (this.get_mutation("PermMutation", location) == null) {
                this.permEnz.push(new Permase(this.get_mutation("PermMutation", location)));
            }
            if (this.get_mutation("BgalMutation", location) == null) {
                this.bgalEnz.push(new Bgal(this.get_mutation("BgalMutation", location)));
            }
        }
    }

    // Activates all lactose operon enzymes within the cell
    // Utilizes Function(s)...Permease.rate, Bgal.catalyze
    // Pre : none
    // Post : the current values of FIELD allo, FIELD lacIn, FIELD lacOut, and
    //        FIELD gluGal are added to FIELD archiveConditions;
    //        FIELD lacOut is set according to the first value returned by
    //        Permease.rate with the last Permease object in FIELD permEnz;
    //        FIELD lacIn is set according to the second value returned by
    //        Permease.rate with the last Permease object in FIELD permEnz and,
    //        when the second values returned by Bgal.catalyze calls are "lac",
    //        decremented by each first value returned by the call;
    //        FIELD allo, when the second values returned by Bgal.catalyze calls
    //        are "lac", is incremented by each first value returned by the call
    //        and, when the second values returned by Bgal.catalyze are "allo",
    //        is decremented by each first value returned by the call;
    //        FIELD gluGal, when the second values returned by Bgal.catalyze calls
    //        are "allo", is incremented by each first value returned by the call
    activeEnzymes() {
        this.archiveConditions["allo"].push(this.allo);
        this.archiveConditions["lacIn"].push(this.lacIn);
        this.archiveConditions["lacOut"].push(this.lacOut);
        this.archiveConditions["glucose + galactose"].push(this.gluGal);
        for(let item of this.permEnz) {
            var change = item.rate(this.lacOut, this.lacIn);
            this.lacOut = change["lacOut"];
            this.lacIn = change["lacIn"];
        }
        for(let item of this.bgalEnz) {
            change = item.catalyze(this.lacIn, this.allo);
            this.lacIn += change["lac"];
            this.allo += change["allo"];
            this.gluGal += change["gluGal"];
        }
    }

    // Occurs independent of permease protein
    // Utilizes Function(s)...Math.random
    // Pre : none
    // Post : if num (random number) is equal to '1', FIELD lacIn is greater
    //        than '0', and FIELD lacOut is greater than '1.0', then
    //        FIELD lacOut is decremented by '0.2', and
    //        FIELD lacIn is incremented by '0.2'
    backGroundTransport() {
        if(this.lacIn > 0 && this.lacOut > 0) {   // !!!!! condition necessary?
            const num = Math.floor(Math.random()*3) + 1;
            if(num == 1 && this.lacOut > 1.0) {
                this.lacOut -= 0.2;
                this.lacIn += 0.2;
            }
        }
    }

    // Generates data used in graphical output
    // Essentially a driver for the cell class that runs the cell object for
    // a default of 400 iterations ~main function
    // Utilizes Function(s)...get_mutation, translate, backgroundTranscription,
    //                        activeEnzymes, backgroundTransport
    // Pre : PARAM time is a number variable
    // Post : cell activity is simulated for a default of 400 iterations
    generateData(time = 400.0) {
        // resetting field values
        this.permEnz = [];
        this.bgalEnz = [];
        this.archiveConditions = {"perm":[], "bgal":[],
                                 "allo":[], "lacIn":[],
                                 "lacOut":[], "glucose + galactose":[]};
        this.time = 0;
        while(this.time < time) { // 400 is a the arviturary time set for the simulation to run
            this.archiveConditions["perm"].push(this.permEnz.length);
            this.archiveConditions["bgal"].push(this.bgalEnz.length);
            // repressor
            this.rep.push(new Repressor(this.get_mutation("RepMutation", this.DNA)))
            if (this.plasmid && this.plasmid_data.has("RepMutation")) {
                this.rep.push(new Repressor(this.get_mutation("RepMutation", this.plasmid_data)));
            }
            // translation
            this.translate(this.DNA)
            if(this.plasmid) { 
                this.translate(this.plasmid_data);
                if(this.get_mutation("ProMutation", this.plasmid_data) === null) {
                    this.backgroundTranscription(this.plasmid_data);
                }
            }
            if(this.get_mutation("ProMutation", this.DNA) === null) {
                this.backgroundTranscription(this.DNA);
            }
            // degradataion 
            if(this.lacOut + this.lacIn + this.allo < (Math.floor(Math.random()*51)) && !(this.DNA.transcribe(this.allo, this.lacOut, this.rep, this.gluGal))) { /////fix random + "and not"
                this.degrade();
            }
            // enzyme activity
            this.activeEnzymes();
            this.backGroundTransport();
            this.time = this.time + 1;
        }
    }
}
        
export default Cell;
