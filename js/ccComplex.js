// Author : Richard Charczenko
// Edited By: Gina Philipose, Rena Ahn, Zachary Mullen
/* JavaScript File : ccComplex.js
     The original File was a Python file (cc_Complex.py) hosted with Flask
     Translation By : Gina Philipose, Zachary Mullen
*/
// Last Update : August 7th, 2024

// Purpose : Define the CAPcAMP class

class CAPcAMP {
    // Constructor
    // Pre : PARAM status is a string variable (recommended for proper output)
    // Post : FIELD status is set to 'false' if PARM status equals "Inactive"
    //        Otherwise, FIELD status is set to 'true'
    constructor(status) {
        if(status == "Inactive") {
            this.status = false;
        } else {
            this.status = true;
        }
    }

    // status Accessor
    // Returns false if the value of PARM glucose if greater than 100
    // Otherwise, returns the value of FIELD status
    // Pre : PARAM glucose is a number variable
    // Post : none
    getStatus(glucose) {
        if(glucose > 100) {
            return false;
        }
        return this.status; // if(glucose <= 100)
    }
}

export default CAPcAMP;
