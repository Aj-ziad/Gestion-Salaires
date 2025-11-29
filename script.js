class Personne { 
    #nom;
    #prenom; 
    #anneeNaissance; 
    #rue; 
    #ville; 
    #nbPersonnes;
constructor(nom,prenom,anneeNaissance,rue,ville){

    this.#nom = nom
      this.#prenom = prenom
        this.#anneeNaissance = anneeNaissance
        this.#rue= rue
        this.#ville= ville
}
calculAge(){
    const currentYear=new Date().getFullYear();
     let age =currentYear-this.#anneeNaissance
     return age;

}
// calculAge(){
//     return age=new Date().getFullYear()-this.#anneNaissance

// }

 calculerSalaire(){
    throw new Error("calculerSalaire() doit être implémentée dans la sous-classe");

 }
   getAdresse() {
      return `${this.#rue}, ${this.#ville}`;
    }
    toString(){
        return ` ${this.#nom} ${this.#prenom}`;
    }

}
class Agent extends Personne {
    #heuresTravaillees;
    #tauxHoraire;

    constructor(nom, prenom, anneeNaissance, rue, ville, heuresTravaillees = 0, tauxHoraire = 0) {
        super(nom, prenom, anneeNaissance, rue, ville);
        this.#heuresTravaillees = heuresTravaillees;
        this.#tauxHoraire = tauxHoraire;
    }

    calculerSalaire() {
        return this.#heuresTravaillees * this.#tauxHoraire;
    }
}

class Commercial extends Personne {
    #salaireFixe;
    #chiffreAffaire;
    #commission;

    constructor(nom, prenom, anneeNaissance, rue, ville, salaireFixe = 0, chiffreAffaire = 0, commission = 0) {
        super(nom, prenom, anneeNaissance, rue, ville);
        this.#salaireFixe = salaireFixe;
        this.#chiffreAffaire = chiffreAffaire;
        this.#commission = commission;
    }

    calculerSalaire() {
        return this.#salaireFixe + (this.#chiffreAffaire * this.#commission);
    }
}

class Cadre extends Personne {
    #salaireFixe;
    #bonus;

    constructor(nom, prenom, anneeNaissance, rue, ville, salaireFixe = 0, bonus = 0) {
        super(nom, prenom, anneeNaissance, rue, ville);
        this.#salaireFixe = salaireFixe;
        this.#bonus = bonus;
    }

    calculerSalaire() {
        return this.#salaireFixe + this.#bonus;
    }
}



// --------------
const typeEmployer = document.getElementById("selecteurR");
const  infos = document.getElementById("infos");
const form = document.getElementById("form");
const tabData = document.getElementById("tabData");
const tableResults = document.getElementById("tableResults");
const listeEmployes = [];
typeEmployer.addEventListener("change", ()=>{
    const type = typeEmployer.value
    infos.innerHTML="";

    if (type ==="agent"){
        infos.innerHTML = `
            <input type="number" id="heures" placeholder="Heures travaillées" required>
            <input type="number" id="taux" placeholder="Taux horaire">`
         }else if (type === "commercial") {
         infos.innerHTML = `
            <input type="number" id="fixe" placeholder="Salaire fixe">
            <input type="number" id="chiffreAffaire" placeholder="Chiffre d'affaire">
            <input type="number" id="commission" step="0.01" placeholder="Commission"> `
    } else if (type === "cadre") {
        infos.innerHTML = `
            <input type="number" id="fixe" placeholder="Salaire fixe">
            <input type="number" id="bonus" placeholder="Bonus"> `
    } else {
        infos.innerHTML=``
    }
    
})
   function afficherTableau() {

  tabData.innerHTML = "";

  listeEmployes.forEach(emp => {
    const tr = document.createElement("tr");

    const tdType = document.createElement("td");
    tdType.textContent = emp.constructor.name; 
    tr.appendChild(tdType);

    const tdNom = document.createElement("td");
    tdNom.textContent = emp.toString();
    tr.appendChild(tdNom);

    const tdAge = document.createElement("td");
    tdAge.textContent = emp.calculAge() + " ans";
    tr.appendChild(tdAge);

    const tdAdresse = document.createElement("td");
    tdAdresse.textContent = emp.getAdresse();
    tr.appendChild(tdAdresse);

    const tdSalaire = document.createElement("td");
    tdSalaire.textContent = emp.calculerSalaire().toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + " €";
    tr.appendChild(tdSalaire);

    tabData.appendChild(tr);
  });


  if (listeEmployes.length > 0) {
    tableResults.style.display = "table";
  } else {
    tableResults.style.display = "none";
  }
}

    




form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const nom = document.getElementById('fname').value.trim();
  const prenom = document.getElementById('fprenom').value.trim();
  const annee = Number(document.getElementById('fyear').value);
  const rue = document.getElementById('frue').value.trim();
  const ville = document.getElementById('fville').value.trim();
  const type = typeEmployer.value;



 
  let nouvelEmploye = null;
  if (type === "agent") {
    const heures = Number(document.getElementById('heures')?.value ?? 0);
    const taux = Number(document.getElementById('taux')?.value ?? 0);
    nouvelEmploye = new Agent(nom, prenom, annee, rue, ville, heures, taux);
  } else if (type === "commercial") {
    const fixe = Number(document.getElementById('fixe')?.value ?? 0);
    const chiffre = Number(document.getElementById('chiffreAffaire')?.value ?? 0);
    const commission = Number(document.getElementById('commission')?.value ?? 0);
    nouvelEmploye = new Commercial(nom, prenom, annee, rue, ville, fixe, chiffre, commission);
  } else if (type === "cadre") {
    const fixe = Number(document.getElementById('fixe')?.value ?? 0);
    const bonus = Number(document.getElementById('bonus')?.value ?? 0);
    nouvelEmploye = new Cadre(nom, prenom, annee, rue, ville, fixe, bonus);
  } else {
    alert("Type non pris en charge.");
    return;
  }

  listeEmployes.push(nouvelEmploye);
  afficherTableau();


  form.reset();
  infos.innerHTML = "";
  typeEmployer.value = "";
});