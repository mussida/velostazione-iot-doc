// django-backend.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-django-backend',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Titolo capitolo -->
        <h1 class="text-4xl font-bold text-primary mb-8">Capitolo 7</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Backend Django e integrazione IoT</h2>

        <!-- Sezione 7.1 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">7.1 Modello dati</h3>
          
          <p class="mb-4 leading-relaxed">
            Il backend Django include i modelli esistenti per biciclette, stalli e parcheggi, estesi con:
          </p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>un campo opzionale <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code> su 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">Bicicletta</code>, usato come gettone temporaneo;</li>
            <li>il modello <code class="bg-gray-200 px-2 py-1 rounded text-primary">LoRaDevice</code> per mappare 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">node_id</code> → stallo logico e chiave API;</li>
            <li>il modello <code class="bg-gray-200 px-2 py-1 rounded text-primary">IoTEvent</code> per tracciare gli 
                eventi provenienti dai nodi, con vincolo di unicità su 
                (<code class="bg-gray-200 px-2 py-1 rounded text-primary">device</code>, 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">seq</code>).</li>
          </ul>
        </section>

        <!-- Sezione 7.2 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">7.2 Logica degli eventi IoT</h3>
          
          <p class="mb-4 leading-relaxed">
            L'endpoint <code class="bg-gray-200 px-2 py-1 rounded text-primary">/api/core/iot/events</code>:
          </p>

          <ol class="list-decimal list-inside mb-6 space-y-3 ml-4">
            <li>autentica il dispositivo tramite <code class="bg-gray-200 px-2 py-1 rounded text-primary">node_id</code> e 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">X-Device-Key</code>;</li>
            <li>verifica la presenza di un evento già esistente con la stessa coppia 
                (<code class="bg-gray-200 px-2 py-1 rounded text-primary">device</code>, 
                <code class="bg-gray-200 px-2 py-1 rounded text-primary">seq</code>);</li>
            <li>normalizza il tipo di evento;</li>
            <li>
              per gli eventi <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_scan</code>:
              <ul class="list-disc list-inside mt-2 ml-6 space-y-1">
                <li>cerca la bicicletta per <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code>;</li>
                <li>se non la trova, classifica l'evento come <code class="bg-gray-200 px-2 py-1 rounded text-primary">unknown_rfid</code>;</li>
                <li>se la trova ma senza parcheggio attivo, classifica l'evento come 
                    <code class="bg-gray-200 px-2 py-1 rounded text-primary">no_active_parking</code>;</li>
                <li>se esiste un parcheggio attivo ma lo stallo associato è diverso da quello del dispositivo, l'esito è 
                    <code class="bg-gray-200 px-2 py-1 rounded text-primary">mismatch</code>;</li>
                <li>se lo stallo coincide, l'esito è <code class="bg-gray-200 px-2 py-1 rounded text-primary">ok</code>.</li>
              </ul>
            </li>
          </ol>

          <p class="mb-4 leading-relaxed">
            Ogni evento è memorizzato in <code class="bg-gray-200 px-2 py-1 rounded text-primary">IoTEvent</code> insieme 
            a un messaggio di esito, eventualmente agganciato al parcheggio e allo stallo coinvolti.
          </p>
        </section>

        <!-- Sezione 7.3 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">7.3 Rilascio del parcheggio e liberazione del tag</h3>
          
          <p class="mb-4 leading-relaxed">
            Il modello <code class="bg-gray-200 px-2 py-1 rounded text-primary">Parcheggio</code> espone un metodo 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">rilascia_bici()</code> che:
          </p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>chiude il parcheggio (impostando stato e data di fine);</li>
            <li>libera lo stallo;</li>
            <li>se la bici ha un <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code>, lo azzera, 
                liberando il tag.</li>
          </ul>

          <p class="mb-4 leading-relaxed">
            In questo modo il ciclo di vita del tag è legato a quello del parcheggio, senza richiedere ulteriori azioni 
            manuali da parte dell'operatore.
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
export class DjangoBackendComponent {}