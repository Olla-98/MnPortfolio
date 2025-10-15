
// // Lijst tonen
// function updateLijst() {
//   let lijst = "";
//   let totaal = 0;

//   for (let i = 0; i < autos.length; i++) {
//     lijst += `<p><em>[${i}] De ${autos[i]} kost €${prijzen[i]}</em></p>`;
//     totaal += prijzen[i];
//   }

//   lijst += `<p><strong>De totaalprijs van de ${autos.length} auto's is: €${totaal}</strong></p>`;
//   document.getElementById("autolijst").innerHTML = lijst;
// }

// function myFunction() {
//   let lijst = ""; // Lege string voor de lijst van de autos om dat te tonen 
//   let totaal = 0; // Variabele voor de totaalprijs van de alle autos 

//   for (let i = 0; i < autos.length; i++) {
//     lijst += `<p><em>[${i}] de ${autos[i]} kost €${prijzen[i]}</em></p>`; // Voeg elke auto en prijs toe aan de lijst
//     totaal += prijzen[i]; // Tel de prijs van elke auto bij de totaalprijs op
//   }

//   lijst += `<p><s;>De totaal prijs van de ${autos.length} auto's is: €${totaal}</strong></p>`; // Voeg de totaalprijs van alles toe aan de lijst

// }

// // Toevoegen
// function toevoegenAuto() {
//   // Haalt de waarden op uit de invoervelden
//   let nieuweAuto = document.getElementById("autoInput").value.trim();
//   let nieuwePrijs = parseInt(document.getElementById("prijsInput").value);

//   // Controleert of de invoer geldig is
//   if (nieuweAuto && !isNaN(nieuwePrijs) && nieuwePrijs > 0) { // Als de naam niet leeg is en de prijs een geldig getal is 
//     autos.push(nieuweAuto); // Voegt de nieuwe auto toe aan de autos array
//     prijzen.push(nieuwePrijs); // Voegt de nieuwe prijs toe aan de prijzen array
//     updateLijst(); // Werkt de lijst bij om de nieuwe auto en prijs te tonen
//     document.getElementById("status").innerText = `Toegevoegd:  ${nieuweAuto} (€${nieuwePrijs})`; // Toont een statusbericht dat de auto is toegevoegd
//     document.getElementById("autoInput").value = ""; // wordt de veld leeggemaakt zodat er direct een nieuwe auto kan invullen.
//     document.getElementById("prijsInput").value = ""; // wordt de veld leeggemaakt zodat er direct een nieuwe prijs kan invullen.
//   } else {
//     alert("Vul een geldige naam en prijs in."); // Als de invoer ongeldig is, toont een waarschuwing/foutmelding
//   }
// }

// // Verwijderen

// function verwijderAuto() {
//   let index = parseInt(document.getElementById("verwijderIndex").value); // Haalt de index op uit het invoerveld en zet het om naar een geheel getal

//   if (!isNaN(index) && index >= 0 && index < autos.length) { // Controleert of de index geldig is  
//     let verwijderNaam = autos[index]; // Slaat de naam van de te verwijderen auto op voor de statusmelding
//     autos.splice(index, 1); // Verwijdert de auto uit de autos array op de opgegeven index
//     prijzen.splice(index, 1) // Verwijdert de prijs uit de prijzen array op de opgegeven index
//     updateLijst(); // Werkt de lijst bij om de verwijderde auto en prijs te tonen

//     document.getElementById("status").innerText = `Verwijderd: [${index}] ${verwijderNaam}`; // Toont een statusbericht dat de auto is verwijderd
//     document.getElementById("verwijderIndex").value = ""; // Invoerveld leegmaken
//   } else {
//     alert('Vul een geldige index in om te verwijderen.'); // Als de index ongeldig is, toont een waarschuwing/foutmelding
//   }

// }



// // Aanpassen
// function pasAutoAan() {
//   // Waarden ophalen uit de invoervelden
//   let index = parseInt(document.getElementById("pasAanIndex").value);
//   let nieuweNaam = document.getElementById("nieuweAuto").value.trim();
//   let nieuwePrijs = parseInt(document.getElementById("nieuwePrijs").value);
//   // parseInt zet tekst om naar een getal, en .trim() verwijdert spaties aan begin en einde van de naam.

//   // Controleert of de invoer geldig is
//   if (
//     !isNaN(index) && index >= 0 && index < autos.length && nieuweNaam && !isNaN(nieuwePrijs) && nieuwePrijs > 0) {

//     // Aanpassen van de gegevens in de arrays
//     autos[index] = nieuweNaam;
//     prijzen[index] = nieuwePrijs;
//     updateLijst();

//     document.getElementById("status").innerText = `Aangepast: [${index}] ${nieuweNaam} (€${nieuwePrijs})`; // Statusbericht tonen dat de auto is aangepast
//     document.getElementById("pasAanIndex").value = ""; // Invoerveld leegmaken
//     document.getElementById("nieuweAuto").value = ""; // Invoerveld leegmaken
//     document.getElementById("nieuwePrijs").value = ""; // Invoerveld leegmaken
//   } else {
//     alert("Vul geldige gegevens in om aan te passen.");
//   }
// }

// updateLijst();

async function laadAutos() { // Lijst tonen
    const res = await fetch('../api/get_autos.php'); // Haalt de lijst van autos op van de server
    const data = await res.json(); //Zet de response om naar JSON-formaat,await zorgt ervoor dat de code wacht tot de response is ontvangen
    toonLijst(data);
}

function toonLijst(autos) { // Toont de lijst van autos
    let lijst = "";
    let totaal = 0;

    autos.forEach(auto => { // Voor elke auto in de lijst
        lijst += `<p><em>[${auto.id}] ${auto.merk} kost €${auto.prijs}</em></p>`; // Voeg elke auto en prijs toe aan de lijst
        totaal += parseFloat(auto.prijs); // Tel de prijs van elke auto bij de totaalprijs op
    });

    lijst += `<p><strong>Totaalprijs van ${autos.length} auto's: €${totaal.toFixed(2)}</strong></p>`;
    document.getElementById("autolijst").innerHTML = lijst;
}

// Auto toevoegen
async function toevoegenAuto() {
    const merk = document.getElementById("autoInput").value.trim();// Haalt de waarde op uit het invoerveld en verwijdert spaties aan begin en einde
    const prijs = parseFloat(document.getElementById("prijsInput").value); // Haalt de waarde op uit het invoerveld en zet het om naar een kommagetal

    if (merk && prijs > 0) {
        await fetch('../api/add_auto.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ merk, prijs })
        });
        document.getElementById("status").innerText = `Toegevoegd: ${merk} (€${prijs})`;
        laadAutos();
    } else {
        alert("Vul een geldige naam en prijs in.");
    }
}

// Auto verwijderen
async function verwijderAuto() {
    const id = parseInt(document.getElementById("verwijderIndex").value);// Haalt de waarde op uit het invoerveld en zet het om naar een geheel getal

    if (id > 0) {
        await fetch('../api/delete_auto.php', { // Verwijdert de auto met de opgegeven ID
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },// Geeft aan dat de body JSON-gegevens bevat
            body: JSON.stringify({ id })// Zet de ID om naar een JSON-string
        });
        document.getElementById("status").innerText = `Auto met ID ${id} verwijderd.`;
        laadAutos();
    } else {
        alert("Vul een geldige ID in.");
    }
}

// Auto aanpassen
async function pasAutoAan() { 
    const id = parseInt(document.getElementById("pasAanIndex").value);
    const merk = document.getElementById("nieuweAuto").value.trim();
    const prijs = parseFloat(document.getElementById("nieuwePrijs").value);

    if (id > 0 && merk && prijs > 0) {
        await fetch('../api/update_auto.php', { //await fetch(...) doet een HTTP-verzoek en wacht op het antwoord.
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, merk, prijs })
        });
        document.getElementById("status").innerText = `Aangepast: [${id}] ${merk} (€${prijs})`;
        laadAutos();
    } else {
        alert("Vul geldige gegevens in om aan te passen.");
    }
}

// Laad alles bij openen
window.onload = laadAutos;
