// raspberry-services.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-raspberry-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Titolo capitolo -->
        <h1 class="text-4xl font-bold text-primary mb-8">Capitolo 6</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Servizi sul Raspberry Pi</h2>

        <!-- Sezione 6.1 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">6.1 Gateway LoRa → HTTP</h3>
          
          <p class="mb-4 leading-relaxed">
            Il gateway LoRa rappresenta il punto di collegamento tra la rete radio dei nodi di stallo e il backend 
            applicativo. Dal punto di vista software, questo ruolo è svolto da uno script Python eseguito su Raspberry Pi 
            all'interno di una virtual environment dedicata.
          </p>

          <p class="mb-4 leading-relaxed">
            Il servizio apre una connessione seriale verso la scheda Heltec configurata in ricezione e legge in modo 
            continuo le righe di testo corrispondenti ai messaggi LoRa ricevuti. Da ciascuna linea viene estratto il 
            payload dell'evento, ignorando eventuali informazioni accessorie come il valore di RSSI.
          </p>

          <p class="mb-4 leading-relaxed">
            Il payload viene quindi convertito in una struttura dati JSON conforme all'endpoint 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">/api/core/iot/events</code> del backend Django. 
            Per gli eventi di tipo <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_scan</code>, il servizio 
            include anche il campo <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code>.
          </p>

          <p class="mb-4 leading-relaxed">
            Ogni richiesta HTTP inviata al backend include un header di autenticazione 
            (<code class="bg-gray-200 px-2 py-1 rounded text-primary">X-Device-Key</code>), che consente di associare in 
            modo sicuro ciascun evento al dispositivo che lo ha generato. Il servizio gestisce inoltre i casi di errore e 
            registra le risposte del backend per finalità di debugging e monitoraggio.
          </p>

          <p class="mb-4 leading-relaxed">
            Il codice completo del gateway LoRa–HTTP è riportato in Appendice A.2.
          </p>
        </section>

        <!-- Sezione 6.2 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">6.2 API Desk RFID</h3>
          
          <p class="mb-4 leading-relaxed">
            Al Box Office è presente un microservizio dedicato alla lettura dei tag RFID, implementato tramite Flask e 
            ospitato sul Raspberry Pi. Questo servizio espone un'API HTTP utilizzata dal frontend per acquisire in modo 
            controllato l'UID di un tag RFID.
          </p>

          <p class="mb-4 leading-relaxed">
            L'endpoint principale <code class="bg-gray-200 px-2 py-1 rounded text-primary">/api/rfid/read-once</code> 
            effettua una lettura bloccante: una volta ricevuta la richiesta, il servizio attende che l'operatore appoggi 
            un tag sul lettore RC522, fornendo un feedback acustico tramite buzzer sia all'inizio dell'operazione sia al 
            termine della lettura.
          </p>

          <p class="mb-4 leading-relaxed">
            L'UID letto viene normalizzato in formato esadecimale e restituito al frontend come risposta JSON. Questo 
            approccio consente di separare la gestione dell'hardware RFID dalla logica applicativa del backend, mantenendo 
            il sistema modulare e facilmente estendibile.
          </p>

          <p class="mb-4 leading-relaxed">
            Il listato completo del microservizio di desk RFID è riportato in Appendice A.2.
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
export class RaspberryServicesComponent {}