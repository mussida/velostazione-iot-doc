// requirements-analysis.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requirements-analysis',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Titolo capitolo -->
        <h1 class="text-4xl font-bold text-primary mb-8">Capitolo 2</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Analisi del problema e requisiti</h2>

        <!-- Sezione 2.1 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">2.1 Requisiti funzionali</h3>
          
          <p class="mb-4 leading-relaxed">
            A partire dall'analisi del contesto operativo della Velostazione e del flusso di lavoro descritto nel capitolo 
            introduttivo, emergono una serie di requisiti funzionali che il sistema IoT deve soddisfare per garantire la 
            coerenza tra stato fisico degli stalli e stato logico dei parcheggi gestiti dal software.
          </p>

          <p class="mb-4 leading-relaxed">
            In primo luogo, ogni stallo fisico del deposito deve essere associato in modo univoco a un nodo IoT, installato 
            in prossimità del portabici, in grado di leggere un tag RFID e di generare eventi verso il sistema centrale. 
            Tale associazione consente di ricondurre ogni evento osservato nello spazio fisico a uno specifico stallo logico 
            del gestionale.
          </p>

          <p class="mb-4 leading-relaxed">
            Ogni evento generato da un nodo IoT deve includere un insieme minimo di informazioni strutturate, necessarie per 
            l'identificazione del contesto in cui l'evento è stato prodotto e per la sua corretta interpretazione da parte 
            del backend. In particolare, un evento deve contenere:
          </p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>un identificativo del nodo (<code class="bg-gray-200 px-2 py-1 rounded text-primary">node_id</code>), che 
                rappresenta l'identità logica del dispositivo IoT e permette al backend di risalire allo stallo associato;</li>
            <li>un numero di sequenza (<code class="bg-gray-200 px-2 py-1 rounded text-primary">seq</code>), incrementato 
                localmente dal nodo, utilizzato per individuare e scartare eventuali duplicazioni di eventi;</li>
            <li>un tipo di evento (<code class="bg-gray-200 px-2 py-1 rounded text-primary">event_type</code>), che descrive 
                la natura dell'azione osservata dal nodo. Nel prototipo il tipo di evento principale è 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_scan</code>, utilizzato per segnalare la lettura 
                di un tag RFID presso uno stallo;</li>
            <li>un eventuale identificativo RFID (<code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code>), 
                presente solo per gli eventi che coinvolgono la lettura di un tag e assente per eventi di altra natura.</li>
          </ul>

          <p class="mb-4 leading-relaxed">
            Il backend deve essere in grado di ricondurre il valore di <code class="bg-gray-200 px-2 py-1 rounded text-primary">node_id</code> 
            allo stallo logico corrispondente senza fare affidamento su parametri di rete instabili, come indirizzi IP o MAC address. 
            Questa scelta permette di rendere il sistema robusto rispetto a riavvii, riconfigurazioni di rete o sostituzioni hardware.
          </p>

          <p class="mb-4 leading-relaxed">
            Per evitare la registrazione multipla dello stesso evento, il sistema deve implementare un meccanismo di deduplicazione 
            basato sulla coppia (<code class="bg-gray-200 px-2 py-1 rounded text-primary">device</code>, 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">seq</code>), imponendo un vincolo di unicità che garantisca 
            che ciascun evento venga processato una sola volta.
          </p>

          <p class="mb-4 leading-relaxed">
            Nel caso specifico degli eventi di tipo <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_scan</code>, 
            il backend deve infine essere in grado di classificare l'esito della lettura confrontando lo stato fisico osservato 
            con lo stato logico del gestionale. In particolare, il sistema deve distinguere i seguenti casi:
          </p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li><code class="bg-gray-200 px-2 py-1 rounded text-primary">unknown_rfid</code>: il tag letto non è associato a 
                nessuna bicicletta conosciuta dal sistema;</li>
            <li><code class="bg-gray-200 px-2 py-1 rounded text-primary">no_active_parking</code>: il tag è valido, ma la 
                bicicletta associata non ha un parcheggio attivo al momento della lettura;</li>
            <li><code class="bg-gray-200 px-2 py-1 rounded text-primary">mismatch</code>: la bicicletta è correttamente 
                registrata e ha un parcheggio attivo, ma risulta collocata in uno stallo diverso da quello assegnato;</li>
            <li><code class="bg-gray-200 px-2 py-1 rounded text-primary">ok</code>: la bicicletta è parcheggiata nello stallo 
                fisico corrispondente a quello assegnato dal gestionale.</li>
          </ul>

          <p class="mb-4 leading-relaxed">
            Questa classificazione costituisce la base per la visualizzazione dello stato IoT dei parcheggi nel frontend e per 
            l'individuazione immediata di eventuali anomalie operative.
          </p>
        </section>

        <!-- Sezione 2.2 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">2.2 Requisiti non funzionali</h3>
          
          <p class="mb-4 leading-relaxed">
            Oltre ai requisiti funzionali, il progetto è guidato da una serie di requisiti non funzionali legati alle 
            caratteristiche fisiche della Velostazione, ai vincoli di installazione e alla sostenibilità del sistema nel tempo.
          </p>

          <p class="mb-4 leading-relaxed">
            In particolare, il sistema deve ridurre al minimo il cablaggio necessario negli spazi del deposito, al fine di 
            semplificare l'installazione e limitare l'impatto sull'infrastruttura esistente. La comunicazione tra nodi di 
            stallo e sistema centrale deve quindi avvenire prevalentemente via radio.
          </p>

          <p class="mb-4 leading-relaxed">
            È inoltre necessario garantire una copertura affidabile del segnale anche in presenza di strutture murarie, 
            ostacoli e affollamento, tipici di un ambiente sotterraneo come quello della Velostazione.
          </p>

          <p class="mb-4 leading-relaxed">
            Dal punto di vista energetico, i nodi IoT devono mantenere un consumo sufficientemente contenuto da rendere 
            possibile, in prospettiva, un'alimentazione a batteria o soluzioni ibride, riducendo la necessità di interventi 
            di manutenzione.
          </p>

          <p class="mb-4 leading-relaxed">
            Infine, la complessità del firmware installato sui nodi di stallo deve essere mantenuta il più possibile limitata, 
            delegando al backend la logica di interpretazione degli eventi. Questa scelta semplifica lo sviluppo, il debugging 
            e l'evoluzione del sistema, centralizzando le decisioni applicative nel livello software più facilmente aggiornabile.
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
export class RequirementsAnalysisComponent {}