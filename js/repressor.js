// Author : Richard Charczenko
// Edited By : Gina Philipose, Rena Ahn, Zachary Mullen
/* JavaScript File : repressor.js
     The original File was a Python file (repressor.py) hosted with Flask
     Translation By : Gina Philipose, Zachary Mullen
*/
// Last Updated : August 7th, 2024

// Purpose : Define the Repressor class

// Mimics the function of repressor protein
// Assumption : the repressor protein concentration is constant

class Repressor {
    static repressorMut = {"none": "active", "lacI-": "inactive", "lacIs": "stuck"};
    // ??? Make a constant - static variables can be reassigned

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
    //       PARAM glucose is a number variable
    bound(allo, glucose) {
        if (this.status == "stuck") {
            return false;
        }
        if (this.status == "active") {
            return this.conditionCheck(allo, glucose);
        }
        return true; //if(this.status == "inactive")
    }

    // <Description Missing>
    // Utilizes Function(s)...Math.random
    // Pre : PARAM allo is a number variable,
    //       PARAM glucose is a number variable
    conditionCheck(allo, glucose){
        allo = allo - (glucose / 2);
        const pBound = (allo / 100.0);
        // Note : pBound was marked to be a tentative equation, [S] vs bound
        //        Repressor info was requested for further improvement
        const num = Math.random();
        return (num < pBound);
    }
}

export default Repressor;
