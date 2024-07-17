// is static used correctly here


class Repressor {
    /* Mimics repressor protein function, but in lacop program we assume
    that the repressor protein concentration is constant. If repressor is
    unbound that is represented as the boolean True */

    //is static correct to use here for class variables?
    static repressorMut = {null: "active", "lacI-": "inactive", "lacIs": "stuck"};

    constructor(mut) { 
        this.status = this.repressorMut[mut];
    }

    bound(allo, Le, glu) {
        if (this.status == "stuck") {
            return false;
        }
        if (this.status == "active") {
            return self.conditionCheck(allo, Le, glu);
        }
        return true; //if(this.status == "inactive")
    }

    conditionCheck(allo, Le, glu){
        /* ork needs to be done
        I need the [S] vs bound Repressor info in order to
        accuratly tell if rep is on or off
        below is all tentative work */
        allo = allo - (glu/2);
        const pBound = (allo / 100.0); // tentative equation
        const num = Math.random();
        return (num < pBound); // or Le > 50
    }
}

export default Repressor;