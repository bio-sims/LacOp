// Author : 
// Edited By : Gina Philipose, Rena Ahn, Zachary Mullen
// JavaScript File : bGal.js
//   Original File : Python
//   Translated By : Gina Philipose
// Last Update : June 24th, 2024

// Purpose : Define the Bgal class

// Mimics the functionality of BetaGalactisidase (B-Gal), assuming Mg is a
// cofactor and reaction takes place at 30 degrees C
class Bgal {
    // Bgal Constructor
    // Pre : PARAM mut is a string value
    // Post : FIELD mut is set to PARM mut;
    //        FIELD age is set to '0'
    constructor(mut) {
        this.mut = mut;
        this.age = 0;
    }

    // Handles BetaGalactisidase catalyzation
    // Utilizes function(s)... Lrate(lacIn), Arate(allo), Math.random()
    // Returns different sets of a number value and a string value ('lac' or 'allo')
    // depending on the value of PARM lacIn, PARM allo, and choice (value is random)
    // Pre : PARAM lacIn is a number variable, PARAM allo is a number variable
    // Post : FIELD age incremented by '1'
    catalyze(lacIn, allo){
        this.age += 1;

        const p = (lacIn/(allo+lacIn));
        const choice = Math.random();
        let changes = {
            "lac": 0,
            "allo": 0,
            "gluGal": 0
        };
        if (this.mut == "lacZ-" || allo < 1 && lacIn < 1){
            return changes;
        }
        if (choice < p && lacIn > 1) {
            const change = this.Lrate(lacIn);
            changes["lac"] = change * -1;
            changes["allo"] = change;
        } else if(allo > 1){
            const change = this.Arate(allo);
            changes["allo"] = change * -1;
            changes["gluGal"] = change;
        }
        return changes;
    }

    // Uses the Michaelis menten equation and the current concentration of allolactose to
    // determine the rate of the amount of allolactose reduced
    // Returns (VmaxAllo * allo) / (KmAllo + allo) if FIELD mut = None
    // Pre : PARAM allo is a number variable
    // Post : none
    Arate(allo) {
        const KmAllo = 9400; // in uM, and found from:http://www.uniprot.org/uniprot/P00722
        const VmaxAllo = 4.97; // in umol/min/mg[E] and found from:http://www.uniprot.org/uniprot/P00722
        if (this.mut === null) {
            const v = (VmaxAllo * allo) / (KmAllo + allo);
            return v;
        }
    }

    // Uses the Michaelis menten equation and the current concentration of lactose to determine
    // the rate or the amount of lactose reduced
    // Returns (VmaxLactose * lacIn) / (KmLactose + lacIn) if FIELD mut = None
    // Pre : PARAM lacIn is a number variable
    // Post : none
    Lrate(lacIn){
        const KmLactose = 1350.0; //Found from:http://www.uniprot.org/uniprot/P00722
        const VmaxLactose = 30.9; //Found from:http://www.uniprot.org/uniprot/P00722
        if (this.mut === null){
            const v = (VmaxLactose * lacIn) / (KmLactose + lacIn); // Michaelis-menten equation
            return v;
        }
    }
}

export default Bgal;
