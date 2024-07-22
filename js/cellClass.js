import Repressor from './repressor.js';
import Permase from './permease.js';
import Bgal from './bGal.js';
import Genome from './GenomeInfo.js';
import CAPcAMP from './cc_Complex.js';

/* Overarching class that controls all data from lactose operon */
class Cell {
    constructor(mutList, allo, lacIn, lacOut, glu, capStatus = "Inactive", time = 400) {
        this.permEnz = [];
        this.bgalEnz = [];
        this.archiveConditions = {"perm":[], "bgal":[], "allo":[], "lacIn":[], "lacOut":[], "glucose + galactose":[]};
        this.time = 0.0;
        this.permNum = 0;
        this.bgalNum = 0;
        this.gluGal = glu;
        this.DNA = new Genome(mutList);
        this.plasmid = false;
        this.plasmid_data = null;
        this.allo = allo;
        this.lacIn = lacIn;
        this.lacOut = lacOut;
        this.rep = []; // new Repressor(this.get_mutation('RepMutation', this.DNA))
        this.CAP = new CAPcAMP(capStatus);
    }

    add_plasmid(plasmid_Mut){
        /* Updates the class with Sequence data for a plasmid */
        this.plasmid_data = new Genome(plasmid_Mut);
        this.plasmid = true;
    }
    get_mutation(mutation, location){
        /* Retrieves mutation from genome object, checks both DNA genome object and plasmid Genome object. */
        const gene_data = location.mut[mutation];
        return gene_data;
    }
    signal() {
        if(this.lacOut > 50 && this.DNA.mut["PermMutation"]===null) {
            this.allo += 2;
        }
    }
    translate(location){
        /* Increases the amount of enzyme class objects, the number of new objects 
        varies based of wether the CAP-cAMP complex is is active or not. The previouse
        number of objects is recorded to be used in graph data later. */
        if(location.transcribe(this.allo, this.lacOut, this.rep, this.gluGal)) {
            if(location == this.DNA){
                var transNum = 1;
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
                            this.permEnz.push(new Permase(this.get_mutation("PermMutation", location)));
                        }
                    }
                }
            } else {
                for(const [gene, value] of Object.entries(location.mut)) {
                    if(gene == "BgalMutation" && value === null) {
                        this.bgalEnz.push(new Bgal(this.get_mutation("BgalMutation", location)));
                    }
                    if(gene == "PermMutation" && value === null) {
                        this.permEnz.push(new Permase(this.get_mutation("PermMutation", location)));
                    }
                }
            }
        }
    }
    degrade() {
        /* Mimics degradation lactose operon proteins */
        var degrade_rate = (this.permEnz.length + this.bgalEnz.length) / 10;
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

    backgroundTranscription(location) {
        /* biologicaly occures even if the lac operon is being regulated,
         and creates small amounts of protein */
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

    activeEnzymes() {
        /* Activates all lactose operon enzymes within cell, meaning
        that the all enzymes will be passes the sugar values and then
        then calculate the change in each concentration based on */
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

    backGroundTransport() {
        /* Background trasnport occures occures independant of
        permease protein. */
        if(this.lacIn > 0 && this.lacOut > 0) {
            const num = Math.floor(Math.random()*3) + 1;
            if(num == 1 && this.lacOut > 1.0) {
                this.lacOut -= 0.2;
                this.lacIn += 0.2;
            }
        }
    }

    generateData(time = 400.0) {
        /* Generates Data used in graphical output, essentially a driver
        for the cell class that runs the cell object for 400 iterations. */
        this.permEnz = [];
        this.bgalEnz = [];
        this.archiveConditions = {"perm":[], "bgal":[],
                                 "allo":[], "lacIn":[],
                                 "lacOut":[], "glucose + galactose":[]};
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
