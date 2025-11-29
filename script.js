class Personne {
    #id 
    #nom 
    #prenom 
    #anneNaissance 
    #rue 
    #ville 
    #nbPersonnes
constructor(nom,prenom,anneNaissance,rue,ville){

    this.#nom = nom
      this.#prenom = prenom
        this.#anneNaissance = anneNaissance
        this.#rue= rue
        this.#ville= ville
}
calculAge(){
    return 2025 - this.#anneNaissance;

}

 #calculerSalaire(){
   console.log("error")

 }
 toString(){
    return `${this.#nom} ${this.#prenom}`;
 }

}
class Agent extends Personne{
    #heuresTravaillees
    #tauxHoraraire


    constructor(nom, prenom, anneNaissance, rue, ville, heuresTravaillees, tauxHoraraire) {
    super(nom,prenom,anneNaissance,rue,ville)
    this.#heuresTravaillees=heuresTravaillees
    this.#tauxHoraraire=tauxHoraraire
    

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
    constructor(nom, prenom, anneNaissance, rue, ville, salaireFixe, chiffreAfaire, commission) {
         super(nom,prenom,anneNaissance,rue,ville)
         this.#chiffreAfaire=chiffreAfaire
         this.#commission=commission
         this.#salaireFixe=salaireFixe
        
    }
    calculerSalaire(){
     let salaire=this.#salaireFixe+(this.#chiffreAfaire*this.#commission)
     return salaire
    }

}
class Cadre extends Personne{
    #salaireFixe
    #bonus
    constructor(nom, prenom, anneNaissance, rue, ville, salaireFixe, bonus) {
        super(nom,prenom,anneNaissance,rue,ville)
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
    // tabData.innerHTML=""

    if (type ==="agent"){
        infos.innerHTML = `
        <input type="number" id="heures" placeholder="Heures travaillées" required>
        <input type="number" id="taux" placeholder="Taux horaire" required>`
         }else if (type === "commercial") {
         infos.innerHTML = `
            <input type="number" id="fixe" placeholder="Salaire fixe" required>
            <input type="number" id="ca" placeholder="Chiffre d'affaire" required>
            <input type="number" id="commission" step="0.01" placeholder="Commission" required>
        `
    } else if (type === "cadre") {
        infos.innerHTML = `
            <input type="number" id="fixe" placeholder="Salaire fixe" required>
            <input type="number" id="bonus" placeholder="Bonus" required>
        `
    } else {
        infos.innerHTML=``
    }
    
})

const btn = document.getElementById("submit")
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    const nom = document.getElementById("fname").value
    const prenom = document.getElementById("fprenom").value
    const annee = parseInt(document.getElementById("fyear").value)
    const age = 2025 - annee
    const rue = document.getElementById("frue").value
    const ville = document.getElementById("fville").value
    const type = typeEmployer.value
    // const fullName = name + " " + first
    const adresse = rue + " " + ville
 let personne; 

    if (type === "agent") {
        const heures = parseFloat(document.getElementById("heures").value);
        const taux = parseFloat(document.getElementById("taux").value);

        personne = new Agent(nom, prenom, annee, rue, ville, heures, taux);

    } else if (type === "commercial") {
        const fixe = parseFloat(document.getElementById("fixe").value);
        const ca = parseFloat(document.getElementById("ca").value);
        const commission = parseFloat(document.getElementById("commission").value);

        personne = new Commercial(nom, prenom, annee, rue, ville, fixe, ca, commission);

    } else if (type === "cadre") {
        const fixe = parseFloat(document.getElementById("fixe").value);
        const bonus = parseFloat(document.getElementById("bonus").value);

        personne = new Cadre(nom, prenom, annee, rue, ville, fixe, bonus);
    }

   
 
    console.log("Full Name:", personne.toString());
    console.log("Age:", personne.calculAge());
    console.log("Salaire:", personne.calculerSalaire());


    const ttab = document.getElementById("tabData")
    ttab.innerHTML+=`
    <tr>
    <td>${type}</td>
    <td>${personne.toString()}</td>
    <td>${personne.calculAge()}</td>
    <td>${adresse}</td>
    <td>${personne.calculerSalaire()}</td>
    </tr>`
})