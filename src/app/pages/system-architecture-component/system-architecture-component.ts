// system-architecture.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-architecture',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Titolo capitolo -->
        <h1 class="text-4xl font-bold text-primary mb-8">Capitolo 3</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Architettura del sistema</h2>

        <!-- Sezione 3.1 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">3.1 Panoramica generale</h3>
          
          <p class="mb-4 leading-relaxed">
            L'architettura complessiva integra cinque elementi principali:
          </p>

          <ol class="list-decimal list-inside mb-6 space-y-2 ml-4">
            <li><strong>Desk operatore</strong>: Raspberry Pi con lettore RC522 e buzzer, esposto tramite un microservizio 
                Flask (<code class="bg-gray-200 px-2 py-1 rounded text-primary">desk_rfid_api.py</code>);</li>
            <li><strong>Nodi di stallo</strong>: Heltec WiFi LoRa 32 v3 con RC522 e buzzer, uno per ciascuno stallo fisico 
                (nel prototipo: uno stallo);</li>
            <li><strong>Gateway LoRa</strong>: seconda Heltec configurata in ricezione e collegata al Raspberry via USB;</li>
            <li><strong>Servizi Raspberry</strong>: script Python <code class="bg-gray-200 px-2 py-1 rounded text-primary">gateway_lora_to_http.py</code> 
                per il forwarding degli eventi verso Django;</li>
            <li><strong>Stack web</strong>: backend Django con le estensioni IoT e frontend Angular generato da OpenAPI.</li>
          </ol>

          <p class="mb-4 leading-relaxed">
            Il flusso informativo principale è il seguente: al desk l'operatore assegna un tag RFID a una bici tramite lettura 
            RC522 e chiamata al backend; l'operatore crea quindi un parcheggio attivo (bici + stallo logico). Quando la bici 
            viene parcheggiata nello stallo con nodo IoT, quest'ultimo legge il tag e genera un evento 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_scan</code> via LoRa. Il gateway riceve il messaggio 
            e lo inoltra al backend Django via HTTP; il backend interpreta l'evento, aggiorna la tabella 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">IoTEvent</code> e restituisce lo stato, che viene mostrato 
            dal frontend nella vista dei parcheggi.
          </p>
        </section>

        <!-- Sezione 3.2 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">3.2 Scelta della tecnologia LoRa</h3>
          
          <p class="mb-4 leading-relaxed">
            Per il collegamento tra nodi di stallo e gateway è stata scelta la tecnologia LoRa a 868 MHz, per i seguenti motivi:
          </p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>buona copertura con un unico gateway interno;</li>
            <li>maggiore robustezza alle interferenze rispetto al WiFi, spesso congestionato in ambienti pubblici;</li>
            <li>integrazione semplice con ESP32 tramite librerie come RadioLib;</li>
            <li>consumo energetico ridotto rispetto a protocolli basati su WiFi.</li>
          </ul>

          <p class="mb-4 leading-relaxed">
            Lo schema adottato non utilizza il protocollo LoRaWAN completo, ma un layer applicativo minimale costruito su 
            pacchetti LoRa non strutturati. Questo è sufficiente per il tipo e il volume di dati richiesti (eventi di parcheggio 
            con payload molto contenuti) e riduce la complessità lato firmware.
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
export class SystemArchitectureComponent {}