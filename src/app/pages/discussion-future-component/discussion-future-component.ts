// discussion-future.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discussion-future',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Titolo capitolo -->
        <h1 class="text-4xl font-bold text-primary mb-8">Capitolo 10</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Discussione e sviluppi futuri</h2>

        <!-- Contenuto principale -->
        <section class="mb-12">
          <p class="mb-4 leading-relaxed">
            Il prototipo descritto è operativo per un singolo stallo, ma è stato progettato pensando a una scalabilità 
            fino a circa cento stalli. La separazione tra:
          </p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>identità del nodo (<code class="bg-gray-200 px-2 py-1 rounded text-primary">node_id</code>);</li>
            <li>mapping verso lo stallo (<code class="bg-gray-200 px-2 py-1 rounded text-primary">LoRaDevice</code>);</li>
            <li>log degli eventi (<code class="bg-gray-200 px-2 py-1 rounded text-primary">IoTEvent</code>);</li>
          </ul>

          <p class="mb-4 leading-relaxed">
            permette di estendere il sistema aggiungendo nuovi nodi Heltec e configurando via via i corrispondenti 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">LoRaDevice</code> nel backend.
          </p>

          <p class="mb-4 leading-relaxed">
            Tra gli sviluppi futuri possibili si segnalano:
          </p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>utilizzo di sensori di presenza (ad esempio infrarossi) sui nodi di stallo per generare eventi 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">occupied</code>/<code class="bg-gray-200 px-2 py-1 rounded text-primary">free</code>;</li>
            <li>integrazione con meccanismi di aggiornamento firmware OTA per una manutenzione più agevole;</li>
            <li>correlazione tra eventi IoT e modulo di Machine Learning descritto nella tesi, per analizzare la coerenza 
                tra previsioni di affluenza e utilizzo reale degli stalli.</li>
          </ul>
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
export class DiscussionFutureComponent {}