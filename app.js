"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Partecipante = /** @class */ (function () {
    function Partecipante(nome, cognome, paeseDiOrigine, istruzione, competenzeLinguistiche, formazioneDiInteresse) {
        this.nome = nome;
        this.cognome = cognome;
        this.paeseDiOrigine = paeseDiOrigine;
        this.istruzione = istruzione;
        this.competenzeLinguistiche = competenzeLinguistiche;
        this.formazioneDiInteresse = formazioneDiInteresse;
    }
    Partecipante.prototype.iscrivitiCorso = function (corso) {
        corso.aggiungiPartecipante(this);
        console.log("".concat(this.nome, " ").concat(this.cognome, " iscritto al corso ").concat(corso.titoloCorso));
    };
    return Partecipante;
}());
var Corso = /** @class */ (function () {
    function Corso(titoloCorso, descrizione, settoreProfessionale, durata) {
        this.partecipanti = [];
        this.titoloCorso = titoloCorso;
        this.descrizione = descrizione;
        this.settoreProfessionale = settoreProfessionale;
        this.durata = durata;
    }
    Corso.prototype.elencoIscritti = function (partecipanti) {
        return partecipanti
            .map(function (partecipante) { return "".concat(partecipante.nome, " ").concat(partecipante.cognome); })
            .join(", ");
    };
    Corso.prototype.aggiungiPartecipante = function (partecipante) {
        this.partecipanti.push(partecipante);
    };
    return Corso;
}());
var Azienda = /** @class */ (function () {
    function Azienda(nomeAzienda, settoreDiAttività, descrizione, posizioniAperte) {
        this.dipendenti = [];
        this.nomeAzienda = nomeAzienda;
        this.settoreDiAttività = settoreDiAttività;
        this.descrizione = descrizione;
        this.posizioniAperte = posizioniAperte;
    }
    Azienda.prototype.offriPosizione = function (partecipante, posizione) {
        this.posizioniAperte.push(posizione);
    };
    Azienda.prototype.assumi = function (partecipante, posizione) {
        this.dipendenti.push({ partecipante: partecipante, posizione: posizione });
        console.log("\n".concat(partecipante.nome, " ").concat(partecipante.cognome, " assunto/a come ").concat(posizione, " presso ").concat(this.nomeAzienda));
    };
    Azienda.prototype.mostraDipendenti = function () {
        console.log("\n=== Dipendenti di ".concat(this.nomeAzienda, " ==="));
        if (this.dipendenti.length === 0) {
            console.log("Nessun dipendente registrato.");
            return;
        }
        this.dipendenti.forEach(function (dipendente, index) {
            console.log("\n".concat(index + 1, ". ").concat(dipendente.partecipante.nome, " ").concat(dipendente.partecipante.cognome));
            console.log("   Posizione: ".concat(dipendente.posizione));
            console.log("   Competenze: ".concat(dipendente.partecipante.competenzeLinguistiche));
        });
    };
    return Azienda;
}());
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var partecipanti = [];
var corsi = [];
var aziende = [];
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
    rl.question("\nSeleziona un'opzione: ", function (answer) {
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
    var _this = this;
    console.log("\n=== Aggiungi un nuovo partecipante ===");
    var askQuestion = function (question) {
        return new Promise(function (resolve) {
            rl.question(question, function (answer) {
                resolve(answer);
            });
        });
    };
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var nome, cognome, paeseDiOrigine, istruzione, competenzeLinguistiche, formazioneDiInteresse, nuovoPartecipante;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, askQuestion("Nome: ")];
                case 1:
                    nome = _a.sent();
                    return [4 /*yield*/, askQuestion("Cognome: ")];
                case 2:
                    cognome = _a.sent();
                    return [4 /*yield*/, askQuestion("Paese di origine: ")];
                case 3:
                    paeseDiOrigine = _a.sent();
                    return [4 /*yield*/, askQuestion("Livello di istruzione: ")];
                case 4:
                    istruzione = _a.sent();
                    return [4 /*yield*/, askQuestion("Competenze linguistiche (separate da virgola): ")];
                case 5:
                    competenzeLinguistiche = _a.sent();
                    return [4 /*yield*/, askQuestion("Formazione di interesse: ")];
                case 6:
                    formazioneDiInteresse = _a.sent();
                    nuovoPartecipante = new Partecipante(nome, cognome, paeseDiOrigine, istruzione, competenzeLinguistiche, formazioneDiInteresse);
                    partecipanti.push(nuovoPartecipante);
                    console.log("\nPartecipante aggiunto con successo!");
                    rl.question("\nPremi un tasto per tornare al menu principale...", function () {
                        showMainMenu();
                    });
                    return [2 /*return*/];
            }
        });
    }); })();
}
function createCorso() {
    var _this = this;
    console.log("\n=== Crea un nuovo corso ===");
    var askQuestion = function (question) {
        return new Promise(function (resolve) {
            rl.question(question, function (answer) {
                resolve(answer);
            });
        });
    };
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var titoloCorso, descrizione, settoreProfessionale, durata, nuovoCorso;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, askQuestion("Titolo del corso: ")];
                case 1:
                    titoloCorso = _a.sent();
                    return [4 /*yield*/, askQuestion("Descrizione: ")];
                case 2:
                    descrizione = _a.sent();
                    return [4 /*yield*/, askQuestion("Settore professionale: ")];
                case 3:
                    settoreProfessionale = _a.sent();
                    return [4 /*yield*/, askQuestion("Durata (es. 3 mesi): ")];
                case 4:
                    durata = _a.sent();
                    nuovoCorso = new Corso(titoloCorso, descrizione, settoreProfessionale, durata);
                    corsi.push(nuovoCorso);
                    console.log("\nCorso creato con successo!");
                    rl.question("\nPremi un tasto per tornare al menu principale...", function () {
                        showMainMenu();
                    });
                    return [2 /*return*/];
            }
        });
    }); })();
}
function addAzienda() {
    var _this = this;
    console.log("\n=== Registra una nuova azienda ===");
    var askQuestion = function (question) {
        return new Promise(function (resolve) {
            rl.question(question, function (answer) {
                resolve(answer);
            });
        });
    };
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var nomeAzienda, settoreDiAttività, descrizione, posizioniAperte, nuovaAzienda;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, askQuestion("Nome azienda: ")];
                case 1:
                    nomeAzienda = _a.sent();
                    return [4 /*yield*/, askQuestion("Settore di attività: ")];
                case 2:
                    settoreDiAttività = _a.sent();
                    return [4 /*yield*/, askQuestion("Descrizione: ")];
                case 3:
                    descrizione = _a.sent();
                    return [4 /*yield*/, askQuestion("Posizioni aperte (separate da virgola): ")];
                case 4:
                    posizioniAperte = (_a.sent())
                        .split(",")
                        .map(function (pos) { return pos.trim(); });
                    nuovaAzienda = new Azienda(nomeAzienda, settoreDiAttività, descrizione, posizioniAperte);
                    aziende.push(nuovaAzienda);
                    console.log("\nAzienda registrata con successo!");
                    rl.question("\nPremi un tasto per tornare al menu principale...", function () {
                        showMainMenu();
                    });
                    return [2 /*return*/];
            }
        });
    }); })();
}
function iscriviPartecipanteACorso() {
    var _this = this;
    if (partecipanti.length === 0 || corsi.length === 0) {
        console.log("\nErrore: Nessun partecipante o corso disponibile.");
        rl.question("\nPremi un tasto per tornare al menu principale...", function () {
            showMainMenu();
        });
        return;
    }
    console.log("\n=== Iscrivi un partecipante a un corso ===");
    console.log("\nElenco partecipanti:");
    partecipanti.forEach(function (p, index) {
        console.log("".concat(index + 1, ". ").concat(p.nome, " ").concat(p.cognome));
    });
    console.log("\nElenco corsi:");
    corsi.forEach(function (c, index) {
        console.log("".concat(index + 1, ". ").concat(c.titoloCorso));
    });
    var askQuestion = function (question) {
        return new Promise(function (resolve) {
            rl.question(question, function (answer) {
                resolve(answer);
            });
        });
    };
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var partecipanteIndex, _a, corsoIndex, _b, partecipante, corso;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = parseInt;
                    return [4 /*yield*/, askQuestion("\nSeleziona il numero del partecipante: ")];
                case 1:
                    partecipanteIndex = _a.apply(void 0, [_c.sent()]) -
                        1;
                    _b = parseInt;
                    return [4 /*yield*/, askQuestion("Seleziona il numero del corso: ")];
                case 2:
                    corsoIndex = _b.apply(void 0, [_c.sent()]) - 1;
                    if (isNaN(partecipanteIndex) ||
                        partecipanteIndex < 0 ||
                        partecipanteIndex >= partecipanti.length ||
                        isNaN(corsoIndex) ||
                        corsoIndex < 0 ||
                        corsoIndex >= corsi.length) {
                        console.log("\nSelezione non valida.");
                    }
                    else {
                        partecipante = partecipanti[partecipanteIndex];
                        corso = corsi[corsoIndex];
                        partecipante.iscrivitiCorso(corso);
                        console.log("\n".concat(partecipante.nome, " ").concat(partecipante.cognome, " \u00E8 stato iscritto al corso \"").concat(corso.titoloCorso, "\""));
                    }
                    rl.question("\nPremi un tasto per tornare al menu principale...", function () {
                        showMainMenu();
                    });
                    return [2 /*return*/];
            }
        });
    }); })();
}
function showPartecipanti() {
    console.log("\n=== Elenco Partecipanti ===");
    if (partecipanti.length === 0) {
        console.log("Nessun partecipante registrato.");
    }
    else {
        partecipanti.forEach(function (p, index) {
            console.log("\n".concat(index + 1, ". ").concat(p.nome, " ").concat(p.cognome));
            console.log("   Paese di origine: ".concat(p.paeseDiOrigine));
            console.log("   Istruzione: ".concat(p.istruzione));
            console.log("   Competenze linguistiche: ".concat(p.competenzeLinguistiche));
            console.log("   Interesse: ".concat(p.formazioneDiInteresse));
        });
    }
    rl.question("\nPremi un tasto per tornare al menu principale...", function () {
        showMainMenu();
    });
}
function assumiPartecipanteInAzienda() {
    var _this = this;
    if (partecipanti.length === 0 || aziende.length === 0) {
        console.log("\nErrore: Nessun partecipante o azienda disponibile.");
        rl.question("\nPremi un tasto per tornare al menu principale...", function () {
            showMainMenu();
        });
        return;
    }
    console.log("\n=== Assumi un partecipante in un'azienda ===");
    console.log("\nElenco partecipanti:");
    partecipanti.forEach(function (p, index) {
        console.log("".concat(index + 1, ". ").concat(p.nome, " ").concat(p.cognome));
    });
    console.log("\nElenco aziende:");
    aziende.forEach(function (a, index) {
        console.log("".concat(index + 1, ". ").concat(a.nomeAzienda, " (").concat(a.settoreDiAttività, ")"));
    });
    var askQuestion = function (question) {
        return new Promise(function (resolve) {
            rl.question(question, function (answer) {
                resolve(answer);
            });
        });
    };
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var partecipanteIndex, _a, aziendaIndex, _b, partecipante, azienda, posizioneScelta, _c, nuovaPosizione;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = parseInt;
                    return [4 /*yield*/, askQuestion("\nSeleziona il numero del partecipante: ")];
                case 1:
                    partecipanteIndex = _a.apply(void 0, [_d.sent()]) -
                        1;
                    _b = parseInt;
                    return [4 /*yield*/, askQuestion("Seleziona il numero dell'azienda: ")];
                case 2:
                    aziendaIndex = _b.apply(void 0, [_d.sent()]) - 1;
                    if (!(isNaN(partecipanteIndex) ||
                        partecipanteIndex < 0 ||
                        partecipanteIndex >= partecipanti.length ||
                        isNaN(aziendaIndex) ||
                        aziendaIndex < 0 ||
                        aziendaIndex >= aziende.length)) return [3 /*break*/, 3];
                    console.log("\nSelezione non valida.");
                    return [3 /*break*/, 7];
                case 3:
                    partecipante = partecipanti[partecipanteIndex];
                    azienda = aziende[aziendaIndex];
                    console.log("\nPosizioni aperte in ".concat(azienda.nomeAzienda, ":"));
                    if (!(azienda.posizioniAperte.length > 0)) return [3 /*break*/, 5];
                    azienda.posizioniAperte.forEach(function (pos, index) {
                        console.log("".concat(index + 1, ". ").concat(pos));
                    });
                    _c = parseInt;
                    return [4 /*yield*/, askQuestion("\nScegli il numero della posizione: ")];
                case 4:
                    posizioneScelta = _c.apply(void 0, [_d.sent()]) -
                        1;
                    if (posizioneScelta >= 0 &&
                        posizioneScelta < azienda.posizioniAperte.length) {
                        azienda.offriPosizione(partecipante, azienda.posizioniAperte[posizioneScelta]);
                        console.log("\nPartecipante assumuto con successo!");
                    }
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, askQuestion("Nessuna posizione aperta. Inserisci la nuova posizione: ")];
                case 6:
                    nuovaPosizione = _d.sent();
                    azienda.offriPosizione(partecipante, nuovaPosizione);
                    _d.label = 7;
                case 7:
                    rl.question("\nPremi un tasto per tornare al menu principale...", function () {
                        showMainMenu();
                    });
                    return [2 /*return*/];
            }
        });
    }); })();
}
function showAziende() {
    console.log("\n=== Elenco Aziende ===");
    if (aziende.length === 0) {
        console.log("Nessuna azienda registrata.");
    }
    else {
        aziende.forEach(function (a, index) {
            var _a;
            console.log("\n".concat(index + 1, ". ").concat(a.nomeAzienda, " (").concat(a.settoreDiAttività, ")"));
            console.log("   ".concat(a.descrizione));
            console.log("   Posizioni aperte:", a.posizioniAperte.join(", ") || "Nessuna");
            var numDipendenti = ((_a = a.dipendenti) === null || _a === void 0 ? void 0 : _a.length) || 0;
            console.log("   Dipendenti: ".concat(numDipendenti));
        });
    }
    rl.question("\nPremi un tasto per tornare al menu principale...", function () {
        showMainMenu();
    });
}
function showCorsi() {
    console.log("\n=== Elenco Corsi ===");
    if (corsi.length === 0) {
        console.log("Nessun corso disponibile.");
    }
    else {
        corsi.forEach(function (c, index) {
            var _a;
            console.log("\n".concat(index + 1, ". ").concat(c.titoloCorso));
            console.log("   Descrizione: ".concat(c.descrizione));
            console.log("   Settore: ".concat(c.settoreProfessionale));
            console.log("   Durata: ".concat(c.durata));
            var numPartecipanti = ((_a = c["partecipanti"]) === null || _a === void 0 ? void 0 : _a.length) || 0;
            console.log("\n   Partecipanti (".concat(numPartecipanti, "):"));
            if (numPartecipanti > 0) {
                c["partecipanti"].forEach(function (p, i) {
                    console.log("   ".concat(i + 1, ". ").concat(p.nome, " ").concat(p.cognome));
                    console.log("      Paese: ".concat(p.paeseDiOrigine));
                    console.log("      Competenze: ".concat(p.competenzeLinguistiche));
                });
            }
            else {
                console.log("   Nessun partecipante iscritto al corso.");
            }
        });
    }
    rl.question("\nPremi un tasto per tornare al menu principale...", function () {
        showMainMenu();
    });
}
console.log("Benvenuto nel Sistema di Gestione IncluDO!");
showMainMenu();
rl.on("close", function () {
    console.log("\nGrazie per aver utilizzato il nostro sistema!");
    process.exit(0);
});
var partecipante1 = new Partecipante("Luka", "Modric", "Croazia", "Laurea in Informatica", "Inglese, Croato, Spagnolo", "Sviluppo Web");
var partecipante2 = new Partecipante("Cristiano", "Ronaldo", "Portogallo", "Laurea in Economia", "Inglese, Portoghese, Spagnolo", "Analista di mercato");
var partecipante3 = new Partecipante("Lionel", "Messi", "Argentina", "Laurea in Fisica", "Argentino", "Scienziato");
partecipanti.push(partecipante1);
partecipanti.push(partecipante2);
partecipanti.push(partecipante3);
var corso1 = new Corso("Sviluppo Web Avanzato", "Corso completo di sviluppo web moderno", "Informatica", "3 mesi");
var corso2 = new Corso("Approfondimento Fisica", "Corso completo di approfondimento fisica", "Fisica", "5 mesi");
var corso3 = new Corso("Approfondimento Tecniche di Mercato", "Corso completo di tecniche di mercato", "Economia", "7 mesi");
corsi.push(corso1);
corsi.push(corso2);
corsi.push(corso3);
var azienda1 = new Azienda("TechSolutions SRL", "Sviluppo Software", "Azienda leader nello sviluppo di soluzioni web", ["Frontend Developer", "Backend Developer"]);
var azienda2 = new Azienda("Finanalyst", "Finanzie", "Azienda in crescita nel settore finanziario", ["Analista finanziario", "Contabilitario"]);
var azienda3 = new Azienda("Neulab", "Laboratorio di ricerca", "Azienda specializzata in ricerca scientifica", ["Ricercatore", "Scienziato"]);
aziende.push(azienda1);
aziende.push(azienda2);
aziende.push(azienda3);
