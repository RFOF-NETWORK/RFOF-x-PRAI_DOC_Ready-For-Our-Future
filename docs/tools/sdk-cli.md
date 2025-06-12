# SDK und CLI: RFOF x PRAI Entwicklungswerkzeuge

Das RFOF x PRAI Software Development Kit (SDK) und das Command Line Interface (CLI) sind die primären Werkzeuge für Entwickler, um effizient mit der RFOF x PRAI BOxchain zu interagieren, Smart Contracts zu entwickeln und DApps zu erstellen. Sie bieten eine robuste und benutzerfreundliche Schnittstelle zu den Kernfunktionen des Netzwerks.

## 1. RFOF x PRAI SDK (Software Development Kit)

Das RFOF x PRAI SDK ist eine Sammlung von Bibliotheken und APIs, die es Entwicklern ermöglichen, Anwendungen zu erstellen, die mit der RFOF x PRAI BOxchain kommunizieren. Es ist in verschiedenen Sprachen verfügbar, um eine breite Entwicklerbasis zu unterstützen.

### Verfügbare SDKs:

* **JavaScript/TypeScript SDK:**
    * **Zweck:** Ideal für Web-basierte DApps (Frontend), Node.js-Backend-Dienste und Server-Side-Anwendungen, die mit RFOF x PRAI interagieren.
    * **Installation:**
        ```bash
        npm install @rfof-x-prai/sdk
        # oder mit yarn
        yarn add @rfof-x-prai/sdk
        ```
    * **Kernfunktionen:**
        * **Wallet-Management:** Erstellung von Wallets, Schlüsselgenerierung, Signierung von Transaktionen.
        * **Client-Verbindung:** Verbindung zu RFOF x PRAI Nodes (lokal oder remote RPC), Abfragen des Kettzustands (Blöcke, Transaktionen, Kontostände).
        * **Smart Contract Interaktion:** Erstellung von Smart Contract Instanzen, Aufruf von Methoden, Abfrage von Zustandsvariablen.
        * **Transaktions-Builder:** Erstellung und Serialisierung von verschiedenen Transaktionstypen.
        * **Utilities:** Kryptografische Hilfsfunktionen, Adressvalidierung, Gas-Schätzung.
    * **Beispiel-Code:**
        ```javascript
        import { RFOFClient, Wallet } from '@rfof-x-prai/sdk';

        const client = new RFOFClient('[https://mainnet.rfof-x-prai.org/rpc](https://mainnet.rfof-x-prai.org/rpc)'); // Oder 'http://localhost:8080' für DevNet
        const wallet = Wallet.fromMnemonic('Ihre geheime Seed-Phrase hier'); // Nur zu Testzwecken, NICHT in Produktion!

        async function sendTokens(recipientAddress, amount) {
            try {
                const transaction = client.buildTransferTransaction(wallet.address, recipientAddress, amount);
                const signedTx = await wallet.signTransaction(transaction);
                const txHash = await client.sendTransaction(signedTx);
                console.log('Transaktion gesendet:', txHash);
            } catch (error) {
                console.error('Fehler beim Senden der Transaktion:', error);
            }
        }

        sendTokens('EQBc...IhreEmpfängeradresse...A==', '1000000000'); // 1 RFOF Token (angenommen 9 Dezimalstellen)
        ```
* **Python SDK:**
    * **Zweck:** Für Backend-Skripte, Datenanalyse, Automatisierung und KI-Integration (insbesondere mit [PRAI-Neuronen](link-to-prai-neurons-satoramy-42-md-file.md) und [Planet Rescuer AI](link-to-planet-rescuer-ai-md-file.md)).
    * **Installation:** `pip install rfof-x-prai-sdk`
    * **Funktionen:** Ähnliche Funktionen wie das JavaScript SDK, angepasst an die Python-Ökosystem.

### Best Practices für SDK-Nutzung:

* **Asynchrone Programmierung:** Die meisten SDK-Operationen sind asynchron; verwenden Sie `async/await` oder Promises.
* **Fehlerbehandlung:** Implementieren Sie robuste Fehlerbehandlung, um unerwartete Netzwerk- oder Smart Contract-Fehler zu handhaben.
* **Sichere Schlüsselverwaltung:** Speichern Sie private Schlüssel oder Seed-Phrasen niemals direkt im Code. Nutzen Sie Umgebungsvariablen, Key-Management-Dienste oder Hardware-Wallets.

## 2. RFOF x PRAI CLI (Command Line Interface)

Das RFOF x PRAI CLI ist ein leistungsstarkes Befehlszeilen-Tool, das Administratoren, Entwicklern und erfahrenen Nutzern eine direkte Interaktion mit der BOxchain ermöglicht, ohne eine grafische Benutzeroberfläche zu benötigen.

* **Installation:** Das CLI wird oft zusammen mit der Node-Software oder als separates Paket bereitgestellt.
    ```bash
    # Nach dem Download der Node-Software oder als separates Paket
    # Fügen Sie das CLI-Binary zu Ihrem PATH hinzu
    sudo cp /path/to/rfof-cli /usr/local/bin/
    ```
* **Kernbefehle und Anwendungsfälle:**

    * **`rfof-cli wallet generate`:** Erstellt eine neue Wallet und generiert eine Seed-Phrase.
    * **`rfof-cli wallet import --mnemonic "ihre phrase"`:** Importiert eine Wallet aus einer Seed-Phrase.
    * **`rfof-cli wallet list`:** Listet die konfigurierten Wallets auf.
    * **`rfof-cli transfer --from <address> --to <address> --amount <value> --keyfile <path>`:** Sendet RFOF x PRAI Token.
    * **`rfof-cli contract deploy --code <path_to_bytecode> --abi <path_to_abi> --from <address>`:** Stellt einen Smart Contract bereit.
    * **`rfof-cli contract call --address <contract_address> --method <method_name> --args <json_args>`:** Ruft eine Methode auf einem bereitgestellten Smart Contract auf.
    * **`rfof-cli node status`:** Zeigt den aktuellen Synchronisationsstatus und die Peer-Verbindungen des lokalen Nodes an.
    * **`rfof-cli explore tx <transaction_hash>`:** Sucht eine Transaktion im Netzwerk und zeigt Details an (verwendet den [RFOF x PRAI Explorer](link-to-explorers-md-file.md) im Hintergrund).
    * **`rfof-cli prai query --type <query_type> --params <json_params>`:** Ermöglicht die Abfrage von Daten oder Analysen direkt von den [PRAI-Neuronen](link-to-prai-neurons-satoramy-42-md-file.md) (falls konfiguriert).

* **Integration mit Skripten:** Das CLI kann hervorragend in Shell-Skripte integriert werden, um Automatisierungsaufgaben für Node-Betreiber, Validatoren oder DevOps-Prozesse zu ermöglichen.

Das RFOF x PRAI SDK und CLI sind unverzichtbare Werkzeuge, die Entwicklern die vollständige Kontrolle und Flexibilität bei der Gestaltung und Interaktion mit dem RFOF x PRAI Ökosystem bieten.
