// Author : 
// Edited By: Gina Philipose, Rena Ahn, Zachary Mullen
// JavaScript File : cc_Complex.js
//   Original File : Python
//   Translated By : Gina Philipose
// Last Update : July 24th, 2024

// Purpose : Define the CAPcAMP class

class CAPcAMP {
    // Constructor
    // Pre : PARAM status is a string variable (preferred)
    // Post : FIELD status is set to 'false' if PARM status == "Inactive"
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
    get_status(glucose) {
        if(glucose > 100) {
            return false;
        }
        return this.status; // if(glucose <= 100)
    }
}

export default CAPcAMP;
