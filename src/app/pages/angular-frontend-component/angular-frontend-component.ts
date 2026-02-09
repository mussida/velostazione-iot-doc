// angular-frontend.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-angular-frontend',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Titolo capitolo -->
        <h1 class="text-4xl font-bold text-primary mb-8">Capitolo 8</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Frontend Angular e flusso utente</h2>

        <!-- Sezione 8.1 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">8.1 Interazione con il desk RFID</h3>
          
          <p class="mb-4 leading-relaxed">
            Nel frontend Angular sono stati aggiunti servizi per:
          </p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>interrogare il Raspberry al desk tramite <code class="bg-gray-200 px-2 py-1 rounded text-primary">/api/rfid/read-once</code>;</li>
            <li>inviare l'UID letto al backend con <code class="bg-gray-200 px-2 py-1 rounded text-primary">/api/core/rfid/assign</code>.</li>
          </ul>

          <p class="mb-4 leading-relaxed">
            La schermata di assegnazione del tag mostra la bicicletta selezionata e uno stato di attesa finché il servizio 
            da banco non restituisce l'UID. Un esempio di schermata è previsto in Figura 8.1.
          </p>

          <!-- Figura assegnazione RFID -->
          <figure class="my-8">
            <img 
              src="assets/chapter8/screenCreazioneParcheggio.png" 
              alt="Schermata di assegnazione RFID"
              class="w-full border border-gray-700 rounded"
            />
            <figcaption class="text-sm text-gray-500 mt-3 text-center">
              <strong>Figura 8.1:</strong> Schermata di assegnazione di un tag RFID a una bicicletta al desk.
            </figcaption>
          </figure>
        </section>

        <!-- Sezione 8.2 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">8.2 Creazione e gestione dei parcheggi</h3>
          
          <p class="mb-4 leading-relaxed">
            Per la creazione di un parcheggio attivo, l'operatore seleziona utente, bici, tag RFID, stallo e tariffa e 
            invia i dati al backend. Il frontend mostra un riepilogo e consente di chiudere il parcheggio al ritiro della bici.
          </p>

          <p class="mb-4 leading-relaxed">
            La Figura 8.2 mostra la lista dei parcheggi attivi con badge di stato IoT.
          </p>

          <!-- Figura elenco parcheggi -->
          <figure class="my-8">
            <img 
              src="assets/chapter8/screenTabella.png" 
              alt="Elenco parcheggi con stato IoT"
              class="w-full border border-gray-700 rounded"
            />
            <figcaption class="text-sm text-gray-500 mt-3 text-center">
              <strong>Figura 8.2:</strong> Elenco dei parcheggi attivi con badge di stato IoT.
            </figcaption>
          </figure>
        </section>

      </div>
    </div>
  `,
  styles: [`
    code {
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }

    sup {
      font-size: 0.75em;
      vertical-align: super;
    }

    a {
      transition: color 0.2s ease;
    }
  `]
})
export class AngularFrontendComponent {}