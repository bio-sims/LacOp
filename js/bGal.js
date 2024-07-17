// 7/11/2024

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
        if (this.mut == "lacZ-"){
            return 0, "lac";
        }
        if (allo < 1 && lacIn < 1){
            return 0, "lac";
        }
        if (choice < p && lacIn > 1) {
            return self.Lrate(lacIn), "lac";
        }
        if(allo > 1){
            return self.Arate(allo), "allo";
        }
        return 0, "allo";
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