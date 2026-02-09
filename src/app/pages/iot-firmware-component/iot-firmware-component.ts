// iot-firmware.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iot-firmware',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Titolo capitolo -->
        <h1 class="text-4xl font-bold text-primary mb-8">Capitolo 5</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Logica dei nodi IoT</h2>

        <!-- Sezione 5.1 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">5.1 Nodo di stallo: gestione RFID e anti-spam</h3>
          
          <p class="mb-4 leading-relaxed">
            Il codice del nodo di stallo, sviluppato in Arduino C++, è responsabile dell'inizializzazione dei moduli 
            LoRa e RFID (RC522), della lettura continua dei tag e dell'invio degli eventi verso il sistema centrale.
          </p>

          <p class="mb-4 leading-relaxed">
            Ogni nodo è identificato da una costante <code class="bg-gray-200 px-2 py-1 rounded text-primary">ID_STALLO</code>, 
            coerente con il campo <code class="bg-gray-200 px-2 py-1 rounded text-primary">node_id</code> del modello 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">LoRaDevice</code> nel backend. Questo identificativo 
            consente di associare in modo stabile ciascun evento generato a uno specifico stallo logico del gestionale, 
            indipendentemente da parametri di rete come indirizzi IP o MAC.
          </p>

          <p class="mb-4 leading-relaxed">
            Gli eventi vengono trasmessi come messaggi strutturati, contenenti l'identità del nodo, un numero di 
            sequenza incrementale, il tipo di evento e, quando presente, l'UID del tag RFID letto. Un esempio di messaggio 
            generato dal nodo di stallo è il seguente:
          </p>

          <div class="bg-gray-200 rounded-md p-4 my-6 text-center">
            <code class="text-primary text-sm">node=12;seq=NN;ev=rfid_scan;uid=52182D06</code>
          </div>

          <p class="mb-4 leading-relaxed">
            L'invio degli eventi è accompagnato da un feedback tramite buzzer, che segnala all'utente il corretto 
            invio del messaggio.
          </p>

          <p class="mb-4 leading-relaxed">
            Per evitare la generazione ripetuta di eventi nel caso in cui un tag rimanga fermo sul lettore, è implementata 
            una logica di anti-spam basata su tre elementi: l'ultimo UID rilevato, lo stato di presenza del tag 
            e un intervallo di cooldown temporale. Questa strategia consente di distinguere tra una permanenza del tag sul 
            lettore e una nuova azione intenzionale di parcheggio.
          </p>

          <p class="mb-4 leading-relaxed">
            Il codice completo del nodo di stallo, comprensivo delle funzioni di invio degli eventi e della 
            logica di anti-spam, è riportato in Appendice A.1.
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
export class IotFirmwareComponent {}