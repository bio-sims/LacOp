class Bgal{
    /* mimics the functionality of B-Gal, assuming Mg is a cofactor
    and reaction takes place at 30 degrees C. */
    constructor(mut){
        this.mut = mut;
        this.age = 0;
    }
    catalyze(lacIn, allo){
        /* Handles BetaGalactisidase catalyzation */
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

    Arate(allo) {
        /* Uses the Michaelis menten equation and the current concentration of allolactose
        to determine the rate or the amount of allolactose reduced */
        const KmAllo = 9400; // in uM, and found from:http://www.uniprot.org/uniprot/P00722
        const VmaxAllo = 4.97; // in umol/min/mg[E] and found from:http://www.uniprot.org/uniprot/P00722
        if (this.mut === null) {
            const v = (VmaxAllo * allo) / (KmAllo + allo);
            return v;
        }
    }

    Lrate(lacIn){
        /* Uses the Michaelis menten equation and the current concentration of lactose
        to determine the rate or the amount of lactose reduced */
        const KmLactose = 1350.0; //Found from:http://www.uniprot.org/uniprot/P00722
        const VmaxLactose = 30.9; //Found from:http://www.uniprot.org/uniprot/P00722
        if (this.mut === null){
            const v = (VmaxLactose * lacIn) / (KmLactose + lacIn); // Michaelis-menten equation
            return v;
        }
    }
}

export default Bgal;
