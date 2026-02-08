// end-to-end-workflow.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-end-to-end-workflow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Titolo capitolo -->
        <h1 class="text-4xl font-bold text-primary mb-8">Capitolo 9</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Flusso di lavoro end-to-end</h2>

        <!-- Sezione 9.1 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">9.1 Dall'assegnazione del tag alla convalida IoT</h3>
          
          <p class="mb-4 leading-relaxed">
            Raccogliendo quanto descritto nei capitoli precedenti, il flusso di lavoro end-to-end è il seguente:
          </p>

          <ol class="list-decimal list-inside mb-6 space-y-3 ml-4">
            <li>assegnazione del tag al desk (Raspberry + RC522 + API Flask);</li>
            <li>creazione del parcheggio attivo sul gestionale (Django + Angular);</li>
            <li>parcheggio fisico della bici nello stallo con nodo LoRa;</li>
            <li>generazione dell'evento <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_scan</code> e invio via LoRa;</li>
            <li>inoltro dell'evento dal gateway al backend Django;</li>
            <li>interpretazione dell'evento e aggiornamento dello stato IoT del parcheggio;</li>
            <li>rilascio del parcheggio e liberazione del tag.</li>
          </ol>
        </section>

        <!-- Sezione 9.2 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">9.2 Anomalie rilevabili</h3>
          
          <p class="mb-4 leading-relaxed">
            Grazie alla combinazione di <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code>, mapping 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">node_id</code> → stallo e stato dei parcheggi, il 
            sistema è in grado di distinguere in modo chiaro:
          </p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>una bici corretta nello stallo giusto (<code class="bg-gray-200 px-2 py-1 rounded text-primary">ok</code>);</li>
            <li>una bici corretta ma nello stallo sbagliato (<code class="bg-gray-200 px-2 py-1 rounded text-primary">mismatch</code>);</li>
            <li>un tag sconosciuto (<code class="bg-gray-200 px-2 py-1 rounded text-primary">unknown_rfid</code>);</li>
            <li>una bici con tag valido ma senza parcheggio attivo (<code class="bg-gray-200 px-2 py-1 rounded text-primary">no_active_parking</code>).</li>
          </ul>

          <p class="mb-4 leading-relaxed">
            Queste informazioni possono essere presentate all'operatore in modo sintetico, ad esempio tramite badge colorati 
            nella lista dei parcheggi attivi.
          </p>
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
export class EndToEndWorkflowComponent {}