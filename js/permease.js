// Author : 
// Edited By : Gina Philipose, Rena Ahn, Zachary Mullen
// JavaScript File : permease.js
//   Original File : Python
//   Translated By : Gina Philipose
// Last Updated : July 24th, 2024

// Purpose : Define the Permease class

// Dictionary of equilibrium constants based on mutation
const permeaseMut = { "none":0.2, "lacY-":0.0 };

// Mimics permease membrane protein and is constructed with either no mutations
// or a non-functional mutation lacY-

/* Additional Information on LacY-
   - Biological Meaning: non-functional protein that is constructed at the same
                         rate as a WT protein
   - Implementation Invariance: it causes the rate function to always increment
                                the passed in doubles by 0
*/
class Permease {
    // static permeaseMut = {"none":0.2, "lacY-":0.0 };
    // !!!!! Better as a separate constant - static variables can be reassigned !!!!!

    // Constructor
    // Pre : PARAM mut is a string variable
    // Post : FIELD mut is set to PARAM mut;
    //        FIELD age is set to '0'
    constructor(mut) {
        this.mut = mut; //allows for some permease to have mutations
        this.age = 0;
    }

    // Affects the equilibrium of permease
    // Returns an array of two values...
    //   (1) if lacO is greater than 1.0, lacO - permeaseMut[this.mut ?? "none"]
    //       otherwise, lacO
    //   (2) if lacO is greater than 1.0, lacI + permeaseMut[this.mut ?? "none"]
    //       otherwise, lacI
    // Pre : lacO is a number variable, lacI is a number variable
    // Post : FIELD age is incremented by '1'
    rate(lacO, lacI) {   // !!!!! change PARAM names to lacOut, lacIn?
        this.age += 1;
        if(lacO > 1.0){
            //permease is based on a equilibrium, need to do research here
            return {
                lacOut: lacO - Permase.permeaseMut[this.mut ?? "none"],
                lacIn: lacI + Permase.permeaseMut[this.mut ?? "none"]
            }
        }
        return {lacOut: lacO, lacIn: lacI};
    }

}

export default Permease;
