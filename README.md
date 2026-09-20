# 🎓 DevExam PRO (DevRecap)

> **Full-Stack Developer Certification Simulator & Collaborative Study Hub**  
> Piattaforma interattiva per la simulazione d'esame, lo studio teorico e il consolidamento pratico delle competenze full-stack (JavaScript, React, Node.js, SQL).

[![Lighthouse 100%](https://img.shields.io/badge/Lighthouse-100%25%20All%20Audits-brightgreen.svg)](#-prestazioni--accessibilità)
[![React 19](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.3-38bdf8.svg)](https://tailwindcss.com/)
[![Netlify Serverless](https://img.shields.io/badge/Serverless-Netlify%20Blobs-00ad9f.svg)](https://www.netlify.com/)
[![Linter Oxlint](https://img.shields.io/badge/Linter-Oxlint%20(0%20errors)-success.svg)](https://oxc-project.github.io/)

---

## 🚀 Panoramica del Progetto

**DevExam PRO** è un'applicazione web moderna concepita come simulatore d'esame e hub di apprendimento per sviluppatori web. Nata come strumento pratico di ripasso e autovalutazione, si è evoluta in un'architettura **full-stack serverless** performante, accessibile e collaborativa.

### 🌟 Caratteristiche Chiave

- **Simulatore d'Esame Interattivo:** Quiz a tempo, tracking degli errori, spiegazioni contestuali e storicizzazione delle performance.
- **Study Hub & Dispense Tematiche:** Materiali didattici organizzati per moduli (`JavaScript`, `React`, `SQL`) integrati con sfide di live coding.
- **Autenticazione Multi-Account:** Flusso completo di login e registrazione (Username / Email) con crittografia client/serverless.
- **Isolamento Dati Multi-Tenant:** Gestione indipendente di bookmark, statistiche e note per singolo utente.
- **Persistenza Ibrida & Cloud Sync:** Sincronizzazione automatica tra locale e cloud tramite Netlify Blobs con supporto offline trasparente.
- **Compressione Lossless LZ:** Riduzione dell'impronta di storage del browser >80% con pieno supporto sincrono alle operazioni CRUD (`lz-string`).
- **Resilienza Runtime:** `GlobalErrorBoundary` al top-level di React per il recupero della sessione senza interruzioni.

---

## 🛠️ Stack Tecnologico

- **Frontend Core:** React 19, Vite (compilatore Rust SWC), Tailwind CSS v4.
- **Backend & Cloud Storage:** Netlify Serverless Functions, Netlify Blobs.
- **Sicurezza:** Web Crypto API nativa (SHA-256 + salt) per l'hashing crittografico.
- **Ottimizzazione & Build:** `vite-plugin-compression` (pre-compressione asset Brotli `.br` e Gzip `.gz`), lazy loading asincrono e code-splitting.
- **Code Quality & Testing:** Oxlint, Google Lighthouse CI.

---

## ⚡ Prestazioni & Accessibilità (Google Lighthouse)

L'applicazione è progettata seguendo rigorosamente gli standard **WCAG 2.1 AA** e le best practice moderne di web performance:

| Metrica | Desktop | Mobile (Fast 4G) |
| :--- | :---: | :---: |
| **Performance** | **100%** | **100%** |
| **Accessibilità** | **100%** | **100%** |
| **Best Practices** | **100%** | **100%** |
| **SEO** | **100%** | **100%** |

- **Total Blocking Time (TBT):** 0 ms
- **Cumulative Layout Shift (CLS):** 0
- **Bundle iniziale:** compresso a soli ~139 kB
- **Accessibilità:** Marcatori ARIA completi, skip link per navigazione da tastiera e metadati strutturati JSON-LD Schema.org.

---
