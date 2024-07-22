class Genome {
    constructor(mutations){
        this.mut = mutations;
        this.counter = 0;
    }
    has(item){
        if(item in this.mut) {
            return true;
        } 
        return false;
    }

    transcribe(allo, lacOut, rep, glucose) {
        /* Checks status of both operator and promoter and if both are True
        then transcription can occur */
        if(this.operator(allo, lacOut, rep, glucose) && this.promoter()) {
            return true;
        }
        return false;
    }
    promoter(){
        /* Models the Lactose operon promoter and simply return True
        if no mutation and False otherwise.

        Future notes:
        Promoter research article
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC178712/pdf/1790423.pdf
        */
        return this.mut["ProMutation"] === null;
    }
    operator(allo, lacOut, rep, glucose){
        /* Lactose operon operator, if there is no mutation within the operator
        then the repressor may be checked. Else operator will always be active.
        When lactose is present in the enviroment then other compounds within the
        cell will be converted to allo, thus the += 5 in the pressence of lacOut.

        Returns:
            Bool true or false, represents operator on or off.
        pre:
            only is affected by repressor when no mutations */
        if(this.mut["OpMutation"] === null) {
            for(let r of rep) {
                if(!(r.bound(allo, lacOut, glucose))) {
                    return false;
                }
            }
        }
        return true;
    }
}

export default Genome;
