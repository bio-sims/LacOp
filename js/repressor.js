// Author : 
// Edited By : Gina Philipose, Rena Ahn, Zachary Mullen
// JavaScript File : repressor.js
//   Original File : Python
//   Translated By : Gina Philipose
// Last Updated : July 24th, 2024

// Purpose : Define the Repressor class

// Mimics the function of repressor protein
// Assumption : the repressor protein concentration is constant

class Repressor {
    static repressorMut = {"none": "active", "lacI-": "inactive", "lacIs": "stuck"};
    // !!!!! Better as a constant? - static variables can be reassigned !!!!!

    // Constructor
    // Pre : PARAM mut is a string variable
    // Post : FIELD status is set to "stuck", "inactive", or "active"
    constructor(mut) {
        this.status = Repressor.repressorMut[mut ?? "none"] ?? "active";
    }

    // Returns 'false' if FIELD status is equal to "stuck",
    // returns 'true' if FIELD status is equal to "inactive", and
    // returns the value of conditionCheck(allo, Le, glu) if FIELD status is
    // equal to "active"
    // Utilizes Function(s)...conditionCheck
    // Pre : PARAM allo is a number variable,
    //       PARAM Le is a ___ variable !!!!! why capitalized?
    //       PARAM glu is a number variable
    bound(allo, Le, glu) {
        if (this.status == "stuck") {
            return false;
        }
        if (this.status == "active") {
            return this.conditionCheck(allo, Le, glu);
        }
        return true; //if(this.status == "inactive")
    }

    // Utilizes Function(s)...Math.random
    // Pre : PARAM allo is a number variable,
    //       PARAM Le is a ___ variable,
    //       PARAM glu is a number variable
    conditionCheck(allo, Le, glu){
        /* Work needs to be done
           - the [S] vs bound Repressor info is needed to accurately tell if
             rep is on or off, below is all tentative work
        */
        allo = allo - (glu/2);
        const pBound = (allo / 100.0); // tentative equation
        const num = Math.random();
        return (num < pBound); // or Le > 50
    }
}

export default Repressor;
