interface IPartecipante {
  nome: string;
  cognome: string;
  paeseDiOrigine: string;
  istruzione: string;
  competenzeLinguistiche: string;
  formazioneDiInteresse: string;
  iscrivitiCorso(corso: ICorso): void;
}

interface ICorso {
  titoloCorso: string;
  descrizione: string;
  settoreProfessionale: string;
  durata: string;
  partecipanti: IPartecipante[];
  elencoIscritti(partecipanti: IPartecipante[]): string;
  aggiungiPartecipante(partecipante: IPartecipante): void;
}

interface IAzienda {
  nomeAzienda: string;
  settoreDiAttività: string;
  descrizione: string;
  posizioniAperte: string[];
  dipendenti: Array<{ partecipante: IPartecipante; posizione: string }>;
  offriPosizione(partecipante: IPartecipante, posizione: string): void;
  mostraDipendenti(): void;
}

class Partecipante implements IPartecipante {
  nome: string;
  cognome: string;
  paeseDiOrigine: string;
  istruzione: string;
  competenzeLinguistiche: string;
  formazioneDiInteresse: string;

  constructor(
    nome: string,
    cognome: string,
    paeseDiOrigine: string,
    istruzione: string,
    competenzeLinguistiche: string,
    formazioneDiInteresse: string
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.paeseDiOrigine = paeseDiOrigine;
    this.istruzione = istruzione;
    this.competenzeLinguistiche = competenzeLinguistiche;
    this.formazioneDiInteresse = formazioneDiInteresse;
  }

  iscrivitiCorso(corso: ICorso): void {
    corso.aggiungiPartecipante(this);
    console.log(
      `${this.nome} ${this.cognome} iscritto al corso ${corso.titoloCorso}`
    );
  }
}

class Corso implements ICorso {
  titoloCorso: string;
  descrizione: string;
  settoreProfessionale: string;
  durata: string;
  partecipanti: IPartecipante[] = [];

  constructor(
    titoloCorso: string,
    descrizione: string,
    settoreProfessionale: string,
    durata: string
  ) {
    this.titoloCorso = titoloCorso;
    this.descrizione = descrizione;
    this.settoreProfessionale = settoreProfessionale;
    this.durata = durata;
  }

  elencoIscritti(partecipanti: IPartecipante[]): string {
    return partecipanti
      .map((partecipante) => `${partecipante.nome} ${partecipante.cognome}`)
      .join(", ");
  }

  aggiungiPartecipante(partecipante: IPartecipante): void {
    this.partecipanti.push(partecipante);
  }
}

class Azienda implements IAzienda {
  nomeAzienda: string;
  settoreDiAttività: string;
  descrizione: string;
  posizioniAperte: string[];
  dipendenti: Array<{ partecipante: IPartecipante; posizione: string }> = [];

  constructor(
    nomeAzienda: string,
    settoreDiAttività: string,
    descrizione: string,
    posizioniAperte: string[]
  ) {
    this.nomeAzienda = nomeAzienda;
    this.settoreDiAttività = settoreDiAttività;
    this.descrizione = descrizione;
    this.posizioniAperte = posizioniAperte;
  }

  offriPosizione(partecipante: IPartecipante, posizione: string): void {
    this.posizioniAperte.push(posizione);
  }

  assumi(partecipante: IPartecipante, posizione: string): void {
    this.dipendenti.push({ partecipante, posizione });
    console.log(
      `\n${partecipante.nome} ${partecipante.cognome} assunto/a come ${posizione} presso ${this.nomeAzienda}`
    );
  }

  mostraDipendenti(): void {
    console.log(`\n=== Dipendenti di ${this.nomeAzienda} ===`);
    if (this.dipendenti.length === 0) {
      console.log("Nessun dipendente registrato.");
      return;
    }

    this.dipendenti.forEach((dipendente, index) => {
      console.log(
        `\n${index + 1}. ${dipendente.partecipante.nome} ${
          dipendente.partecipante.cognome
        }`
      );
      console.log(`   Posizione: ${dipendente.posizione}`);
      console.log(
        `   Competenze: ${dipendente.partecipante.competenzeLinguistiche}`
      );
    });
  }
}


function showMessage(message) {
  alert(message);
}

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const answer = prompt(question) || ''; // Fallback to empty string if null
    if (answer === null) {
      reject(new Error("User cancelled the prompt"));
    } else {
      resolve(answer || '');
    }
  });
}

// Array per memorizzare le aziende
const aziende: Azienda[] = [];

// Array per memorizzare i corsi
const corsi: Corso[] = [];

// Array per memorizzare i partecipanti
const partecipanti: Partecipante[] = [];

// Main menu
async function showMainMenu() {
  const menu = `=== Sistema di Gestione IncluDO ===
1. Aggiungi un partecipante
2. Crea un nuovo corso
3. Registra una nuova azienda
4. Iscrivi un partecipante a un corso
5. Assumi un partecipante in un'azienda
6. Visualizza tutti i partecipanti
7. Visualizza tutti i corsi
8. Visualizza le aziende
9. Esci`;

  const answer = await askQuestion(menu + "\n\nSeleziona un'opzione: ");

  switch (answer) {
    case "1":
      await addPartecipante();
      break;
    case "2":
      await createCorso();
      break;
    case "3":
      await addAzienda();
      break;
    case "4":
      await iscriviPartecipanteACorso();
      break;
    case "5":
      await assumiPartecipanteInAzienda();
      break;
    case "6":
      await showPartecipanti();
      break;
    case "7":
      await showCorsi();
      break;
    case "8":
      await showAziende();
      break;
    case "9":
      await showMessage("Arrivederci!");
      // Qui termina senza closeApp perché siamo in browser
      return;
    default:
      await showMessage("Opzione non valida. Riprova.");
  }

  // Ripeti il menu a meno che non esca
  if (answer !== "9") {
    await showMainMenu();
  }
}



async function addPartecipante() {
  await showMessage("=== Aggiungi un nuovo partecipante ===");

  const nome = await askQuestion("Nome: ");
  const cognome = await askQuestion("Cognome: ");
  const paeseDiOrigine = await askQuestion("Paese di origine: ");
  const istruzione = await askQuestion("Livello di istruzione: ");
  const competenzeLinguistiche = await askQuestion(
    "Competenze linguistiche (separate da virgola): "
  );
  const formazioneDiInteresse = await askQuestion("Formazione di interesse: ");

  const nuovoPartecipante = new Partecipante(
    nome,
    cognome,
    paeseDiOrigine,
    istruzione,
    competenzeLinguistiche,
    formazioneDiInteresse
  );

  partecipanti.push(nuovoPartecipante);
  await showMessage("Partecipante aggiunto con successo!");
}


async function createCorso() {
  await showMessage("=== Crea un nuovo corso ===");

  const titoloCorso = await askQuestion("Titolo del corso: ");
  const descrizione = await askQuestion("Descrizione: ");
  const settoreProfessionale = await askQuestion("Settore professionale: ");
  const durata = await askQuestion("Durata (es. 3 mesi): ");

  const nuovoCorso = new Corso(
    titoloCorso,
    descrizione,
    settoreProfessionale,
    durata
  );

  corsi.push(nuovoCorso);
  await showMessage("Corso creato con successo!");
}


async function addAzienda() {
  await showMessage("=== Registra una nuova azienda ===");

  const nomeAzienda = await askQuestion("Nome azienda: ");
  const settoreDiAttività = await askQuestion("Settore di attività: ");
  const descrizione = await askQuestion("Descrizione: ");
  const posizioniAperte = (
    await askQuestion("Posizioni aperte (separate da virgola): ")
  )
    .split(",")
    .map((pos: string) => pos.trim());

  const nuovaAzienda = new Azienda(
    nomeAzienda,
    settoreDiAttività,
    descrizione,
    posizioniAperte
  );

  aziende.push(nuovaAzienda);
  await showMessage("Azienda registrata con successo!");
}


async function iscriviPartecipanteACorso() {
  if (partecipanti.length === 0 || corsi.length === 0) {
    await showMessage("Errore: Nessun partecipante o corso disponibile.");
    return;
  }

  let message =
    "=== Iscrivi un partecipante a un corso ===\n\nElenco partecipanti:\n";
  partecipanti.forEach((p, index) => {
    message += `${index + 1}. ${p.nome} ${p.cognome}\n`;
  });

  message += "\nElenco corsi:\n";
  corsi.forEach((c, index) => {
    message += `${index + 1}. ${c.titoloCorso}\n`;
  });

  const partecipanteIndex =
    parseInt(
      await askQuestion(message + "\nSeleziona il numero del partecipante: ")
    ) - 1;
  const corsoIndex =
    parseInt(await askQuestion("Seleziona il numero del corso: ")) - 1;

  if (
    isNaN(partecipanteIndex) ||
    partecipanteIndex < 0 ||
    partecipanteIndex >= partecipanti.length ||
    isNaN(corsoIndex) ||
    corsoIndex < 0 ||
    corsoIndex >= corsi.length
  ) {
    await showMessage("Selezione non valida.");
  } else {
    const partecipante = partecipanti[partecipanteIndex];
    const corso = corsi[corsoIndex];

    partecipante.iscrivitiCorso(corso);
    await showMessage(
      `${partecipante.nome} ${partecipante.cognome} è stato iscritto al corso "${corso.titoloCorso}"`
    );
  }
}


async function showPartecipanti() {
  let message = "=== Elenco Partecipanti ===\n";
  if (partecipanti.length === 0) {
    message += "Nessun partecipante registrato.";
  } else {
    partecipanti.forEach((p, index) => {
      message += `\n${index + 1}. ${p.nome} ${p.cognome}\n`;
      message += `   Paese di origine: ${p.paeseDiOrigine}\n`;
      message += `   Istruzione: ${p.istruzione}\n`;
      message += `   Competenze linguistiche: ${p.competenzeLinguistiche}\n`;
      message += `   Interesse: ${p.formazioneDiInteresse}\n`;
    });
  }
  await showMessage(message);
}


async function assumiPartecipanteInAzienda() {
  if (partecipanti.length === 0 || aziende.length === 0) {
    await showMessage("Errore: Nessun partecipante o azienda disponibile.");
    return;
  }

  let message =
    "=== Assumi un partecipante in un'azienda ===\n\nElenco partecipanti:\n";
  partecipanti.forEach((p, index) => {
    message += `${index + 1}. ${p.nome} ${p.cognome}\n`;
  });

  message += "\nElenco aziende:\n";
  aziende.forEach((a, index) => {
    message += `${index + 1}. ${
      a.nomeAzienda
    } - Posizioni aperte: ${a.posizioniAperte.join(", ")}\n`;
  });

  const partecipanteIndex =
    parseInt(
      await askQuestion(message + "\nSeleziona il numero del partecipante: ")
    ) - 1;
  const aziendaIndex =
    parseInt(await askQuestion("Seleziona il numero dell'azienda: ")) - 1;

  if (
    isNaN(partecipanteIndex) ||
    partecipanteIndex < 0 ||
    partecipanteIndex >= partecipanti.length ||
    isNaN(aziendaIndex) ||
    aziendaIndex < 0 ||
    aziendaIndex >= aziende.length
  ) {
    await showMessage("Selezione non valida.");
    return;
  }

  const partecipante = partecipanti[partecipanteIndex];
  const azienda = aziende[aziendaIndex];

  const posizione = await askQuestion(
    `Inserisci la posizione per ${partecipante.nome} in ${azienda.nomeAzienda}: `
  );

  azienda.offriPosizione(partecipante, posizione);
  await showMessage(
    `${partecipante.nome} ${partecipante.cognome} è stato assunto come ${posizione} in ${azienda.nomeAzienda}`
  );
}


async function showAziende() {
  let message = "=== Elenco Aziende ===\n";
  if (aziende.length === 0) {
    message += "Nessuna azienda registrata.";
  } else {
    aziende.forEach((a, index) => {
      message += `\n${index + 1}. ${a.nomeAzienda} (${a.settoreDiAttività})\n`;
      message += `   ${a.descrizione}\n`;
      message += `   Posizioni aperte: ${
        a.posizioniAperte.join(", ") || "Nessuna"
      }\n`;
      if (a.dipendenti.length > 0) {
        message += "   Dipendenti:\n";
        a.dipendenti.forEach((d, i) => {
          message += `      ${i + 1}. ${d.partecipante.nome} ${
            d.partecipante.cognome
          } - ${d.posizione}\n`;
        });
      }
    });
  }
  await showMessage(message);
}


async function showCorsi() {
  let message = "=== Elenco Corsi ===\n";
  if (corsi.length === 0) {
    message += "Nessun corso disponibile.";
  } else {
    corsi.forEach((c, index) => {
      message += `\n${index + 1}. ${c.titoloCorso}\n`;
      message += `   Settore: ${c.settoreProfessionale}\n`;
      message += `   Durata: ${c.durata}\n`;
      message += `   Descrizione: ${c.descrizione}\n`;
      if (c.partecipanti.length > 0) {
        message += "   Iscritti:\n";
        c.partecipanti.forEach((p, i) => {
          message += `      ${i + 1}. ${p.nome} ${p.cognome}\n`;
        });
      }
    });
  }
  await showMessage(message);
}


console.log("Benvenuto nel Sistema di Gestione IncluDO!");
showMainMenu().catch(console.error);

const partecipante1 = new Partecipante(
  "Luka",
  "Modric",
  "Croazia",
  "Laurea in Informatica",
  "Inglese, Croato, Spagnolo",
  "Sviluppo Web"
);
const partecipante2 = new Partecipante(
  "Cristiano",
  "Ronaldo",
  "Portogallo",
  "Laurea in Economia",
  "Inglese, Portoghese, Spagnolo",
  "Analista di mercato"
);
const partecipante3 = new Partecipante(
  "Lionel",
  "Messi",
  "Argentina",
  "Laurea in Fisica",
  "Argentino",
  "Scienziato"
);
partecipanti.push(partecipante1);
partecipanti.push(partecipante2);
partecipanti.push(partecipante3);

const corso1 = new Corso(
  "Sviluppo Web Avanzato",
  "Corso completo di sviluppo web moderno",
  "Informatica",
  "3 mesi"
);
const corso2 = new Corso(
  "Approfondimento Fisica",
  "Corso completo di approfondimento fisica",
  "Fisica",
  "5 mesi"
);
const corso3 = new Corso(
  "Approfondimento Tecniche di Mercato",
  "Corso completo di tecniche di mercato",
  "Economia",
  "7 mesi"
);
corsi.push(corso1);
corsi.push(corso2);
corsi.push(corso3);

const azienda1 = new Azienda(
  "TechSolutions SRL",
  "Sviluppo Software",
  "Azienda leader nello sviluppo di soluzioni web",
  ["Frontend Developer", "Backend Developer"]
);
const azienda2 = new Azienda(
  "Finanalyst",
  "Finanzie",
  "Azienda in crescita nel settore finanziario",
  ["Analista finanziario", "Contabilitario"]
);
const azienda3 = new Azienda(
  "Neulab",
  "Laboratorio di ricerca",
  "Azienda specializzata in ricerca scientifica",
  ["Ricercatore", "Scienziato"]
);
aziende.push(azienda1);
aziende.push(azienda2);
aziende.push(azienda3);