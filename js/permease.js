// 7/9/2024

/* Author: Richard Charczenko
Last Edited: 11/20/2018

Any research articles for permease should be listed below: */

class permease {
    /* mimics permease membrane protein, is constructed with either no mutation
    or a non-functional mutation (lacY-).

    Biological meaning: the lacY- mutant is a non-functional protein that is
    constructed at the same rate as a WT Protein

    Implemenation invariance: the lacY- causes the rate function to always increment
    the passed in doubles by 0. */

    static permeaseMut = {null:0.2, "lacY-":0.0 };

    constructor(mut){
        this.mut = mut; //allows for some permease to have mutations
        this.age = 0;
    }
    rate(lacO, lacI){
        //affects equilibrium of permease
        this.age += 1;
        if(lacO > 1.0){
            //permease is based on a equilibrium, need to do research here
            return (lacO - this.permeaseMut[this.mut]), (lacI + this.permeaseMut[this.mut])

        }
        return lacO, lacI;
    }

}


export default permease;