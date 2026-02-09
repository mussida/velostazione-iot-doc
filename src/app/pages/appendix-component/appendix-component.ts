// appendix.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appendix',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-gray-500 p-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Titolo appendice -->
        <h1 class="text-4xl font-bold text-primary mb-8">Appendice A</h1>
        <h2 class="text-3xl font-bold text-primary mb-12">Appendice tecnica</h2>

        <!-- Sezione A.1 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">A.1 Codice dei nodi IoT</h3>
          
          <!-- Sottosezione A.1.1 -->
          <h4 class="text-xl font-bold text-primary mb-4 mt-8">A.1.1 Invio di un evento rfid_scan</h4>
          
          <pre class="bg-white border border-gray-400 text-gray-400 rounded-md overflow-x-auto my-4 p-4">
<code class="text-sm"><span class="text-blue-400">void</span> <span class="text-green-400">sendRfidScanEvent</span>(<span class="text-blue-400">const</span> String &uidHex) {{ '{' }}
  String msg = <span class="text-green-600">"node="</span> + String(ID_STALLO) +
               <span class="text-green-600">";seq="</span> + String(seq) +
               <span class="text-green-600">";ev=rfid_scan;uid="</span> + uidHex;

  <span class="text-blue-400">bool</span> ok = sendLoRaMessage(msg);
  <span class="text-purple-400">if</span> (ok) {{ '{' }}
    beepShort();
  {{ '}' }} <span class="text-purple-400">else</span> {{ '{' }}
    beepLong();
  {{ '}' }}
{{ '}' }}</code></pre>

          <!-- Sottosezione A.1.2 -->
          <h4 class="text-xl font-bold text-primary mb-4 mt-8">A.1.2 Logica di anti-spam per la lettura RFID</h4>
          
          <pre class="bg-white border border-gray-400 text-gray-400 rounded-md overflow-x-auto my-4 p-4">
<code class="text-sm"><span class="text-blue-400">bool</span> <span class="text-green-400">checkRfidAndSendIfNeeded</span>() {{ '{' }}
  <span class="text-purple-400">if</span> (!rfid.PICC_IsNewCardPresent()) {{ '{' }}
    <span class="text-purple-400">if</span> (lastTagPresent) {{ '{' }}
      lastTagPresent = <span class="text-orange-400">false</span>;
      lastUidHex = <span class="text-green-600">""</span>;
    {{ '}' }}
    <span class="text-purple-400">return</span> <span class="text-orange-400">false</span>;
  {{ '}' }}

  <span class="text-purple-400">if</span> (!rfid.PICC_ReadCardSerial()) {{ '{' }}
    <span class="text-purple-400">return</span> <span class="text-orange-400">false</span>;
  {{ '}' }}

  String uidHex = <span class="text-green-600">""</span>;
  <span class="text-purple-400">for</span> (<span class="text-blue-400">byte</span> i = <span class="text-orange-400">0</span>; i &lt; rfid.uid.size; i++) {{ '{' }}
    <span class="text-purple-400">if</span> (rfid.uid.uidByte[i] &lt; <span class="text-orange-400">0x10</span>) {{ '{' }}
      uidHex += <span class="text-green-600">'0'</span>;
    {{ '}' }}
    uidHex += String(rfid.uid.uidByte[i], HEX);
  {{ '}' }}
  uidHex.toUpperCase();

  <span class="text-blue-400">unsigned long</span> now = millis();
  <span class="text-blue-400">bool</span> isNewUid = (uidHex != lastUidHex);
  <span class="text-blue-400">bool</span> shouldSend = <span class="text-orange-400">false</span>;

  <span class="text-purple-400">if</span> (isNewUid) {{ '{' }}
    shouldSend = <span class="text-orange-400">true</span>;
  {{ '}' }} <span class="text-purple-400">else if</span> (!lastTagPresent) {{ '{' }}
    shouldSend = <span class="text-orange-400">true</span>;
  {{ '}' }}

  lastTagPresent = <span class="text-orange-400">true</span>;
  lastUidHex = uidHex;
  lastTagMillis = now;

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  <span class="text-purple-400">if</span> (shouldSend) {{ '{' }}
    sendRfidScanEvent(uidHex);
  {{ '}' }}

  <span class="text-purple-400">return</span> shouldSend;
{{ '}' }}</code></pre>

          <!-- Sottosezione A.1.3 -->
          <h4 class="text-xl font-bold text-primary mb-4 mt-8">A.1.3 Codice del gateway Heltec RX</h4>
          
          <pre class="bg-white border border-gray-400 text-gray-400 rounded-md overflow-x-auto my-4 p-4">
<code class="text-sm"><span class="text-blue-400">void</span> <span class="text-green-400">loop</span>() {{ '{' }}
  String msg;
  <span class="text-blue-400">int</span> state = radio.receive(msg);

  <span class="text-purple-400">if</span> (state == RADIOLIB_ERR_NONE) {{ '{' }}
    <span class="text-blue-400">float</span> rssi = radio.getRSSI();
    Serial.print(msg);
    Serial.print(<span class="text-green-600">" RSSI="</span>);
    Serial.println(rssi);
  {{ '}' }}
{{ '}' }}</code></pre>
        </section>

        <!-- Sezione A.2 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">A.2 Servizi sul Raspberry Pi</h3>
          
          <!-- Sottosezione A.2.1 -->
          <h4 class="text-xl font-bold text-primary mb-4 mt-8">A.2.1 Gateway LoRa → HTTP</h4>
          
          <pre class="bg-white border border-gray-400 text-gray-400 rounded-md overflow-x-auto my-4 p-4">
<code class="text-sm"><span class="text-purple-400">def</span> <span class="text-green-400">parse_line</span>(line: <span class="text-blue-400">str</span>):
    line = line.strip()
    <span class="text-purple-400">if</span> <span class="text-purple-400">not</span> line:
        <span class="text-purple-400">return</span> <span class="text-orange-400">None</span>

    <span class="text-purple-400">if</span> <span class="text-green-600">" "</span> <span class="text-purple-400">in</span> line:
        first_token = line.split(<span class="text-green-600">" "</span>, <span class="text-orange-400">1</span>)[<span class="text-orange-400">0</span>]
    <span class="text-purple-400">else</span>:
        first_token = line

    <span class="text-purple-400">if</span> <span class="text-purple-400">not</span> first_token.startswith(<span class="text-green-600">"node="</span>):
        <span class="text-purple-400">return</span> <span class="text-orange-400">None</span>

    parts = first_token.split(<span class="text-green-600">";"</span>)
    data = {{ '{' }}{{ '}' }}
    <span class="text-purple-400">for</span> p <span class="text-purple-400">in</span> parts:
        <span class="text-purple-400">if</span> <span class="text-green-600">"="</span> <span class="text-purple-400">not in</span> p:
            <span class="text-purple-400">continue</span>
        key, value = p.split(<span class="text-green-600">"="</span>, <span class="text-orange-400">1</span>)
        data[key.strip().lower()] = value.strip()

    <span class="text-purple-400">if</span> <span class="text-green-600">"node"</span> <span class="text-purple-400">not in</span> data <span class="text-purple-400">or</span> <span class="text-green-600">"seq"</span> <span class="text-purple-400">not in</span> data <span class="text-purple-400">or</span> <span class="text-green-600">"ev"</span> <span class="text-purple-400">not in</span> data:
        <span class="text-purple-400">return</span> <span class="text-orange-400">None</span>

    data[<span class="text-green-600">"node"</span>] = <span class="text-blue-400">int</span>(data[<span class="text-green-600">"node"</span>])
    data[<span class="text-green-600">"seq"</span>] = <span class="text-blue-400">int</span>(data[<span class="text-green-600">"seq"</span>])
    <span class="text-purple-400">return</span> data</code></pre>

          <pre class="bg-white border border-gray-400 text-gray-400 rounded-md overflow-x-auto my-4 p-4">
<code class="text-sm"><span class="text-purple-400">def</span> <span class="text-green-400">build_payload</span>(parsed: <span class="text-blue-400">dict</span>) -&gt; <span class="text-blue-400">dict</span>:
    payload = {{ '{' }}
        <span class="text-green-600">"node_id"</span>: parsed[<span class="text-green-600">"node"</span>],
        <span class="text-green-600">"seq"</span>: parsed[<span class="text-green-600">"seq"</span>],
        <span class="text-green-600">"event_type"</span>: parsed[<span class="text-green-600">"ev"</span>].lower(),
    {{ '}' }}

    <span class="text-purple-400">if</span> payload[<span class="text-green-600">"event_type"</span>] == <span class="text-green-600">"rfid_scan"</span> <span class="text-purple-400">and</span> <span class="text-green-600">"uid"</span> <span class="text-purple-400">in</span> parsed:
        payload[<span class="text-green-600">"rfid_uid"</span>] = parsed[<span class="text-green-600">"uid"</span>]

    <span class="text-purple-400">return</span> payload</code></pre>

          <!-- Sottosezione A.2.2 -->
          <h4 class="text-xl font-bold text-primary mb-4 mt-8">A.2.2 API Desk RFID</h4>
          
          <pre class="bg-white border border-gray-400 text-gray-400 rounded-md overflow-x-auto my-4 p-4">
<code class="text-sm"><span class="text-gray-500">@app.route("/api/rfid/read-once", methods=["GET"])</span>
<span class="text-purple-400">def</span> <span class="text-green-400">read_once</span>():
    init_gpio()
    <span class="text-purple-400">try</span>:
        beep(<span class="text-green-600">"short"</span>)
        uid_int, text = reader.read()
        uid_hex_full = <span class="text-blue-400">format</span>(uid_int, <span class="text-green-600">"X"</span>).upper()
        uid_hex = uid_hex_full[:<span class="text-orange-400">8</span>]
        beep(<span class="text-green-600">"double"</span>)
        <span class="text-purple-400">return</span> jsonify({{ '{' }}<span class="text-green-600">"uid_hex"</span>: uid_hex{{ '}' }}), <span class="text-orange-400">200</span>
    <span class="text-purple-400">except</span> <span class="text-blue-400">Exception</span> <span class="text-purple-400">as</span> e:
        beep(<span class="text-green-600">"long"</span>)
        <span class="text-purple-400">return</span> jsonify({{ '{' }}<span class="text-green-600">"detail"</span>: <span class="text-blue-400">str</span>(e){{ '}' }}), <span class="text-orange-400">500</span></code></pre>
        </section>

        <!-- Sezione A.3 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">A.3 Snippet di codice aggiuntivi</h3>
          
          <!-- Sottosezione A.3.1 -->
          <h4 class="text-xl font-bold text-primary mb-4 mt-8">A.3.1 Pattern di beep sul nodo Heltec</h4>
          
          <pre class="bg-white border border-gray-400 text-gray-400 rounded-md overflow-x-auto my-4 p-4">
<code class="text-sm"><span class="text-blue-400">void</span> <span class="text-green-400">beep</span>(<span class="text-blue-400">unsigned int</span> durationMs = <span class="text-orange-400">80</span>) {{ '{' }}
  digitalWrite(PIN_BUZZER, HIGH);
  delay(durationMs);
  digitalWrite(PIN_BUZZER, LOW);
{{ '}' }}

<span class="text-blue-400">void</span> <span class="text-green-400">beepShort</span>() {{ '{' }}
  beep(<span class="text-orange-400">80</span>);
{{ '}' }}

<span class="text-blue-400">void</span> <span class="text-green-400">beepDouble</span>() {{ '{' }}
  <span class="text-purple-400">for</span> (<span class="text-blue-400">int</span> i = <span class="text-orange-400">0</span>; i &lt; <span class="text-orange-400">2</span>; i++) {{ '{' }}
    beep(<span class="text-orange-400">60</span>);
    delay(<span class="text-orange-400">80</span>);
  {{ '}' }}
{{ '}' }}

<span class="text-blue-400">void</span> <span class="text-green-400">beepLong</span>() {{ '{' }}
  beep(<span class="text-orange-400">300</span>);
{{ '}' }}</code></pre>
        </section>

        <!-- Sezione A.4 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">A.4 Comandi essenziali</h3>
          
          <p class="mb-4 leading-relaxed">
            Di seguito alcuni comandi di riferimento per l'utilizzo in locale (da adattare alle directory effettive):
          </p>

          <ul class="list-disc list-inside mb-6 space-y-3 ml-4">
            <li>
              attivazione virtualenv sul Raspberry:
              <pre class="bg-white border border-gray-400 text-primary rounded-md overflow-x-auto my-2 p-3">
<code class="text-sm">source ~/velostazione-venv/bin/activate</code></pre>
            </li>
            <li>
              esecuzione del gateway LoRa:
              <pre class="bg-white border border-gray-400 text-primary rounded-md overflow-x-auto my-2 p-3">
<code class="text-sm">python gateway_lora_to_http.py</code></pre>
            </li>
            <li>
              esecuzione dell'API desk RFID:
              <pre class="bg-white border border-gray-400 text-primary rounded-md overflow-x-auto my-2 p-3">
<code class="text-sm">python desk_rfid_api.py</code></pre>
            </li>
            <li>
              avvio del backend Django:
              <pre class="bg-white border border-gray-400 text-primary rounded-md overflow-x-auto my-2 p-3">
<code class="text-sm">python manage.py runserver 0.0.0.0:8000</code></pre>
            </li>
            <li>
              avvio del frontend Angular:
              <pre class="bg-white border border-gray-400 text-primary rounded-md overflow-x-auto my-2 p-3">
<code class="text-sm">npm start</code></pre>
            </li>
          </ul>
        </section>

        <!-- Sezione A.5 -->
        <section class="mb-12">
          <h3 class="text-2xl font-bold text-primary mb-6">A.5 Repository e figure</h3>
          
          <p class="mb-4 leading-relaxed">
            I link alle repository Git del progetto verranno inseriti qui:
          </p>

          <ul class="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>
              componente IoT <em>Velostazione IoT</em> (Codice dei nodi di stallo e servizi Python su Raspberry Pi): 
              <a href="https://github.com/mussida/velostazione-iot" 
                 target="_blank" 
                 class="text-primary hover:text-green-500 underline">
                https://github.com/mussida/velostazione-iot
              </a>
            </li>
          </ul>
        </section>

      </div>
    </div>
  `,
  styles: [`
    code {
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      line-height: 1.5;
    }

    pre {
      line-height: 1.6;
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
export class AppendixComponent {}