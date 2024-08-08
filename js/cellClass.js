// Author : Richard Charczenko
// Edited By : Gina Philipose, Rena Ahn, Zachary Mullen
/* JavaScript File : cellClass.js
     The original File was a Python file (cellClass.py) hosted with Flask
     Translation By : Gina Philipose, Zachary Mullen
*/
// Last Update : August 7th, 2024

// Purpose : Define the Cell class

/* Future Plans
   - Add an iterator that iterates through time intervals (i.e. one iteration
     is representative of one second)
   - Switch all string variables in dictioaries to ENUMs
*/

import Repressor from './repressor.js';
import Permease from './permease.js';
import Bgal from './bGal.js';
import Genome from './genomeInfo.js';
import CAPcAMP from './ccComplex.js';

// Overarching class that controls all data from lactose operon
class Cell {
    // Constructor
    // Pre : PARAM mutList is a dictionary,
    //       PARAM allo is a number variable,
    //       PARAM lacIn is a number variable, PARAM lacOut is a number variable,
    //       PARAM glucose is a number variable,
    //       PARAM capStatus is a string variable (default = "Inactive")
    //       PARAM time is a number variable (default = 400)
    // Post : FIELD permEnz is a list of Permease objects;
    //        FIELD bGalEnz is a list of Bgal objects;
    //        FIELD archiveConditions is a dictionary storing past values;
    //        FIELD gluGal is set to PARAM glucose;
    //        - glucose is sufficient to represent glucose+galactose
    //        FIELD DNA is set to Genome(PARAM mutList) [delegate];
    //        FIELD plasmid is set to 'false';
    //        FIELD pasmidData is set to 'null';
    //        FIELD allo is set to PARAM allo;
    //        FIELD lacIn is set to PARAM lacIn; FIELD lacOut is set to PARAM lacOut;
    //        FIELD rep is set to '[]';
    //        FIELD CAP = CAPcAMP(PARAM capStatus) [delegate];
    constructor(mutList, allo, lacIn, lacOut, glucose, capStatus = "Inactive", time = 400) {
        // Note : originally permNum and bgalNum were implemented,
        //        initialized to '0'
        this.permEnz = [];
        this.bgalEnz = [];
        this.archiveConditions = {"perm":[], "bgal":[], "allo":[], "lacIn":[], "lacOut":[], "glucose + galactose":[]};
        this.time = time;
        this.gluGal = glucose;
        this.DNA = new Genome(mutList);
        this.plasmid = false;
        this.plasmidData = null;
        this.allo = allo;
        this.lacIn = lacIn;
        this.lacOut = lacOut;
        this.rep = []; // new Repressor(this.getMutation('RepMutation', this.DNA))
        this.CAP = new CAPcAMP(capStatus);
    }

    // plasmid, plasmidData Mutator
    // Updates the class with sequence data for a plasmid
    // Pre : PARAM plasmidMutations is a dictionary
    // Post : FIELD plasmidData is set to Genome(PARAM plasmidMutations);
    //        FIELD plasmid is set to 'true'
    addPlasmid(plasmidMutations) {
        this.plasmidData = new Genome(plasmidMutations);
        this.plasmid = true;
    }

    // Helper Function to translate, backgroundTranscription, generateData
    // Retrieves mutation from genome object, checks both DNA genome object and
    // plasmid genome object
    // Returns geneData (chromOrPlasmid.mutations[mut])
    // Pre : PARAM mut is a string variable,
    //       PARAM chromOrPlasmid is a Genome object
    //       - suspected to be on a chromosome (equal to this.DNA) or on a
    //         plasmid (??? comparison to this.plasmidData)
    // Post : none
    getMutation(mut, chromOrPlasmid) {
        const geneData = chromOrPlasmid.mutations[mut];
        return geneData;
    }

    // <Description Missing>
    // Pre : none
    // Post : FIELD allo is incremented by '2' if FIELD lacOut is greater than
    //        50 and FIELD DNA.mut["PermMutation"] is 'null'     
    signal() {
        if(this.lacOut > 50 && this.DNA.mutations["PermMutation"] === null) {
            this.allo += 2;
        }
    }

    // Increases the amount of enzyme class objects (the number of new objects
    // vary based on whether the CAPcAMP complex is active or not active)
    // The previous number of objects is recorded to be used in graph data
    // Utilizes Function(s)...Genome.transcribe, getMutation, CAPcAMP.getStatus,
    //                        Math.random
    // Pre : chromOrPlasmid is a Genome object
    //       - suspected to be on a chromosome (equal to this.DNA) or on a
    //         plasmid (??? comparison to this.plasmidData)
    // Post : Bgal(getMutation("BgalMutation", PARAM chromOrPlasmid)) objects
    //        are appended to FIELD bgalEnz as appropriate;
    //        Permease(getMutation("PermMutation", PARAM chromOrPlasmid))
    //        objects are appended to FIELD permEnz as appropriate
    translate(chromOrPlasmid) {
        if(chromOrPlasmid.transcribe(this.allo, this.lacOut, this.rep, this.gluGal)) {
            if(chromOrPlasmid == this.DNA) {
                var transNum = 1;
                if(this.CAP.getStatus(this.gluGal)) {
                    transNum = 6;
                }
                for(let i=0; i<transNum; i++) {
                    for(const [gene, value] of Object.entries(chromOrPlasmid.mutations)) {
                        if(gene == "BgalMutation" && value === null) {
                            if((Math.floor(Math.random() * 8) + 1) == 1) { 
                                this.bgalEnz.push(new Bgal(this.getMutation("BgalMutation", chromOrPlasmid)));
                            }
                            this.bgalEnz.push(new Bgal(this.getMutation("BgalMutation", chromOrPlasmid)));
                        }
                        if(gene == "PermMutation" && value === null) {
                            this.permEnz.push(new Permease(this.getMutation("PermMutation", chromOrPlasmid)));
                        }
                    }
                }
            } else {
                for(const [gene, value] of Object.entries(chromOrPlasmid.mutations)) {
                    if(gene == "BgalMutation" && value === null) {
                        this.bgalEnz.push(new Bgal(this.getMutation("BgalMutation", chromOrPlasmid)));
                    }
                    if(gene == "PermMutation" && value === null) {
                        this.permEnz.push(new Permease(this.getMutation("PermMutation", chromOrPlasmid)));
                    }
                }
            }
        }
    }

    // Mimics degradation lactose operon proteins
    // Utilizes Function(s)...Math.random
    // Pre : none
    // Post : the last element of FIELD permEnz and FIELD bgalEnz is removed
    degrade() {
        let degradeRate = (this.permEnz.length + this.bgalEnz.length) / 10;
        if(degradeRate == 0) {
            degradeRate == 1;
        }
        for (let i = 0; i < degradeRate; i++) {
            const num = Math.floor(Math.random() * 2) + 1;
            if(num == 1) {
                // Note : originally a 'value' variable, initialized to 0, held
                //        the values popped by FIELD permEnz and FIELD bgalEnz;
                //        purpose is unknown
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
    // Utilizes Function(s)...getMutation, Math.random
    // Pre : chromOrPlasmid is a Genome object
    //       - suspected to be on a chromosome (equal to this.DNA) or on a
    //         plasmid (??? comparison to this.plasmidData)
    // Post : a Permease object is added to FIELD permEnz;
    //        a Bgal object is added to FIELD bgalEnz
    backgroundTranscription(chromOrPlasmid) {
        if(this.getMutation("RepMutation", this.DNA) == "lacIs") {
            return;
        }
        if(this.plasmid) {
            if(this.getMutation("RepMutation", this.plasmidData) == "lacIs") {
                return;
            }
        }
        
        const num = Math.floor(Math.random()*12) + 1;
        if(num == 1) {
            if (this.getMutation("PermMutation", chromOrPlasmid) == null) {
                this.permEnz.push(new Permease(this.getMutation("PermMutation", chromOrPlasmid)));
            }
            if (this.getMutation("BgalMutation", chromOrPlasmid) == null) {
                this.bgalEnz.push(new Bgal(this.getMutation("BgalMutation", chromOrPlasmid)));
            }
        }
    }

    // Activates all lactose operon enzymes within the cell
    // Utilizes Function(s)...Permease.rate, Bgal.catalyze
    // Pre : none
    // Post : the current values of FIELD allo, FIELD lacIn, FIELD lacOut, and
    //        FIELD gluGal are added to FIELD archiveConditions;
    //        FIELD lacOut is set according to the "lacOut" value returned by
    //        Permease.rate with the last Permease object in FIELD permEnz;
    //        FIELD lacIn is set according to the "lacIn" value returned by
    //        Permease.rate with the last Permease object in FIELD permEnz;
    //        Then, for each Bgal.catalyze call (one for each item in FIELD bgalEnz)...
    //          (1) the newly set FIELD lacIn is incremented by the returned
    //              "lac" values,
    //          (2) FIELD allo is incremented by the returned "allo" values, and
    //          (3) FIELD gluGal is incremented by the returned "gluGal" values
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
        const num = Math.floor(Math.random()*3) + 1;
        if(num == 1 && this.lacIn > 0 && this.lacOut > 1.0) {
            this.lacOut -= 0.2;
            this.lacIn += 0.2;
        }
    }

    // Generates data used in graphical output
    // Essentially a driver for the cell class that runs the cell object for
    // a default of 400 iterations ~main function
    // Utilizes Function(s)...getMutation, translate, backgroundTranscription,
    //                        Genome.transcribe, degrade, activeEnzymes,
    //                        backgroundTransport, Math.random
    // Pre : none
    // Post : cell activity is simulated for a default of 400 iterations
    generateData() {
        // resetting field values
        this.permEnz = [];
        this.bgalEnz = [];
        this.archiveConditions = {"perm":[], "bgal":[],
                                 "allo":[], "lacIn":[],
                                 "lacOut":[], "glucose + galactose":[]};
        // simulating activity
        let counter = 0;
        while(counter < this.time) {
            this.archiveConditions["perm"].push(this.permEnz.length);
            this.archiveConditions["bgal"].push(this.bgalEnz.length);
            // repressor
            this.rep.push(new Repressor(this.getMutation("RepMutation", this.DNA)))
            if (this.plasmid && this.plasmidData.has("RepMutation")) {
                this.rep.push(new Repressor(this.getMutation("RepMutation", this.plasmidData)));
            }
            // translation
            this.translate(this.DNA)
            if(this.plasmid) { 
                this.translate(this.plasmidData);
                if(this.getMutation("ProMutation", this.plasmidData) === null) {
                    this.backgroundTranscription(this.plasmidData);
                }
            }
            if(this.getMutation("ProMutation", this.DNA) === null) {
                this.backgroundTranscription(this.DNA);
            }
            // degradataion
            if((this.lacOut + this.lacIn + this.allo) < (Math.floor(Math.random() * 51))
               && !(this.DNA.transcribe(this.allo, this.lacOut, this.rep, this.gluGal))) {
                this.degrade();
            }
            // enzyme activity
            this.activeEnzymes();
            this.backGroundTransport();
            counter = counter + 1;
        }
    }
}
        
export default Cell;
