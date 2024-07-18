

class CAPcAMP {
    constructor(status) {
        if(status == "Inactive") {
            this.status = false;
        } else {
            this.status = true;
        }
    }
    get_status(glucose) {
        if(glucose > 100) {
            return false;
        }
        return this.status; // if(glucose <= 100)
    }
}
export default CAPcAMP;