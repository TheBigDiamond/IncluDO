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
function showMessage(message) {
    alert(message);
}
// Funzione per chiedere input usando prompt (browser)
function askQuestion(question) {
    return new Promise(function (resolve) {
        var answer = prompt(question) || ''; // Fallback to empty string if null
        resolve(answer);
    });
}
// Array per memorizzare le aziende
var aziende = [];
// Array per memorizzare i corsi
var corsi = [];
// Array per memorizzare i partecipanti
var partecipanti = [];
// Main menu
function showMainMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var menu, answer, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    menu = "=== Sistema di Gestione IncluDO ===\n1. Aggiungi un partecipante\n2. Crea un nuovo corso\n3. Registra una nuova azienda\n4. Iscrivi un partecipante a un corso\n5. Assumi un partecipante in un'azienda\n6. Visualizza tutti i partecipanti\n7. Visualizza tutti i corsi\n8. Visualizza le aziende\n9. Esci";
                    return [4 /*yield*/, askQuestion(menu + "\n\nSeleziona un'opzione: ")];
                case 1:
                    answer = _b.sent();
                    _a = answer;
                    switch (_a) {
                        case "1": return [3 /*break*/, 2];
                        case "2": return [3 /*break*/, 4];
                        case "3": return [3 /*break*/, 6];
                        case "4": return [3 /*break*/, 8];
                        case "5": return [3 /*break*/, 10];
                        case "6": return [3 /*break*/, 12];
                        case "7": return [3 /*break*/, 14];
                        case "8": return [3 /*break*/, 16];
                        case "9": return [3 /*break*/, 18];
                    }
                    return [3 /*break*/, 20];
                case 2: return [4 /*yield*/, addPartecipante()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 22];
                case 4: return [4 /*yield*/, createCorso()];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 22];
                case 6: return [4 /*yield*/, addAzienda()];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 22];
                case 8: return [4 /*yield*/, iscriviPartecipanteACorso()];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 22];
                case 10: return [4 /*yield*/, assumiPartecipanteInAzienda()];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 22];
                case 12: return [4 /*yield*/, showPartecipanti()];
                case 13:
                    _b.sent();
                    return [3 /*break*/, 22];
                case 14: return [4 /*yield*/, showCorsi()];
                case 15:
                    _b.sent();
                    return [3 /*break*/, 22];
                case 16: return [4 /*yield*/, showAziende()];
                case 17:
                    _b.sent();
                    return [3 /*break*/, 22];
                case 18: return [4 /*yield*/, showMessage("Arrivederci!")];
                case 19:
                    _b.sent();
                    // Qui termina senza closeApp perché siamo in browser
                    return [2 /*return*/];
                case 20: return [4 /*yield*/, showMessage("Opzione non valida. Riprova.")];
                case 21:
                    _b.sent();
                    _b.label = 22;
                case 22:
                    if (!(answer !== "9")) return [3 /*break*/, 24];
                    return [4 /*yield*/, showMainMenu()];
                case 23:
                    _b.sent();
                    _b.label = 24;
                case 24: return [2 /*return*/];
            }
        });
    });
}
function addPartecipante() {
    return __awaiter(this, void 0, void 0, function () {
        var nome, cognome, paeseDiOrigine, istruzione, competenzeLinguistiche, formazioneDiInteresse, nuovoPartecipante;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showMessage("=== Aggiungi un nuovo partecipante ===")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, askQuestion("Nome: ")];
                case 2:
                    nome = _a.sent();
                    return [4 /*yield*/, askQuestion("Cognome: ")];
                case 3:
                    cognome = _a.sent();
                    return [4 /*yield*/, askQuestion("Paese di origine: ")];
                case 4:
                    paeseDiOrigine = _a.sent();
                    return [4 /*yield*/, askQuestion("Livello di istruzione: ")];
                case 5:
                    istruzione = _a.sent();
                    return [4 /*yield*/, askQuestion("Competenze linguistiche (separate da virgola): ")];
                case 6:
                    competenzeLinguistiche = _a.sent();
                    return [4 /*yield*/, askQuestion("Formazione di interesse: ")];
                case 7:
                    formazioneDiInteresse = _a.sent();
                    nuovoPartecipante = new Partecipante(nome, cognome, paeseDiOrigine, istruzione, competenzeLinguistiche, formazioneDiInteresse);
                    partecipanti.push(nuovoPartecipante);
                    return [4 /*yield*/, showMessage("Partecipante aggiunto con successo!")];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createCorso() {
    return __awaiter(this, void 0, void 0, function () {
        var titoloCorso, descrizione, settoreProfessionale, durata, nuovoCorso;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showMessage("=== Crea un nuovo corso ===")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, askQuestion("Titolo del corso: ")];
                case 2:
                    titoloCorso = _a.sent();
                    return [4 /*yield*/, askQuestion("Descrizione: ")];
                case 3:
                    descrizione = _a.sent();
                    return [4 /*yield*/, askQuestion("Settore professionale: ")];
                case 4:
                    settoreProfessionale = _a.sent();
                    return [4 /*yield*/, askQuestion("Durata (es. 3 mesi): ")];
                case 5:
                    durata = _a.sent();
                    nuovoCorso = new Corso(titoloCorso, descrizione, settoreProfessionale, durata);
                    corsi.push(nuovoCorso);
                    return [4 /*yield*/, showMessage("Corso creato con successo!")];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function addAzienda() {
    return __awaiter(this, void 0, void 0, function () {
        var nomeAzienda, settoreDiAttività, descrizione, posizioniAperte, nuovaAzienda;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showMessage("=== Registra una nuova azienda ===")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, askQuestion("Nome azienda: ")];
                case 2:
                    nomeAzienda = _a.sent();
                    return [4 /*yield*/, askQuestion("Settore di attività: ")];
                case 3:
                    settoreDiAttività = _a.sent();
                    return [4 /*yield*/, askQuestion("Descrizione: ")];
                case 4:
                    descrizione = _a.sent();
                    return [4 /*yield*/, askQuestion("Posizioni aperte (separate da virgola): ")];
                case 5:
                    posizioniAperte = (_a.sent())
                        .split(",")
                        .map(function (pos) { return pos.trim(); });
                    nuovaAzienda = new Azienda(nomeAzienda, settoreDiAttività, descrizione, posizioniAperte);
                    aziende.push(nuovaAzienda);
                    return [4 /*yield*/, showMessage("Azienda registrata con successo!")];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function iscriviPartecipanteACorso() {
    return __awaiter(this, void 0, void 0, function () {
        var message, partecipanteIndex, _a, corsoIndex, _b, partecipante, corso;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(partecipanti.length === 0 || corsi.length === 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, showMessage("Errore: Nessun partecipante o corso disponibile.")];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
                case 2:
                    message = "=== Iscrivi un partecipante a un corso ===\n\nElenco partecipanti:\n";
                    partecipanti.forEach(function (p, index) {
                        message += "".concat(index + 1, ". ").concat(p.nome, " ").concat(p.cognome, "\n");
                    });
                    message += "\nElenco corsi:\n";
                    corsi.forEach(function (c, index) {
                        message += "".concat(index + 1, ". ").concat(c.titoloCorso, "\n");
                    });
                    _a = parseInt;
                    return [4 /*yield*/, askQuestion(message + "\nSeleziona il numero del partecipante: ")];
                case 3:
                    partecipanteIndex = _a.apply(void 0, [_c.sent()]) - 1;
                    _b = parseInt;
                    return [4 /*yield*/, askQuestion("Seleziona il numero del corso: ")];
                case 4:
                    corsoIndex = _b.apply(void 0, [_c.sent()]) - 1;
                    if (!(isNaN(partecipanteIndex) ||
                        partecipanteIndex < 0 ||
                        partecipanteIndex >= partecipanti.length ||
                        isNaN(corsoIndex) ||
                        corsoIndex < 0 ||
                        corsoIndex >= corsi.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, showMessage("Selezione non valida.")];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 8];
                case 6:
                    partecipante = partecipanti[partecipanteIndex];
                    corso = corsi[corsoIndex];
                    partecipante.iscrivitiCorso(corso);
                    return [4 /*yield*/, showMessage("".concat(partecipante.nome, " ").concat(partecipante.cognome, " \u00E8 stato iscritto al corso \"").concat(corso.titoloCorso, "\""))];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function showPartecipanti() {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = "=== Elenco Partecipanti ===\n";
                    if (partecipanti.length === 0) {
                        message += "Nessun partecipante registrato.";
                    }
                    else {
                        partecipanti.forEach(function (p, index) {
                            message += "\n".concat(index + 1, ". ").concat(p.nome, " ").concat(p.cognome, "\n");
                            message += "   Paese di origine: ".concat(p.paeseDiOrigine, "\n");
                            message += "   Istruzione: ".concat(p.istruzione, "\n");
                            message += "   Competenze linguistiche: ".concat(p.competenzeLinguistiche, "\n");
                            message += "   Interesse: ".concat(p.formazioneDiInteresse, "\n");
                        });
                    }
                    return [4 /*yield*/, showMessage(message)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function assumiPartecipanteInAzienda() {
    return __awaiter(this, void 0, void 0, function () {
        var message, partecipanteIndex, _a, aziendaIndex, _b, partecipante, azienda, posizione;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(partecipanti.length === 0 || aziende.length === 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, showMessage("Errore: Nessun partecipante o azienda disponibile.")];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
                case 2:
                    message = "=== Assumi un partecipante in un'azienda ===\n\nElenco partecipanti:\n";
                    partecipanti.forEach(function (p, index) {
                        message += "".concat(index + 1, ". ").concat(p.nome, " ").concat(p.cognome, "\n");
                    });
                    message += "\nElenco aziende:\n";
                    aziende.forEach(function (a, index) {
                        message += "".concat(index + 1, ". ").concat(a.nomeAzienda, " - Posizioni aperte: ").concat(a.posizioniAperte.join(", "), "\n");
                    });
                    _a = parseInt;
                    return [4 /*yield*/, askQuestion(message + "\nSeleziona il numero del partecipante: ")];
                case 3:
                    partecipanteIndex = _a.apply(void 0, [_c.sent()]) - 1;
                    _b = parseInt;
                    return [4 /*yield*/, askQuestion("Seleziona il numero dell'azienda: ")];
                case 4:
                    aziendaIndex = _b.apply(void 0, [_c.sent()]) - 1;
                    if (!(isNaN(partecipanteIndex) ||
                        partecipanteIndex < 0 ||
                        partecipanteIndex >= partecipanti.length ||
                        isNaN(aziendaIndex) ||
                        aziendaIndex < 0 ||
                        aziendaIndex >= aziende.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, showMessage("Selezione non valida.")];
                case 5:
                    _c.sent();
                    return [2 /*return*/];
                case 6:
                    partecipante = partecipanti[partecipanteIndex];
                    azienda = aziende[aziendaIndex];
                    return [4 /*yield*/, askQuestion("Inserisci la posizione per ".concat(partecipante.nome, " in ").concat(azienda.nomeAzienda, ": "))];
                case 7:
                    posizione = _c.sent();
                    azienda.offriPosizione(partecipante, posizione);
                    return [4 /*yield*/, showMessage("".concat(partecipante.nome, " ").concat(partecipante.cognome, " \u00E8 stato assunto come ").concat(posizione, " in ").concat(azienda.nomeAzienda))];
                case 8:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function showAziende() {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = "=== Elenco Aziende ===\n";
                    if (aziende.length === 0) {
                        message += "Nessuna azienda registrata.";
                    }
                    else {
                        aziende.forEach(function (a, index) {
                            message += "\n".concat(index + 1, ". ").concat(a.nomeAzienda, " (").concat(a.settoreDiAttività, ")\n");
                            message += "   ".concat(a.descrizione, "\n");
                            message += "   Posizioni aperte: ".concat(a.posizioniAperte.join(", ") || "Nessuna", "\n");
                            if (a.dipendenti.length > 0) {
                                message += "   Dipendenti:\n";
                                a.dipendenti.forEach(function (d, i) {
                                    message += "      ".concat(i + 1, ". ").concat(d.partecipante.nome, " ").concat(d.partecipante.cognome, " - ").concat(d.posizione, "\n");
                                });
                            }
                        });
                    }
                    return [4 /*yield*/, showMessage(message)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function showCorsi() {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = "=== Elenco Corsi ===\n";
                    if (corsi.length === 0) {
                        message += "Nessun corso disponibile.";
                    }
                    else {
                        corsi.forEach(function (c, index) {
                            message += "\n".concat(index + 1, ". ").concat(c.titoloCorso, "\n");
                            message += "   Settore: ".concat(c.settoreProfessionale, "\n");
                            message += "   Durata: ".concat(c.durata, "\n");
                            message += "   Descrizione: ".concat(c.descrizione, "\n");
                            if (c.partecipanti.length > 0) {
                                message += "   Iscritti:\n";
                                c.partecipanti.forEach(function (p, i) {
                                    message += "      ".concat(i + 1, ". ").concat(p.nome, " ").concat(p.cognome, "\n");
                                });
                            }
                        });
                    }
                    return [4 /*yield*/, showMessage(message)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
console.log("Benvenuto nel Sistema di Gestione IncluDO!");
showMainMenu().catch(console.error);
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
