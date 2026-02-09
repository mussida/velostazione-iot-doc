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
            Il backend Django riutilizza i modelli già presenti per la gestione di biciclette, stalli e parcheggi, 
            estendendoli per supportare l'integrazione con i dispositivi IoT. In particolare, il modello 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">Bicicletta</code> include un campo opzionale 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code>, utilizzato come identificativo 
            temporaneo del tag RFID assegnato alla bici durante il periodo di parcheggio.
          </p>

          <p class="mb-4 leading-relaxed">
            Per rappresentare i dispositivi fisici, è stato introdotto il modello 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">LoRaDevice</code>, che consente di mappare ciascun 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">node_id</code> a uno stallo logico del sistema e a 
            una chiave API dedicata. Questa associazione permette al backend di riconoscere e autenticare in modo univoco 
            i nodi che inviano eventi.
          </p>

          <p class="mb-4 leading-relaxed">
            Gli eventi provenienti dal livello IoT vengono infine registrati nel modello 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">IoTEvent</code>, che memorizza il tipo di evento, 
            il dispositivo, il numero di sequenza e l'esito dell'elaborazione. Su questo modello è imposto un vincolo di 
            unicità sulla coppia (<code class="bg-gray-200 px-2 py-1 rounded text-primary">device</code>, 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">seq</code>), che consente di identificare ed 
            eliminare eventuali duplicazioni dovute a ritrasmissioni.
          </p>
        </section>

        <!-- Sezione 7.2 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">7.2 Logica degli eventi IoT</h3>
          
          <p class="mb-4 leading-relaxed">
            La ricezione e l'elaborazione degli eventi IoT avvengono tramite l'endpoint 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">/api/core/iot/events</code>, che rappresenta il 
            punto di ingresso unico per i messaggi provenienti dai nodi di stallo. All'arrivo di una richiesta, il backend 
            autentica innanzitutto il dispositivo verificando la coerenza tra il 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">node_id</code> dichiarato nel payload e il valore 
            dell'header <code class="bg-gray-200 px-2 py-1 rounded text-primary">X-Device-Key</code>. Solo i dispositivi 
            registrati e autorizzati possono generare eventi accettati dal sistema.
          </p>

          <p class="mb-4 leading-relaxed">
            Superata la fase di autenticazione, l'endpoint verifica se esiste già un evento associato allo stesso 
            dispositivo e allo stesso numero di sequenza. In presenza di un duplicato, l'evento viene ignorato, 
            garantendo che ogni evento venga elaborato una sola volta.
          </p>

          <p class="mb-4 leading-relaxed">
            Per gli eventi di tipo <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_scan</code>, il backend 
            applica una logica di validazione che mette in relazione lo stato fisico osservato con lo stato logico del 
            gestionale. A partire dall'UID RFID ricevuto, il sistema ricerca la bicicletta associata; se il tag non risulta 
            registrato, l'evento viene classificato come 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">unknown_rfid</code>. Se la bicicletta esiste ma non 
            ha un parcheggio attivo, l'esito è 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">no_active_parking</code>. Nel caso in cui esista un 
            parcheggio attivo ma lo stallo associato non coincida con quello del dispositivo che ha generato l'evento, 
            l'evento viene marcato come <code class="bg-gray-200 px-2 py-1 rounded text-primary">mismatch</code>. Solo 
            quando lo stallo fisico e quello logico coincidono l'evento viene considerato valido, con esito 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">ok</code>.
          </p>

          <p class="mb-4 leading-relaxed">
            Indipendentemente dall'esito, ogni evento viene persistito nella tabella 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">IoTEvent</code> insieme a un messaggio descrittivo 
            e, quando applicabile, ai riferimenti allo stallo e al parcheggio coinvolti. Questo consente sia il 
            tracciamento storico degli eventi sia l'analisi di eventuali anomalie operative.
          </p>
        </section>

        <!-- Sezione 7.3 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">7.3 Rilascio del parcheggio e liberazione del tag</h3>
          
          <p class="mb-4 leading-relaxed">
            Il ciclo di vita del tag RFID è strettamente legato a quello del parcheggio. Il modello 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">Parcheggio</code> espone il metodo 
            <code class="bg-gray-200 px-2 py-1 rounded text-primary">rilascia_bici()</code>, che viene invocato al 
            momento dell'uscita della bicicletta dallo stallo. Tale metodo si occupa di chiudere il parcheggio 
            aggiornandone lo stato e la data di fine, rendere nuovamente disponibile lo stallo e, se presente, azzerare 
            il campo <code class="bg-gray-200 px-2 py-1 rounded text-primary">rfid_uid</code> associato alla bicicletta.
          </p>

          <p class="mb-4 leading-relaxed">
            In questo modo il tag RFID viene automaticamente liberato e reso riutilizzabile senza richiedere operazioni 
            aggiuntive da parte dell'operatore.
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