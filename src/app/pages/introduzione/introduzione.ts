// introduction.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Titolo capitolo -->
        <h1 class="text-4xl font-bold text-primary mb-8">Capitolo 1</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Introduzione</h2>

        <!-- Sezione 1.1 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">1.1 La Velostazione e lo spazio fisico</h3>
          
          <p class="mb-4 leading-relaxed">
            Questo progetto nasce all'interno di un lavoro più ampio dedicato alla nuova Velostazione di Bologna
            <sup class="text-primary">
              <a href="https://maps.google.com/?q=Velostazione+di+Bologna" 
                 target="_blank" 
                 class="text-primary hover:text-green-500">1</a>
            </sup>, 
            per la quale è stato sviluppato un gestionale web per la gestione di biciclette, clienti, tariffe e parcheggi.
          </p>

          <p class="mb-4 leading-relaxed">
            La Velostazione occupa gli spazi sotto la scalinata monumentale del Pincio, affacciata su via Indipendenza. 
            L'ambiente è composto da sequenza di locali con destinazioni d'uso differenti: aree tecniche, spazi per 
            il pubblico, zone di servizio e, soprattutto, una vasta area destinata al deposito delle biciclette.
          </p>

          <p class="mb-6 leading-relaxed">
            La planimetria di progetto, riportata in Figura 1.1, mostra la suddivisione degli spazi. Nella parte inferiore 
            si sviluppa il grande <em>Deposito biciclette</em>, organizzato in blocchi di portabici paralleli e numerati, 
            all'interno dei quali vengono collocati gli stalli gestiti dal sistema.
          </p>

          <!-- Figura planimetria -->
          <figure class="my-8">
            <img 
              src="assets/chapter1/Planimetria velostazione_AS BUILT_ PT (2) (2) (1).png" 
              alt="Planimetria della Velostazione"
              class="w-full border border-gray-700 rounded"
            />
            <figcaption class="text-sm text-gray-500 mt-3 text-center">
              <strong>Figura 1.1:</strong> Planimetria della Velostazione: in basso l'area di deposito biciclette.
            </figcaption>
          </figure>

          <p class="mb-4 leading-relaxed">
            Al centro della porzione superiore è collocato il locale <strong>Box Office</strong>, che costituisce il 
            principale punto di contatto con il pubblico. Qui l'operatore registra ingressi e uscite, gestisce abbonamenti 
            e tariffe e interagisce con la piattaforma software. Nell'ambito di questo progetto il Box Office è anche il 
            luogo in cui viene allestita la postazione IoT del desk: un banco con Raspberry Pi
            <sup class="text-primary">
              <a href="https://www.raspberrypi.com/products/raspberry-pi-4-model-b/" 
                 target="_blank" 
                 class="text-primary hover:text-green-500">2</a>
            </sup>, 
            lettore RFID
            <sup class="text-primary">
              <a href="https://www.az-delivery.de/it/products/rfid-set" 
                 target="_blank" 
                 class="text-primary hover:text-green-500">3</a>
            </sup>, 
            e buzzer
            <sup class="text-primary">4</sup>, 
            collegato alla rete interna e al backend Django
            <sup class="text-primary">5</sup>.
          </p>

          <p class="mb-4 leading-relaxed">
            Verso la parte inferiore della planimetria si può osservare il <strong>Deposito biciclette</strong>, 
            suddiviso in più zone contigue. Ogni zona è attrezzata con gruppi di portabici numerati (ad esempio 
            "N. 16 portabici per 32 bici", "N. 10 portabici per 20 bici", ecc.), che nel gestionale corrispondono 
            a un insieme di stalli. In questa porzione dello spazio viene installato, nel prototipo, il nodo IoT 
            di stallo: una scheda Heltec
            <sup class="text-primary">
              <a href="https://heltec.org/project/wifi-lora-32-v3/" 
                 target="_blank" 
                 class="text-primary hover:text-green-500">6</a>
            </sup> 
            con lettore RFID applicata in prossimità di un portabici, in modo che il tag della bici sia leggibile 
            quando la ruota è correttamente inserita.
          </p>

          <p class="mb-4 leading-relaxed">
            Questa distinzione tra Box Office e Deposito biciclette è centrale per l'architettura del sistema, infatti:
          </p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>nel Box Office si svolgono tutte le operazioni amministrative e gestionali (assegnazione dei tag, 
                creazione e chiusura dei parcheggi, gestione delle tariffe),</li>
            <li>e nel Deposito biciclette si osserva e si controlla lo stato fisico degli stalli (presenza della bici 
                e lettura del tag nello stallo assegnato).</li>
          </ul>

          <p class="mb-4 leading-relaxed">
            Il prototipo IoT collega questi due livelli: il livello gestionale, che vive nel Box Office e nel gestionale 
            web, e il livello fisico, che vive tra i portabici del deposito.
          </p>
        </section>

        <!-- Sezione 1.2 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">1.2 Problema affrontato</h3>
          
          <p class="mb-4 leading-relaxed">
            Nel gestionale ogni parcheggio è rappresentato come una tripla <em>(bici, stallo, intervallo di tempo)</em>. 
            Al momento della creazione di un parcheggio attivo, il sistema stabilisce che una data bicicletta X deve occupare, 
            ad esempio, lo stallo denominato <code class="bg-gray-200 px-2 py-1 rounded text-primary">P001</code> a partire da un 
            certo istante e fino al rilascio.
          </p>

          <p class="mb-4 leading-relaxed">
            Nulla impedisce però all'utente di collocare la bici in un portabici diverso da quello previsto, o di occupare 
            uno stallo con una bici non registrata. In uno spazio come il deposito biciclette della Velostazione, dove sono 
            presenti decine di portabici nello stesso ambiente, la discrepanza tra stato logico e stato fisico rischia di 
            diventare un problema operativo rilevante, soprattutto nelle ore di punta.
          </p>

          <p class="mb-4 leading-relaxed">
            Il problema centrale affrontato dal progetto è l'allineamento affidabile tra lo stato logico dei parcheggi, 
            gestito dal software al Box Office, e lo stato fisico degli stalli nel deposito. In particolare, è necessario 
            disporre di un meccanismo che verifichi automaticamente che la bicicletta effettivamente presente in uno 
            specifico stallo fisico coincida con la bicicletta e lo stallo che il gestionale considera assegnati in quel momento.
          </p>

          <p class="mb-4 leading-relaxed">
            Per raggiungere questo obiettivo, il prototipo combina tag RFID e nodi LoRa installati sugli stalli, integrati 
            con il backend Django già esistente, che si occupa di ricevere e interpretare gli eventi generati nel deposito.
          </p>
        </section>

        <!-- Sezione 1.3 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">1.3 Obiettivi del progetto</h3>
          
          <p class="mb-4 leading-relaxed">Gli obiettivi specifici del prototipo sono:</p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>progettare un nodo IoT di stallo, basato su scheda Heltec WiFi LoRa 32 v3, in grado di leggere tag RFID 
                e inviare eventi al Box Office;</li>
            <li>allestire una postazione di desk RFID al Box Office (Raspberry Pi + RC522 + buzzer) per l'assegnazione 
                controllata dei tag alle biciclette;</li>
            <li>realizzare un gateway LoRa su Raspberry che trasformi i messaggi radio dei nodi in richieste HTTP verso 
                il backend Django;</li>
            <li>estendere il modello dati del gestionale con entità dedicate all'IoT (<code class="bg-gray-200 px-2 py-1 rounded text-primary">LoRaDevice</code>, 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">IoTEvent</code>, ecc.) e con un campo 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code> sulle biciclette;</li>
            <li>integrare il frontend Angular con il flusso di assegnazione del tag e con la visualizzazione dello stato 
                IoT dei parcheggi.</li>
          </ul>

          <!-- Sottosezione 1.3.1 -->
          <h4 class="text-xl font-bold text-primary mb-4 mt-8">1.3.1 Panoramica del flusso end-to-end</h4>
          
          <p class="mb-4 leading-relaxed">
            Il flusso complessivo tra Box Office e Deposito biciclette si articola nelle seguenti fasi:
          </p>

          <ol class="list-decimal list-inside mb-6 space-y-3 ml-4">
            <li><strong>Creazione del parcheggio al desk</strong>: dal Box Office l'operatore crea un parcheggio attivo 
                indicando bici, stallo (ad esempio <code class="bg-gray-200 px-2 py-1 rounded text-primary">P001</code>) 
                e tipologia di tariffa, e assegnando un tag RFID tramite un lettore collegato al Raspberry Pi. Il backend 
                memorizza l'UID del tag per quel parcheggio.</li>
            <li><strong>Parcheggio nel deposito</strong>: l'utente si sposta nella zona di Deposito biciclette e parcheggia 
                la bici nello stallo fisico corrispondente. Il nodo IoT montato sul portabici legge il tag tramite RC522 e 
                invia via LoRa un evento <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_scan</code>, 
                indicando <code class="bg-gray-200 px-2 py-1 rounded text-primary">node_id</code>, numero di sequenza e 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code>.</li>
            <li><strong>Gateway e backend</strong>: il gateway su Raspberry riceve il pacchetto LoRa, lo traduce in una 
                richiesta HTTP e lo inoltra al backend Django. Il backend risale al dispositivo 
                (<code class="bg-gray-200 px-2 py-1 rounded text-primary">LoRaDevice</code>) a partire dal 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">node_id</code>, verifica quale stallo gli è 
                associato e confronta questa informazione con i parcheggi attivi per la bici identificata dall'UID.</li>
            <li><strong>Esito IoT</strong>: in base al risultato del confronto, il backend registra un 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">IoTEvent</code> (ad esempio 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">ok</code>, 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">mismatch</code>, 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">unknown_rfid</code>) e aggiorna lo stato 
                del parcheggio. Il frontend mostra il risultato all'operatore tramite badge colorati nella lista 
                dei parcheggi.</li>
            <li><strong>Rilascio</strong>: al momento del ritiro, il parcheggio viene chiuso al Box Office; il backend 
                marca lo stallo come libero e azzera il campo <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code> 
                della bici, rendendo il tag nuovamente disponibile.</li>
          </ol>
        </section>

        <!-- Sezione 1.4 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">1.4 Modello logico RFID: tag come "gettone"</h3>
          
          <p class="mb-4 leading-relaxed">
            Alla base dell'integrazione IoT c'è una scelta di modellazione: il tag RFID non viene usato come identità 
            permanente della bicicletta, ma come <em>gettone</em> temporaneo di accesso al deposito. In pratica al Box Office 
            l'operatore associa un tag a una bici solo quando sta per creare (o ha appena creato) un parcheggio attivo, poi 
            durante la vita del parcheggio il campo <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code> 
            della bici è valorizzato e consente al backend di riconoscere gli eventi provenienti dagli stalli. Infine, quando 
            il parcheggio viene chiuso, lo stesso metodo di rilascio si occupa di azzerare il campo 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code>, liberando automaticamente il tag.
            Questa impostazione permette ai tag di poter essere riutilizzati facilmente.
          </p>

          <p class="mb-4 leading-relaxed">
            Nei capitoli successivi vengono spiegati nodi di stallo, servizi su Raspberry Pi, estensioni del backend Django 
            e schermate di frontend per mostrare il flusso tra Box Office e Deposito biciclette.
          </p>
        </section>

        <!-- Note a piè di pagina -->
        <aside class="mt-16 pt-8 border-t border-gray-700">
          <h4 class="text-lg font-bold text-primary mb-4">Note</h4>
          <ol class="text-sm space-y-2 text-gray-500">
            <li>
              <sup>1</sup> Velostazione di Bologna, collegamento Google Maps: 
              <a href="https://maps.google.com/?q=Velostazione+di+Bologna" 
                 target="_blank" 
                 class="text-primary hover:text-green-500 underline">
                https://maps.google.com/?q=Velostazione+di+Bologna
              </a>
            </li>
            <li>
              <sup>2</sup> Raspberry Pi 4 Model B con 2 GB di RAM, single-board computer utilizzato come postazione di desk 
              per la lettura dei tag RFID e l'esecuzione dei servizi locali. Sito ufficiale: 
              <a href="https://www.raspberrypi.com/products/raspberry-pi-4-model-b/" 
                 target="_blank" 
                 class="text-primary hover:text-green-500 underline">
                https://www.raspberrypi.com/products/raspberry-pi-4-model-b/
              </a>
            </li>
            <li>
              <sup>3</sup> Modulo RFID RC522, lettore a 13.56 MHz compatibile con tag MIFARE, utilizzato per l'acquisizione 
              degli UID dei tag. Pagina prodotto: 
              <a href="https://www.az-delivery.de/it/products/rfid-set" 
                 target="_blank" 
                 class="text-primary hover:text-green-500 underline">
                https://www.az-delivery.de/it/products/rfid-set
              </a>
            </li>
            <li>
              <sup>4</sup> Buzzer attivo a 3.3 V utilizzato per fornire un feedback acustico immediato all'operatore durante 
              le operazioni di lettura RFID.
            </li>
            <li>
              <sup>5</sup> Framework web Python utilizzato per l'implementazione del backend applicativo, responsabile della 
              logica di dominio, della persistenza dei dati e dell'integrazione con i dispositivi IoT.
            </li>
            <li>
              <sup>6</sup> Scheda di sviluppo Diymore LoRa V3 per ESP32, basata su microcontrollore ESP32 con core LX7 dual-core, 
              radio LoRa SX1262 (banda 863–928 MHz), modulo WiFi e Bluetooth integrati e display OLED da 0.96 pollici. Nel prototipo 
              è utilizzata la versione con pin già saldati e connettore USB Type-C, impiegata come nodo IoT di stallo per la lettura 
              RFID e la trasmissione degli eventi via LoRa. Pagina prodotto: 
              <a href="https://heltec.org/project/wifi-lora-32-v3/" 
                 target="_blank" 
                 class="text-primary hover:text-green-500 underline">
                https://heltec.org/project/wifi-lora-32-v3/
              </a>
            </li>
          </ol>
        </aside>

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
export class IntroductionComponent {}