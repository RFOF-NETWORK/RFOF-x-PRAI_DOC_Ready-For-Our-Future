# Detaillierte Node Dokumentation: RFOF x PRAI Node Betrieb und Konfiguration

Diese Dokumentation bietet eine tiefgehende technische Anleitung für das Betreiben, die Konfiguration und die Fehlerbehebung von RFOF x PRAI Nodes. Sie richtet sich an fortgeschrittene Nutzer, Validatoren und Systemadministratoren, die ein umfassendes Verständnis der Node-Infrastruktur und deren Optimierung anstreben.

## 1. Node Software Installation und Upgrade

Die RFOF x PRAI Node Software ist das Herzstück Ihres Node-Betriebs. Es ist entscheidend, die Installation korrekt durchzuführen und den Node stets auf dem neuesten Stand zu halten.

* **Systemvoraussetzungen (Aktualisiert):**
    * **Betriebssystem:** Bevorzugt 64-bit Linux Distribution (Ubuntu 22.04 LTS oder CentOS 8+ empfohlen). Experimenteller Support für macOS und Windows (via WSL2).
    * **CPU:** Mindestens 8 physische Kerne (Intel Xeon E-Serie, AMD EPYC oder vergleichbar), 16+ Kerne empfohlen für Validator Nodes.
    * **RAM:** Mindestens 32 GB DDR4 RAM, 64 GB+ ECC RAM empfohlen für kritische Validatoren.
    * **Speicher:** 2 TB NVMe SSD (Enterprise-Klasse) dringend empfohlen. Die BOxchain wächst dynamisch; stellen Sie ausreichend Platz für die nächsten 2-3 Jahre bereit (Prognose: 500 GB pro Jahr).
    * **Netzwerk:** Dedizierter 1 Gbps symmetrischer Internetanschluss. Statische IP-Adresse erforderlich für Validator Nodes. Offene Ports: TCP 30303 (Standard, kann konfiguriert werden) für P2P-Kommunikation.

* **Download und Installation:**
    1.  **Herunterladen:** Laden Sie das neueste stabile Binary-Release oder den Quellcode von unserem [offiziellen GitHub-Repository](https://github.com/RFOF-x-PRAI/node-software/releases) herunter.
        ```bash
        wget [https://github.com/RFOF-x-PRAI/node-software/releases/download/vX.Y.Z/rfof-node-linux-amd64.tar.gz](https://github.com/RFOF-x-PRAI/node-software/releases/download/vX.Y.Z/rfof-node-linux-amd64.tar.gz)
        tar -xzvf rfof-node-linux-amd64.tar.gz
        cd rfof-node-linux-amd64
        ```
    2.  **Konfigurieren:** Erstellen Sie eine `config.toml` Datei basierend auf der Beispielkonfiguration (siehe Abschnitt 2).
    3.  **Starten:**
        ```bash
        ./rfof-node --config config.toml
        ```
    4.  **Systemd Service (Empfohlen für Produktion):** Richten Sie einen Systemd-Dienst ein, um den Node im Hintergrund laufen zu lassen und automatische Neustarts zu ermöglichen.
        ```systemd
        # /etc/systemd/system/rfof-node.service
        [Unit]
        Description=RFOF x PRAI Node Service
        After=network.target

        [Service]
        Type=simple
        User=rfofnode
        WorkingDirectory=/opt/rfof-node
        ExecStart=/opt/rfof-node/rfof-node --config /opt/rfof-node/config.toml
        Restart=on-failure
        RestartSec=10
        LimitNOFILE=65535

        [Install]
        WantedBy=multi-user.target
        ```
        ```bash
        sudo useradd -m rfofnode -s /bin/bash
        sudo mkdir -p /opt/rfof-node
        sudo cp -r /path/to/downloaded/rfof-node/* /opt/rfof-node/
        sudo chown -R rfofnode:rfofnode /opt/rfof-node
        sudo cp /etc/systemd/system/rfof-node.service .
        sudo systemctl daemon-reload
        sudo systemctl enable rfof-node
        sudo systemctl start rfof-node
        sudo systemctl status rfof-node
        ```
* **Upgrades:** Stoppen Sie den Node-Dienst, ersetzen Sie die Binaries durch die neue Version und starten Sie den Dienst neu. Führen Sie vorab immer ein Backup Ihrer Konfigurations- und Datenverzeichnisse durch.

## 2. Node Konfiguration (`config.toml`)

Die `config.toml` Datei steuert das Verhalten Ihres RFOF x PRAI Nodes.

```toml
# RFOF x PRAI Node Konfigurationsdatei

[Node]
# Network configuration
P2PPort = 30303                       # Port for P2P communication (default: 30303)
RPCListenAddress = "127.0.0.1:8080"   # Address for RPC interface (for DApps, wallets)
EnableRPC = true                      # Enable or disable RPC server
EnableWS = true                       # Enable WebSocket for RPC

# Data directory and chain synchronization
DataDir = "/var/lib/rfof-node/data"   # Directory for blockchain data
SyncMode = "full"                     # "full" or "light" (for light clients)
# Bootnodes for initial connection (replace with actual bootnode list)
Bootnodes = ["enode://pubkey1@ip1:port1", "enode://pubkey2@ip2:port2"]

[Logging]
Level = "info"                        # Log level: debug, info, warn, error
Output = "stdout"                     # Log output: stdout, stderr, /path/to/file.log

[Validator]
# Validator-specific configuration (only for Validator Nodes)
EnableValidator = false               # Set to true to enable validator mode
ValidatorKeyFile = "/var/lib/rfof-node/keys/validator.json" # Path to validator private key
ValidatorPassword = "your_secure_password" # Password for the key file
StakingAmount = "100000000000000000000" # Minimum stake (example: 100 RFOF tokens in smallest unit)
# PRAI-specific validation parameters (optional, configured by PRAI-Neuronen)
PRAIIntegrationEnabled = true
PRAIWeightThreshold = 0.8             # Minimum PRAI-intelligence weight for validation tasks

[Metrics]
EnableMetrics = true                  # Enable Prometheus metrics endpoint
MetricsListenAddress = "127.0.0.1:9090" # Address for metrics interface
