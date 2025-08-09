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
  private partecipanti: IPartecipante[] = [];

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

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const partecipanti: IPartecipante[] = [];
const corsi: ICorso[] = [];
const aziende: IAzienda[] = [];

function showMainMenu() {
  console.log("\n=== Sistema di Gestione IncluDO ===");
  console.log("1. Aggiungi un partecipante");
  console.log("2. Crea un nuovo corso");
  console.log("3. Registra una nuova azienda");
  console.log("4. Iscrivi un partecipante a un corso");
  console.log("5. Assumi un partecipante in un'azienda");
  console.log("6. Visualizza tutti i partecipanti");
  console.log("7. Visualizza tutti i corsi");
  console.log("8. Visualizza le aziende");
  console.log("9. Esci");

  rl.question("\nSeleziona un'opzione: ", (answer) => {
    switch (answer) {
      case "1":
        addPartecipante();
        break;
      case "2":
        createCorso();
        break;
      case "3":
        addAzienda();
        break;
      case "4":
        iscriviPartecipanteACorso();
        break;
      case "5":
        assumiPartecipanteInAzienda();
        break;
      case "6":
        showPartecipanti();
        break;
      case "7":
        showCorsi();
        break;
      case "8":
        showAziende();
        break;
      case "9":
        console.log("Arrivederci!");
        rl.close();
        break;
      default:
        console.log("Opzione non valida. Riprova.");
        showMainMenu();
    }
  });
}

function addPartecipante() {
  console.log("\n=== Aggiungi un nuovo partecipante ===");

  const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  (async () => {
    const nome = await askQuestion("Nome: ");
    const cognome = await askQuestion("Cognome: ");
    const paeseDiOrigine = await askQuestion("Paese di origine: ");
    const istruzione = await askQuestion("Livello di istruzione: ");
    const competenzeLinguistiche = await askQuestion(
      "Competenze linguistiche (separate da virgola): "
    );
    const formazioneDiInteresse = await askQuestion(
      "Formazione di interesse: "
    );

    const nuovoPartecipante = new Partecipante(
      nome,
      cognome,
      paeseDiOrigine,
      istruzione,
      competenzeLinguistiche,
      formazioneDiInteresse
    );

    partecipanti.push(nuovoPartecipante);
    console.log("\nPartecipante aggiunto con successo!");
    rl.question("\nPremi un tasto per tornare al menu principale...", () => {
      showMainMenu();
    });
  })();
}

function createCorso() {
  console.log("\n=== Crea un nuovo corso ===");

  const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  (async () => {
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
    console.log("\nCorso creato con successo!");
    rl.question("\nPremi un tasto per tornare al menu principale...", () => {
      showMainMenu();
    });
  })();
}

function addAzienda() {
  console.log("\n=== Registra una nuova azienda ===");

  const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  (async () => {
    const nomeAzienda = await askQuestion("Nome azienda: ");
    const settoreDiAttività = await askQuestion("Settore di attività: ");
    const descrizione = await askQuestion("Descrizione: ");
    const posizioniAperte = (
      await askQuestion("Posizioni aperte (separate da virgola): ")
    )
      .split(",")
      .map((pos) => pos.trim());

    const nuovaAzienda = new Azienda(
      nomeAzienda,
      settoreDiAttività,
      descrizione,
      posizioniAperte
    );

    aziende.push(nuovaAzienda);
    console.log("\nAzienda registrata con successo!");
    rl.question("\nPremi un tasto per tornare al menu principale...", () => {
      showMainMenu();
    });
  })();
}

function iscriviPartecipanteACorso() {
  if (partecipanti.length === 0 || corsi.length === 0) {
    console.log("\nErrore: Nessun partecipante o corso disponibile.");
    rl.question("\nPremi un tasto per tornare al menu principale...", () => {
      showMainMenu();
    });
    return;
  }

  console.log("\n=== Iscrivi un partecipante a un corso ===");

  console.log("\nElenco partecipanti:");
  partecipanti.forEach((p, index) => {
    console.log(`${index + 1}. ${p.nome} ${p.cognome}`);
  });

  console.log("\nElenco corsi:");
  corsi.forEach((c, index) => {
    console.log(`${index + 1}. ${c.titoloCorso}`);
  });

  const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  (async () => {
    const partecipanteIndex =
      parseInt(await askQuestion("\nSeleziona il numero del partecipante: ")) -
      1;
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
      console.log("\nSelezione non valida.");
    } else {
      const partecipante = partecipanti[partecipanteIndex];
      const corso = corsi[corsoIndex];

      partecipante.iscrivitiCorso(corso);
      console.log(
        `\n${partecipante.nome} ${partecipante.cognome} è stato iscritto al corso "${corso.titoloCorso}"`
      );
    }

    rl.question("\nPremi un tasto per tornare al menu principale...", () => {
      showMainMenu();
    });
  })();
}

function showPartecipanti() {
  console.log("\n=== Elenco Partecipanti ===");
  if (partecipanti.length === 0) {
    console.log("Nessun partecipante registrato.");
  } else {
    partecipanti.forEach((p, index) => {
      console.log(`\n${index + 1}. ${p.nome} ${p.cognome}`);
      console.log(`   Paese di origine: ${p.paeseDiOrigine}`);
      console.log(`   Istruzione: ${p.istruzione}`);
      console.log(`   Competenze linguistiche: ${p.competenzeLinguistiche}`);
      console.log(`   Interesse: ${p.formazioneDiInteresse}`);
    });
  }

  rl.question("\nPremi un tasto per tornare al menu principale...", () => {
    showMainMenu();
  });
}

function assumiPartecipanteInAzienda() {
  if (partecipanti.length === 0 || aziende.length === 0) {
    console.log("\nErrore: Nessun partecipante o azienda disponibile.");
    rl.question("\nPremi un tasto per tornare al menu principale...", () => {
      showMainMenu();
    });
    return;
  }

  console.log("\n=== Assumi un partecipante in un'azienda ===");

  console.log("\nElenco partecipanti:");
  partecipanti.forEach((p, index) => {
    console.log(`${index + 1}. ${p.nome} ${p.cognome}`);
  });

  console.log("\nElenco aziende:");
  aziende.forEach((a, index) => {
    console.log(`${index + 1}. ${a.nomeAzienda} (${a.settoreDiAttività})`);
  });

  const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  (async () => {
    const partecipanteIndex =
      parseInt(await askQuestion("\nSeleziona il numero del partecipante: ")) -
      1;
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
      console.log("\nSelezione non valida.");
    } else {
      const partecipante = partecipanti[partecipanteIndex];
      const azienda = aziende[aziendaIndex];

      console.log(`\nPosizioni aperte in ${azienda.nomeAzienda}:`);
      if (azienda.posizioniAperte.length > 0) {
        azienda.posizioniAperte.forEach((pos, index) => {
          console.log(`${index + 1}. ${pos}`);
        });

        const posizioneScelta =
          parseInt(await askQuestion("\nScegli il numero della posizione: ")) -
          1;

        if (
          posizioneScelta >= 0 &&
          posizioneScelta < azienda.posizioniAperte.length
        ) {
          azienda.offriPosizione(
            partecipante,
            azienda.posizioniAperte[posizioneScelta]
          );
          console.log("\nPartecipante assumuto con successo!");
        }
      } else {
        const nuovaPosizione = await askQuestion(
          "Nessuna posizione aperta. Inserisci la nuova posizione: "
        );
        azienda.offriPosizione(partecipante, nuovaPosizione);
      }
    }

    rl.question("\nPremi un tasto per tornare al menu principale...", () => {
      showMainMenu();
    });
  })();
}

function showAziende() {
  console.log("\n=== Elenco Aziende ===");
  if (aziende.length === 0) {
    console.log("Nessuna azienda registrata.");
  } else {
    aziende.forEach((a, index) => {
      console.log(`\n${index + 1}. ${a.nomeAzienda} (${a.settoreDiAttività})`);
      console.log(`   ${a.descrizione}`);
      console.log(
        "   Posizioni aperte:",
        a.posizioniAperte.join(", ") || "Nessuna"
      );

      const numDipendenti = a.dipendenti?.length || 0;
      console.log(`   Dipendenti: ${numDipendenti}`);
    });
  }

  rl.question("\nPremi un tasto per tornare al menu principale...", () => {
    showMainMenu();
  });
}

function showCorsi() {
  console.log("\n=== Elenco Corsi ===");
  if (corsi.length === 0) {
    console.log("Nessun corso disponibile.");
  } else {
    corsi.forEach((c, index) => {
      console.log(`\n${index + 1}. ${c.titoloCorso}`);
      console.log(`   Descrizione: ${c.descrizione}`);
      console.log(`   Settore: ${c.settoreProfessionale}`);
      console.log(`   Durata: ${c.durata}`);

      const numPartecipanti = c["partecipanti"]?.length || 0;
      console.log(`\n   Partecipanti (${numPartecipanti}):`);

      if (numPartecipanti > 0) {
        c["partecipanti"].forEach((p, i) => {
          console.log(`   ${i + 1}. ${p.nome} ${p.cognome}`);
          console.log(`      Paese: ${p.paeseDiOrigine}`);
          console.log(`      Competenze: ${p.competenzeLinguistiche}`);
        });
      } else {
        console.log("   Nessun partecipante iscritto al corso.");
      }
    });
  }

  rl.question("\nPremi un tasto per tornare al menu principale...", () => {
    showMainMenu();
  });
}

console.log("Benvenuto nel Sistema di Gestione IncluDO!");
showMainMenu();

rl.on("close", () => {
  console.log("\nGrazie per aver utilizzato il nostro sistema!");
  process.exit(0);
});


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
