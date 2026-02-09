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
            Il prototipo che viene proposto in questo progetto comprende i seguenti componenti:
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
            Per il collegamento tra nodi di stallo e gateway è stata scelta la tecnologia LoRa a 868 MHz, è risultata sin da 
            subito un'ottima soluzione perché presenta maggiore robustezza alle interferenze rispetto al WiFi. Poi LoRa è 
            progettato appositamente per dispositivi IoT a bassissimo consumo energetico, permettendo loro di funzionare per 
            anni con una singola batteria, mentre il Wi-Fi è concepito per alte velocità di trasferimento dati, il che comporta 
            un maggiore assorbimento energetico.
          </p>
        </section>

        <!-- Sezione 3.3 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">3.3 Gestione degli errori e robustezza del sistema</h3>
          
          <p class="mb-4 leading-relaxed">
            Poiché il sistema integra dispositivi IoT distribuiti, comunicazioni radio e servizi web, sono stati introdotti 
            diversi meccanismi di gestione degli errori con l'obiettivo di rendere il flusso complessivo robusto a duplicazioni, 
            messaggi malformati e tentativi di accesso non autorizzati.
          </p>

          <p class="mb-4 leading-relaxed">
            A livello di <strong>nodo di stallo</strong>, è implementata una logica di anti-spam per la lettura RFID. Il nodo 
            mantiene uno stato locale relativo all'ultimo tag rilevato e invia un evento 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_scan</code> solo quando viene rilevato un nuovo UID 
            oppure quando un tag, precedentemente rimosso, viene nuovamente appoggiato sul lettore. In questo modo si evita la 
            generazione continua di eventi nel caso in cui una bici rimanga ferma nello stallo per un periodo prolungato.
          </p>

          <p class="mb-4 leading-relaxed">
            Ogni evento generato dal nodo include inoltre un <strong>numero di sequenza incrementale</strong> 
            (<code class="bg-gray-200 px-2 py-1 rounded text-primary">seq</code>), che viene aumentato a ogni nuovo evento 
            valido. Questo campo consente di distinguere in modo univoco gli eventi provenienti dallo stesso dispositivo e 
            costituisce la base per la gestione delle duplicazioni a valle.
          </p>

          <p class="mb-4 leading-relaxed">
            Il <strong>gateway LoRa</strong> su Raspberry Pi introduce un ulteriore livello di filtraggio. Lo script di 
            forwarding analizza le stringhe ricevute dalla porta seriale e considera validi solo i messaggi che rispettano il 
            formato atteso e contengono i campi obbligatori (<code class="bg-gray-200 px-2 py-1 rounded text-primary">node</code>, 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">seq</code>, 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">ev</code>). Le linee non conformi o incomplete vengono 
            scartate e registrate nei log, senza essere inoltrate al backend.
          </p>

          <p class="mb-4 leading-relaxed">
            Per ogni messaggio valido, il gateway costruisce una richiesta HTTP verso il backend Django includendo un header 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">X-Device-Key</code>. Tale header contiene una chiave 
            segreta associata al dispositivo sorgente e permette al backend di autenticare il nodo che ha generato l'evento. 
            In questo modo, anche se l'endpoint HTTP fosse raggiungibile dall'esterno, solo i dispositivi registrati e 
            autorizzati possono produrre eventi IoT accettati dal sistema.
          </p>

          <p class="mb-4 leading-relaxed">
            Sul <strong>backend</strong>, la robustezza è garantita da ulteriori controlli. Ogni evento viene associato a un 
            dispositivo logico e viene verificata l'unicità della coppia 
            (<code class="bg-gray-200 px-2 py-1 rounded text-primary">device</code>, 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">seq</code>). Se un evento con lo stesso numero di 
            sequenza risulta già presente nel database, esso viene classificato come duplicato e ignorato, evitando 
            aggiornamenti ripetuti o incoerenti dello stato degli stalli.
          </p>

          <p class="mb-4 leading-relaxed">
            Infine, per gli eventi RFID, il backend valuta la coerenza tra lo stato fisico osservato e lo stato logico del 
            gestionale, classificando l'esito dell'evento (ad esempio tag sconosciuto, assenza di un parcheggio attivo o 
            corrispondenza corretta). Questo approccio consente di segnalare eventuali anomalie operative senza compromettere 
            la consistenza dei dati principali e mantenendo separata la logica di validazione dal livello hardware.
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