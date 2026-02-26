from http.server import BaseHTTPRequestHandler
import json
import datetime

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # 1. Lecture de la requête du Conquérant
        content_length = int(self.headers['Content-Length'])
        post_data = json.loads(self.rfile.read(content_length))
        
        wallet = post_data.get('wallet', ['Unknown'])[0] # Récupère l'adresse du tableau accounts
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # 2. Logique de Distribution (Simulation de Scellé SHA-256)
        # Note : Sur Vercel, l'écriture de fichiers est temporaire, 
        # mais la réponse confirme l'attribution au nœud de Washington.
        response_payload = {
            "status": "SCELLÉ",
            "message": "Félicitations Conquérant !",
            "details": {
                "asset": "1 UTIL",
                "wallet_assigned": wallet,
                "value_usdt": "1.25",
                "node": "Washington_DC_Node_Active",
                "protocol": "NEMESIS_RECOVERY_v1",
                "timestamp": timestamp
            },
            "security_seal": "0x" + "a1b2c3d4e5f6".upper() # Signature simulée
        }

        # 3. Envoi de la réponse "Perfection Totale"
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        # Autorise le frontend omniutil-web à lire la réponse
        self.send_header('Access-Control-Allow-Origin', '*') 
        self.end_headers()
        
        self.wfile.write(json.dumps(response_payload).encode('utf-8'))

    def do_OPTIONS(self):
        # Gestion du protocole CORS pour les navigateurs modernes
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
