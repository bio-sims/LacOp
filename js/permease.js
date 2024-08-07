// Author : Richard Charczenko
// Edited By : Gina Philipose, Rena Ahn, Zachary Mullen
/* JavaScript File : permease.js
     The original File was a Python file (permease.py) hosted with Flask
     Translation By : Gina Philipose, Zachary Mullen
*/
// Last Updated : August 7th, 2024

// Purpose : Define the Permease class

// Mimics permease membrane protein and is constructed with either no mutations
// or a non-functional mutation lacY-
/* Additional Information on LacY-
   - Biological Meaning: non-functional protein that is constructed at the same
                         rate as a WT protein
   - Implementation Invariance: it causes the rate function to always increment
                                the passed in doubles by 0
*/
class Permease {
    // Equilibrium constants based on mutation
    static permeaseMut = { "none":0.2, "lacY-":0.0 };
    // ??? Make a separate constant - static variables can be reassigned

    // Constructor
    // Pre : PARAM mut is a string variable
    // Post : FIELD mut is set to PARAM mut;
    //        FIELD age is set to '0'
    constructor(mut) {
        this.mut = mut; // allows for some permease to have mutations
        this.age = 0;
    }

    // Affects the equilibrium of permease
    // Returns an array of two values...
    //   (1) if lacOut is greater than 1.0, lacOut - permeaseMut[this.mut ?? "none"]
    //       otherwise, lacOut
    //   (2) if lacOut is greater than 1.0, lacIn + permeaseMut[this.mut ?? "none"]
    //       otherwise, lacIn
    // Pre : PARAM lacOut is a number variable, PARAM lacIn is a number variable
    // Post : FIELD age is incremented by '1'
    rate(lacOut, lacIn) {
        this.age += 1;
        if(lacOut > 1.0){
            return {
                lacOut: lacOut - Permease.permeaseMut[this.mut ?? "none"],
                lacIn: lacIn + Permease.permeaseMut[this.mut ?? "none"]
            }
        }
        return {
            lacOut: lacOut,
            lacIn: lacIn
        };
    }

}

export default Permease;
