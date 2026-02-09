// hardware-design.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hardware-design',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Titolo capitolo -->
        <h1 class="text-4xl font-bold text-primary mb-8">Capitolo 4</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Progettazione hardware</h2>

        <!-- Sezione 4.1 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">4.1 Nodo di stallo: Heltec + RC522 + buzzer</h3>
          
          <p class="mb-4 leading-relaxed">
            Ogni nodo di stallo è realizzato con una scheda Heltec WiFi LoRa 32 v3, un lettore RFID RC522 e un buzzer attivo. 
            La Figura 4.1 mostra la scheda Heltec utilizzata nel prototipo.
          </p>

          <!-- Figura Heltec -->
          <figure class="my-8">
            <img 
              src="assets/chapter4/Heltec.png" 
              alt="Scheda Heltec WiFi LoRa 32 v3"
              class="w-3/5 mx-auto border border-gray-700 rounded"
            />
            <figcaption class="text-sm text-gray-500 mt-3 text-center">
              <strong>Figura 4.1:</strong> Scheda Heltec WiFi LoRa 32 v3 utilizzata come nodo di stallo.
            </figcaption>
          </figure>

          <p class="mb-4 leading-relaxed">
            Il lettore RC522 è collegato direttamente alla scheda Heltec tramite cavetti jumper. Questa configurazione, 
            adottata nel prototipo, consente una rapida installazione e facilita le operazioni di test e riconfigurazione 
            del nodo. Nella Figura 4.2 è mostrato il modulo RC522 utilizzato.
          </p>

          <!-- Figura RC522 -->
          <figure class="my-8">
            <img 
              src="assets/chapter4/Rfid.png" 
              alt="Modulo RC522"
              class="w-3/5 mx-auto border border-gray-700 rounded"
            />
            <figcaption class="text-sm text-gray-500 mt-3 text-center">
              <strong>Figura 4.2:</strong> Modulo RC522 utilizzato per la lettura dei tag RFID sul nodo di stallo.
            </figcaption>
          </figure>

          <p class="mb-4 leading-relaxed">
            Il buzzer è posizionato in modo da essere udibile dall'utente nel momento in cui la bicicletta viene correttamente 
            inserita nello stallo, così da fornire un feedback acustico immediato sull'esito della lettura RFID e sull'invio 
            dell'evento. La Figura 4.3 mostra il componente utilizzato.
          </p>

          <!-- Figura Buzzer -->
          <figure class="my-8">
            <img 
              src="assets/chapter4/Buzzer.png" 
              alt="Buzzer attivo 3.3V"
              class="w-3/5 mx-auto border border-gray-700 rounded"
            />
            <figcaption class="text-sm text-gray-500 mt-3 text-center">
              <strong>Figura 4.3:</strong> Buzzer attivo 3.3V collegato al nodo Heltec.
            </figcaption>
          </figure>

          <p class="mb-4 leading-relaxed">
            Nel prototipo il nodo di stallo è alimentato tramite un power bank USB collegato alla porta Type-C della scheda Heltec. 
            La mappatura dei pin per la radio LoRa (SX1262) segue le specifiche della scheda e della libreria RadioLib:
          </p>

          <!-- Tabella pin LoRa -->
          <div class="overflow-x-auto my-6">
            <table class="border-collapse border border-gray-400 w-full text-center">
              <caption class="text-sm text-gray-400 mb-2 text-left">
                <strong>Tabella 4.1:</strong> Mappatura pin LoRa SX1262 sulla Heltec WiFi LoRa 32 v3
              </caption>
              <thead>
                <tr class="bg-gray-200">
                  <th class="border border-gray-400 px-4 py-2 text-primary">Segnale</th>
                  <th class="border border-gray-400 px-4 py-2 text-primary">GPIO Heltec</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">NSS / CS</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 8</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">DIO1 / IRQ</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 14</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">RESET</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 12</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">BUSY</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 13</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">SCK</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 9</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">MISO</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 11</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">MOSI</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 10</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="mb-4 leading-relaxed">
            La Tabella 4.2 mostra come sono collegati lettore RC522 e la scheda Heltec.
          </p>

          <!-- Tabella RC522 -->
          <div class="overflow-x-auto my-6">
            <table class="border-collapse border border-gray-400 w-full text-center">
              <caption class="text-sm text-gray-400 mb-2 text-left">
                <strong>Tabella 4.2:</strong> Mappatura RC522 sul nodo Heltec (GPIO ESP32-S3)
              </caption>
              <thead>
                <tr class="bg-gray-200">
                  <th class="border border-gray-400 px-4 py-2 text-primary">Segnale RC522</th>
                  <th class="border border-gray-400 px-4 py-2 text-primary">Segnale logico</th>
                  <th class="border border-gray-400 px-4 py-2 text-primary">GPIO Heltec</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">3.3V</td>
                  <td class="border border-gray-400 px-4 py-2">Alimentazione</td>
                  <td class="border border-gray-400 px-4 py-2">3V3</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">GND</td>
                  <td class="border border-gray-400 px-4 py-2">Ground</td>
                  <td class="border border-gray-400 px-4 py-2">GND</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">SCK</td>
                  <td class="border border-gray-400 px-4 py-2">SPI SCK</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 36</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">MOSI</td>
                  <td class="border border-gray-400 px-4 py-2">SPI MOSI</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 35</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">MISO</td>
                  <td class="border border-gray-400 px-4 py-2">SPI MISO</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 34</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">SDA / SS</td>
                  <td class="border border-gray-400 px-4 py-2">Chip Select</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 33</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">RST</td>
                  <td class="border border-gray-400 px-4 py-2">Reset</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 21</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="mb-4 leading-relaxed">
            Invece la Tabella 4.3 mostra come il buzzer è collegato ai pin della scheda Heltec:
          </p>

          <!-- Tabella Buzzer -->
          <div class="overflow-x-auto my-6">
            <table class="border-collapse border border-gray-400 w-full text-center">
              <caption class="text-sm text-gray-400 mb-2 text-left">
                <strong>Tabella 4.3:</strong> Mappatura buzzer sul nodo Heltec
              </caption>
              <thead>
                <tr class="bg-gray-200">
                  <th class="border border-gray-400 px-4 py-2 text-primary">Segnale buzzer</th>
                  <th class="border border-gray-400 px-4 py-2 text-primary">Descrizione</th>
                  <th class="border border-gray-400 px-4 py-2 text-primary">Collegamento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">S (signal)</td>
                  <td class="border border-gray-400 px-4 py-2">Ingresso logico</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO 45</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">+ (VCC)</td>
                  <td class="border border-gray-400 px-4 py-2">Alimentazione</td>
                  <td class="border border-gray-400 px-4 py-2">3V3</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">− (GND)</td>
                  <td class="border border-gray-400 px-4 py-2">Ground</td>
                  <td class="border border-gray-400 px-4 py-2">GND</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="mb-4 leading-relaxed">
            La Figura 4.4 mostra il nodo di stallo assemblato in configurazione da banco, con tutti i componenti collegati 
            (scheda Heltec, lettore RC522 e buzzer), mentre la Figura 4.5 ne illustra la disposizione reale nello spazio 
            del deposito, installato in prossimità di un portabici e alimentato tramite power bank durante la fase di 
            prototipazione.
          </p>

          <!-- Figura nodo assemblato componenti -->
          <figure class="my-8">
            <img 
              src="assets/chapter4/HeltecRfidBuzzer.png" 
              alt="Componenti del nodo di stallo"
              class="w-4/5 mx-auto border border-gray-700 rounded"
            />
            <figcaption class="text-sm text-gray-500 mt-3 text-center">
              <strong>Figura 4.4:</strong> Componenti del nodo di stallo assemblati (scheda Heltec, lettore RC522 e buzzer) 
              in configurazione da banco.
            </figcaption>
          </figure>

          <!-- Figura nodo stallo installato -->
          <figure class="my-8">
            <img 
              src="assets/chapter4/NodoStallo.png" 
              alt="Nodo di stallo installato sul portabici"
              class="w-4/5 mx-auto border border-gray-700 rounded"
            />
            <figcaption class="text-sm text-gray-500 mt-3 text-center">
              <strong>Figura 4.5:</strong> Nodo di stallo assemblato e installato sul portabici (Heltec + RC522 + buzzer), 
              alimentato tramite power bank.
            </figcaption>
          </figure>
        </section>

        <!-- Sezione 4.2 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">4.2 Postazione di desk su Raspberry Pi</h3>
          
          <p class="mb-4 leading-relaxed">
            Al Box Office è presente un'unica postazione fisica basata su Raspberry Pi, che svolge due funzioni distinte 
            all'interno del sistema: da un lato l'assegnazione dei tag RFID alle biciclette, dall'altro la ricezione degli 
            eventi LoRa provenienti dai nodi di stallo nel deposito.
          </p>

          <p class="mb-4 leading-relaxed">
            La Figura 4.6 mostra la postazione completa, comprensiva del Raspberry Pi, del lettore RFID RC522, del buzzer 
            e del gateway LoRa collegato via USB. Nella figura è possibile distinguere visivamente (dai colori) le due parti 
            funzionali della postazione, che verranno descritte separatamente nelle sezioni seguenti.
          </p>

          <!-- Figura desk setup -->
          <figure class="my-8">
            <img 
              src="assets/chapter4/DeskSetup.png" 
              alt="Postazione di desk al Box Office"
              class="w-4/5 mx-auto border border-gray-700 rounded"
            />
            <figcaption class="text-sm text-gray-500 mt-3 text-center">
              <strong>Figura 4.6:</strong> Postazione di desk al Box Office basata su Raspberry Pi, utilizzata sia per 
              l'assegnazione dei tag RFID sia come gateway LoRa per la ricezione degli eventi dagli stalli.
            </figcaption>
          </figure>

          <!-- Sottosezione 4.2.1 -->
          <h4 class="text-xl font-bold text-primary mb-4 mt-8">4.2.1 Desk RFID per l'assegnazione dei tag</h4>
          
          <p class="mb-4 leading-relaxed">
            La prima funzione della postazione di desk è l'assegnazione controllata dei tag RFID alle biciclette. A questo 
            scopo il Raspberry Pi è collegato a un lettore RC522 e a un buzzer, che fornisce un feedback acustico all'operatore 
            durante le operazioni di lettura del tag.
          </p>

          <p class="mb-4 leading-relaxed">
            La mappatura dei pin del lettore RC522, utilizzata nel prototipo in modalità 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">BOARD</code>, è riportata nella Tabella 4.4.
          </p>

          <!-- Tabella RC522 su Raspberry -->
          <div class="overflow-x-auto my-6">
            <table class="border-collapse border border-gray-400 w-full text-center">
              <caption class="text-sm text-gray-400 mb-2 text-left">
                <strong>Tabella 4.4:</strong> Mappatura RC522 su Raspberry Pi
              </caption>
              <thead>
                <tr class="bg-gray-200">
                  <th class="border border-gray-400 px-4 py-2 text-primary">Segnale RC522</th>
                  <th class="border border-gray-400 px-4 py-2 text-primary">Raspberry (pin fisico)</th>
                  <th class="border border-gray-400 px-4 py-2 text-primary">Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">3.3V</td>
                  <td class="border border-gray-400 px-4 py-2">Pin 1</td>
                  <td class="border border-gray-400 px-4 py-2">Alimentazione 3.3V</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">GND</td>
                  <td class="border border-gray-400 px-4 py-2">Pin 6</td>
                  <td class="border border-gray-400 px-4 py-2">Ground</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">SCK</td>
                  <td class="border border-gray-400 px-4 py-2">Pin 23</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO11, SPI0 SCLK</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">MOSI</td>
                  <td class="border border-gray-400 px-4 py-2">Pin 19</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO10, SPI0 MOSI</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">MISO</td>
                  <td class="border border-gray-400 px-4 py-2">Pin 21</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO9, SPI0 MISO</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">SDA / SS</td>
                  <td class="border border-gray-400 px-4 py-2">Pin 24</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO8, SPI0 CE0</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">RST</td>
                  <td class="border border-gray-400 px-4 py-2">Pin 22</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO25</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="mb-4 leading-relaxed">
            Il buzzer è collegato al Raspberry Pi e viene utilizzato per segnalare l'inizio della lettura, 
            l'avvenuta acquisizione del tag o eventuali errori:
          </p>

          <!-- Tabella Buzzer su Raspberry -->
          <div class="overflow-x-auto my-6">
            <table class="border-collapse border border-gray-400 w-full text-center">
              <caption class="text-sm text-gray-400 mb-2 text-left">
                <strong>Tabella 4.5:</strong> Mappatura buzzer su Raspberry Pi
              </caption>
              <thead>
                <tr class="bg-gray-200">
                  <th class="border border-gray-400 px-4 py-2 text-primary">Segnale buzzer</th>
                  <th class="border border-gray-400 px-4 py-2 text-primary">Raspberry (pin fisico)</th>
                  <th class="border border-gray-400 px-4 py-2 text-primary">Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">S (signal)</td>
                  <td class="border border-gray-400 px-4 py-2">Pin 12</td>
                  <td class="border border-gray-400 px-4 py-2">GPIO18 in BCM</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">+ (VCC)</td>
                  <td class="border border-gray-400 px-4 py-2">3.3V</td>
                  <td class="border border-gray-400 px-4 py-2">Alimentazione</td>
                </tr>
                <tr>
                  <td class="border border-gray-400 px-4 py-2">− (GND)</td>
                  <td class="border border-gray-400 px-4 py-2">GND</td>
                  <td class="border border-gray-400 px-4 py-2">Ground</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Sottosezione 4.2.2 -->
          <h4 class="text-xl font-bold text-primary mb-4 mt-8">4.2.2 Gateway LoRa per la ricezione degli eventi</h4>
          
          <p class="mb-4 leading-relaxed">
            La seconda funzione della postazione di desk è quella di gateway LoRa. A questo scopo una scheda Heltec, 
            configurata in modalità di ricezione, è collegata al Raspberry Pi tramite USB.
          </p>

          <p class="mb-4 leading-relaxed">
            Dal punto di vista hardware il cablaggio è minimale: la scheda Heltec è alimentata direttamente dalla porta USB 
            del Raspberry Pi ed espone una porta seriale virtuale, utilizzata dal software per ricevere i messaggi LoRa 
            provenienti dai nodi di stallo installati nel deposito.
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

    table {
      font-size: 0.9em;
    }
  `]
})
export class HardwareDesignComponent {}