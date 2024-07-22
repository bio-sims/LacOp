class Permase {
    /* mimics permease membrane protein, is constructed with either no mutation
    or a non-functional mutation (lacY-).

    Biological meaning: the lacY- mutant is a non-functional protein that is
    constructed at the same rate as a WT Protein

    Implemenation invariance: the lacY- causes the rate function to always increment
    the passed in doubles by 0. */

    static permeaseMut = {"none":0.2, "lacY-":0.0 };

    constructor(mut){
        this.mut = mut; //allows for some permease to have mutations
        this.age = 0;
    }
    rate(lacO, lacI){
        //affects equilibrium of permease
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

export default Permase;
