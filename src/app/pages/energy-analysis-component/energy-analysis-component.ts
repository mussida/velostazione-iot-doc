// energy-analysis.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-energy-analysis',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">

        <!-- Titolo capitolo -->
        <h1 class="text-4xl font-bold text-primary mb-8">Capitolo 9</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Discussione finale, analisi dei consumi e sviluppi futuri</h2>

        <p class="mb-8 leading-relaxed">
          Il progetto ha avuto come obiettivo la realizzazione di un prototipo IoT capace di integrare il livello 
          gestionale della Velostazione con lo stato fisico degli stalli di parcheggio. In questa sezione vengono 
          discusse le principali limitazioni del prototipo, un'analisi dei consumi energetici e le possibili evoluzioni 
          verso una soluzione pronta per l'uso in produzione.
        </p>

        <!-- Sezione 9.1 Analisi dei consumi energetici -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">9.1 Analisi dei consumi energetici</h3>
          
          <p class="mb-4 leading-relaxed">
            Nel prototipo i nodi di stallo sono alimentati tramite power bank USB commerciali, scelta funzionale a una 
            rapida sperimentazione e alla riduzione della complessità di cablaggio. In un contesto reale, tuttavia, 
            l'autonomia energetica rappresenta un fattore determinante.
          </p>

          <p class="mb-4 leading-relaxed">
            Il nodo di stallo è basato sulla scheda Heltec WiFi LoRa 32 V3.2, che integra un microcontrollore ESP32-S3 
            e un ricetrasmettitore LoRa SX1262. Dai datasheet del produttore emerge come il consumo vari a seconda dello 
            stato: durante la trasmissione LoRa a 868 MHz la corrente può raggiungere valori dell'ordine dei 200–230 mA
            <sup class="text-primary">1</sup>, mentre in ricezione si attesta intorno ai 90 mA. In modalità di sleep 
            profondo, quando alimentata a batteria, la stessa scheda può scendere molto arrivando ai microampere 
            (circa 15 μA)<sup class="text-primary">2</sup>.
          </p>

          <p class="mb-4 leading-relaxed">
            Al nodo è collegato un lettore RFID RC522, mantenuto costantemente alimentato nel prototipo per semplificare 
            la logica. Secondo il datasheet del modulo, l'assorbimento tipico è compreso tra circa 13 e 26 mA 
            in funzionamento, con una corrente di standby dell'ordine di 10–13 mA.
          </p>

          <p class="mb-4 leading-relaxed">
            Nel prototipo il microcontrollore rimane costantemente attivo per garantire reattività (circa 30–60 mA), mentre 
            il lettore RFID è mantenuto alimentato in modo continuo. Al contrario, le trasmissioni LoRa avvengono raramente 
            e per intervalli di tempo molto brevi, risultando trascurabili nel calcolo del consumo medio. 
            La Tabella 9.1 riassume il ragionamento seguito e i contributi considerati per giungere alla stima del consumo 
            medio di circa 55 mA.
          </p>

          <!-- Tabella consumi -->
          <div class="overflow-x-auto my-8">
            <table class="border-collapse border border-gray-400 w-full">
              <caption class="text-sm text-gray-400 mb-2 text-left">
                <strong>Tabella 9.1:</strong> Stima dei principali contributi al consumo medio del nodo di stallo
              </caption>
              <thead>
                <tr class="bg-gray-200">
                  <th class="border border-gray-400 px-4 py-2 text-left text-primary">Componente</th>
                  <th class="border border-gray-400 px-4 py-2 text-center text-primary">Stato operativo</th>
                  <th class="border border-gray-400 px-4 py-2 text-center text-primary">Corrente stimata</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">ESP32 (Heltec WiFi LoRa 32)</td>
                  <td class="border border-gray-400 px-4 py-2 text-center">attivo</td>
                  <td class="border border-gray-400 px-4 py-2 text-center">∼40–50 mA</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">Modulo RFID RC522</td>
                  <td class="border border-gray-400 px-4 py-2 text-center">standby continuo</td>
                  <td class="border border-gray-400 px-4 py-2 text-center">∼10–13 mA</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">Trasmissione LoRa</td>
                  <td class="border border-gray-400 px-4 py-2 text-center">eventi rari</td>
                  <td class="border border-gray-400 px-4 py-2 text-center">trascurabile in media</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">Buzzer e LED</td>
                  <td class="border border-gray-400 px-4 py-2 text-center"></td>
                  <td class="border border-gray-400 px-4 py-2 text-center">trascurabile</td>
                </tr>
                <tr class="bg-gray-200">
                  <td class="border border-gray-400 px-4 py-2 font-bold">Totale stimato</td>
                  <td class="border border-gray-400 px-4 py-2"></td>
                  <td class="border border-gray-400 px-4 py-2 text-center font-bold">∼55 mA</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="mb-4 leading-relaxed">
            Nel prototipo l'alimentazione è fornita da un power bank commerciale da 10,000 mAh. Applicando la relazione 
            standard tra capacità e corrente media assorbita, si ottiene un'autonomia teorica di circa:
          </p>

          <!-- Formula matematica -->
          <div class="bg-gray-200 rounded-md p-6 my-6 text-center">
            <div class="text-white text-lg">
              <span class="inline-block">
                <span class="text-gray-400">10,000 mAh</span>
                <span class="mx-2">/</span>
                <span class="text-gray-400">55 mA</span>
                <span class="mx-2">≈</span>
                <span class="text-primary">182 h</span>
                <span class="mx-2">≈</span>
                <span class="text-primary">7.5 giorni</span>
              </span>
            </div>
          </div>

          <p class="mb-4 leading-relaxed">
            La durata è adeguata per un prototipo sperimentale, ma non sufficiente per un'installazione permanente.
          </p>
        </section>

        <!-- Sezione 9.2 Sviluppi futuri -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">9.2 Sviluppi futuri e passaggio alla produzione</h3>
          
          <p class="mb-4 leading-relaxed">
            Per facilitare l'evoluzione del prototipo verso una soluzione pronta per la produzione, il primo intervento 
            riguarderebbe la gestione energetica: l'uso sistematico delle modalità di sleep profondo del microcontrollore 
            e l'alimentazione del lettore RFID solo quando necessario permetterebbero di ridurre il consumo medio. A parità 
            di capacità di batteria, ciò consentirebbe di estendere l'autonomia.
          </p>

          <p class="mb-4 leading-relaxed">
            Ulteriori miglioramenti includono l'integrazione dei nodi in involucri protettivi adeguati all'ambiente di 
            installazione, l'adozione di soluzioni di alimentazione dedicate e la persistenza su memoria non volatile del 
            numero di sequenza degli eventi, al fine di garantire continuità operativa anche in caso di riavvio del dispositivo.
          </p>
        </section>

        <!-- Note a piè di pagina -->
        <aside class="mt-16 pt-8 border-t border-gray-700">
          <h4 class="text-lg font-bold text-primary mb-4">Note</h4>
          <ol class="text-sm space-y-2 text-gray-500">
            <li>
              <sup>1</sup> mA: milliampere, unità di misura della corrente elettrica. 1 mA = 0.001 A (un millesimo di ampere).
            </li>
            <li>
              <sup>2</sup> μA: microampere, unità di misura della corrente elettrica. 1 μA = 0.000001 A (un milionesimo di ampere). 
              1 mA = 1000 μA.
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

    table {
      font-size: 0.9em;
    }
  `]
})
export class EnergyAnalysisComponent {}