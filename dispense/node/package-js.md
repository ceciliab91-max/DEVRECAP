# Package JavaScript e pnpm

**Argomento:** Node | **Data Lezione:** 2026-07-21 | **File Sorgente:** lezioni/package.html

## Panoramica
Il registro pi&ugrave; usato per i package JavaScript &egrave; npmjs.com . Ogni pagina contiene documentazione, versioni pubblicate, dipendenze, repository e statistiche. Cerca il package su npm, poi apri la documentazione ufficiale e il repository collegato. Controlla sempre il nome: package con no...

### Dove cercare un package
Il registro pi&ugrave; usato per i package JavaScript &egrave; npmjs.com . Ogni pagina contiene documentazione, versioni pubblicate, dipendenze, repository e statistiche. Cerca il package su npm, poi apri la documentazione ufficiale e il repository collegato. Controlla sempre il nome: package con nomi molto simili possono essere progetti diversi. Esempio # installare Bootstrap nel progetto pnpm add bootstrap

### Valutare lo stato di salute
Un package molto scaricato non &egrave; automaticamente un package affidabile. Prima di usarlo, controlla pi&ugrave; segnali insieme: Attivit&agrave; recente: release, commit e risposte alle issue mostrano se il progetto &egrave; mantenuto. Issue e pull request: guarda se i problemi importanti vengono discussi e chiusi. Documentazione: README, esempi, changelog e istruzioni di migrazione devono essere chiari. Compatibilit&agrave;: verifica versione di Node, browser supportati e dipendenze richieste. Sicurezza e licenza: controlla vulnerabilit&agrave; note e condizioni d'uso del package. I download sono utili per capire la diffusione, ma non bastano da soli per giudicare qualit&agrave;, sicurezza e manutenzione.

### Release e Semantic Versioning
Una versione SemVer segue lo schema MAJOR.MINOR.PATCH , per esempio 5.3.3 . Una release &egrave; una versione pubblicata del package. Nel changelog trovi cosa cambia e se l'aggiornamento richiede modifiche al tuo codice. Major: include cambiamenti incompatibili, per esempio da 5.3.3 a 6.0.0 . Minor: aggiunge funzionalit&agrave; compatibili, per esempio da 5.3.3 a 5.4.0 . Patch: corregge bug senza cambiare l'uso previsto, per esempio da 5.3.3 a 5.3.4 . Le issue sono segnalazioni e discussioni su bug, richieste di funzionalit&agrave; o problemi di documentazione. Prima di aggiornare, verifica se esistono issue importanti ancora aperte. Il simbolo ~ : aggiornamenti patch Il simbolo ~ blocca la major e la minor . Permette solo gli aggiornamenti patch. { "dependencies": { "bootstrap": "~5.3.3" } } In questo caso pnpm pu&ograve; installare 5.3.3 , 5.3.4 , 5.3.5 e cos&igrave; via. Non pu&ograve; installare 5.4.0 . ~5.3.3 significa: da 5.3.3 incluso fino a prima di 5.4.0 .

### caret
Il simbolo ^ : aggiornamenti compatibili Il simbolo ^ blocca solo la major . Permette aggiornamenti minor e patch, che SemVer considera compatibili. { "dependencies": { "bootstrap": "^5.3.3" } } In questo caso pnpm pu&ograve; installare 5.3.3 , 5.3.4 e anche 5.4.0 . Non pu&ograve; installare 6.0.0 , perch&eacute; &egrave; una nuova major. ^5.3.3 significa: da 5.3.3 incluso fino a prima di 6.0.0 .

### Lavorare con i package usando pnpm
Esegui questi comandi dalla cartella che contiene package.json . Conserva anche pnpm-lock.yaml : registra la versione esatta installata e rende il progetto riproducibile. # aggiungere una dipendenza pnpm add bootstrap # rimuovere una dipendenza pnpm remove bootstrap # aggiornare rispettando i range del package.json pnpm update # aprire la pagina del package nel browser pnpm home bootstrap # mostrare le licenze delle dipendenze installate pnpm licenses list # aggiornare alle ultime versioni, anche oltre il range attuale pnpm update --latest pnpm update rispetta i vincoli come ^ e ~ . pnpm update --latest cerca invece le versioni pi&ugrave; recenti e pu&ograve; introdurre nuove major: dopo il comando, leggi il changelog ed esegui i test. Esercizio Installa Bootstrap, apri la home del package, controlla le licenze, esegui un aggiornamento e infine rimuovi il package. Mostra soluzione pnpm add bootstrap pnpm home bootstrap pnpm licenses list pnpm update pnpm update --latest pnpm remove bootstrap

```bash
# installare Bootstrap nel progetto
pnpm add bootstrap
```

```json
{
  "dependencies": {
    "bootstrap": "~5.3.3"
  }
}
```

```json
{
  "dependencies": {
    "bootstrap": "^5.3.3"
  }
}
```

```bash
# aggiungere una dipendenza
pnpm add bootstrap

# rimuovere una dipendenza
pnpm remove bootstrap

# aggiornare rispettando i range del package.json
pnpm update

# aprire la pagina del package nel browser
pnpm home bootstrap

# mostrare le licenze delle dipendenze installate
pnpm licenses list

# aggiornare alle ultime versioni, anche oltre il range attuale
pnpm update --latest
```

```bash
pnpm add bootstrap
pnpm home bootstrap
pnpm licenses list
pnpm update
pnpm update --latest
pnpm remove bootstrap
```
