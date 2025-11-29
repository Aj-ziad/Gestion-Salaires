class Personne {
    #id 
    #nom 
    #prenom 
    #anneNaissance 
    #rue 
    #ville 
    #nbPersonnes
construtor(nom,prenom,anneNaissance,rue,ville){

    this.#nom = nom
      this.#prenom = prenom
        this.#anneNaissance = anneNaissance
        this.#rue= rue
        this.#ville= ville
}
calculAge(){
    return age=new Date()-this.#anneNaissance

}

 #calculerSalaire(){
   console.log("error")

 }
 toString(){
    return ` nom:${this.#nom} prenom ${this.#prenom}:`
 }

}
class Agent extends Personne{
    #heuresTravaillees
    #tauxHoraraire


    constructor(heuresTravaillees,tauxHoraire,nom,prenom,anneNaissance,rue,ville){
    super(_nom,_prenom,_anneNaissance,_rue,_ville)
    this.#heuresTravaillees=heuresTravaillees
    this.#tauxHoraraire=tauxHoraire
    

    }
    calculerSalaire(){
   let salaire= this.#heuresTravaillees*this.#tauxHoraraire
   return salaire
    }
 
    
}
class Commercial extends Personne{
    #salaireFixe
    #chiffreAfaire
    #commission
    constructor(salaireFixe,chiffreAfaire,commission,nom,prenom,anneNaissance,rue,ville){
         super(_nom,_prenom,_anneNaissance,_rue,_ville)
         this.#chiffreAfaire=chiffreAfaire
         this.#commission=commission
         this.#salaireFixe=salaireFixe
        
    }
    calculerSalaire(){
     let salaire=this.#salaireFixe+(this.#chiffreAfaire*this.#commission)
     return salaire
    }

}
class Carde extends Personne{
    #salaireFixe
    #bonus
    constructor(salaireFixe,bonus,nom,prenom,anneNaissance,rue,ville){
        super(_nom,_prenom,_anneNaissance,_rue,_ville)
        this.#bonus=bonus
        this.#salaireFixe=salaireFixe
    }
    calculerSalaire(){
        let salaire =this.#salaireFixe*this.#bonus
        return salaire
    }
}

// --------------
const typeEmployer = document.getElementById("selecteurR")
const  infos = document.getElementById("infos")
typeEmployer.addEventListener("change", ()=>{
    const type = typeEmployer.value
    tabData.innerHTML=""

    if (type ==="agent"){
        infos.innerHTML = `
        <input type="number" id="heures" placeholder="Heures travaillées" required>
        <input type="number" id="taux" placeholder="Taux horaire">`
         }else if (type === "commercial") {
         infos.innerHTML = `
            <input type="number" id="fixe" placeholder="Salaire fixe">
            <input type="number" id="ca" placeholder="Chiffre d'affaire" style.>
            <input type="number" id="commission" step="0.01" placeholder="Commission">
        `
    } else if (type === "cadre") {
        infos.innerHTML = `
            <input type="number" id="fixe" placeholder="Salaire fixe">
            <input type="number" id="bonus" placeholder="Bonus">
        `
    } else {
        infos.innerHTML=``
    }
    
})