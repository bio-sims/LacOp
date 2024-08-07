// Author : Richard Charczenko
// Edited by : Gina Philipose, Rena Ahn, Zachary Mullen
/* JavaScript File : genomeInfo.js
     The original File was a Python file (GenomeInfo.py, version 2) hosted with Flask
     Translation By : Gina Philipose, Zachary Mullen
*/
// Last Update : August 7th, 2024

// Purpse : Define the Genome class

class Genome {
    // Constructor
    // Pre : PARAM mutations is a dictionary
    // Post : FIELD mut is set to PARAM mutations
    constructor(mutations) {
        this.mutations = mutations;
    }

    // Returns true if PARAM item is in FIELD mut, returns false otherwise
    // Pre : PARAM item is a string variable (recommended for proper output)
    // Post : none
    has(item) {   // Note : originally try-catch statement
        if(item in this.mutations) {
            return true;
        } 
        return false;
    }

    // Checks the status of both operator and promoter
    // Returns 'true' if both are true (transcription can occur), and
    // returns 'false' otherwise
    // Utilizes Function(s)...operator, promoter
    // Pre : PARAM allo is a number variable,
    //       PARAM lacOut is a number variable,
    //       PARAM rep is a list of repressor variables,
    //       PARAM glucose is a number variable
    // Post : none
    transcribe(allo, lacOut, rep, glucose) {
        if(this.operator(allo, lacOut, rep, glucose) && this.promoter()) {
            return true;
        }
        return false;
    }

    // Models the Lactose operon promoter
    // Returns 'true' if no mutation, returns 'false' otherwise
    // Pre : none
    // Post : none
    promoter() {
        return this.mutations["ProMutation"] === null;
    }
    /* Future notes:
        - Promoter research article
            https://www.ncbi.nlm.nih.gov/pmc/articles/PMC178712/pdf/1790423.pdf
    */

    // Models the Lactose operon operator
    // If there is no mutation within the operon then the repressor may be checked
    // Else the operator will always be active
    // Returns 'true' if the operator is on, 'false' otherwise
    // Utilizes Function(s)...Repressor.bound
    // Pre : PARAM allo is a number variable,
    //       PARAM lacOut is a number variable,
    //       PARAM rep is a list of repressor variables,
    //       PARAM glucose is a number variable
    // Post : none
    operator(allo, lacOut, rep, glucose) {
        if(this.mutations["OpMutation"] === null) {
            for(let r of rep) {
                if(!(r.bound(allo, lacOut, glucose))) {
                    return false;
                }
            }
        }
        return true;
    }

    // Note : originally FIELD counter, FIELD visited, FUNC __iter__, FUNC next,
    //        FUNC __str__ were implemented
}

export default Genome;
