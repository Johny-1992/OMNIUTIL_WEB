import json, hashlib, time, datetime
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(content_length))

            # 1. GÉNÉRATEUR DE WALLET UNIQUE (Liaison Identifiant -> 0x Address)
            user_id = data.get('user_id') # Ex: +243... ou Numéro Canal+
            partner_id = data.get('service', 'GLOBAL')
            
            if user_id:
                # On crée un hash unique combinant le Partenaire et l'ID Client
                seed = f"{partner_id}:{user_id}".encode()
                deterministic_wallet = "0x" + hashlib.sha256(seed).hexdigest()[:40]
            else:
                deterministic_wallet = data.get('wallet', '0xNULL')

            # 2. CAPTURE DU GAGE (Billing ID Obligatoire)
            billing_id = data.get('billing_id')
            if not billing_id:
                raise ValueError("ERREUR_TRAÇABILITÉ : ID de Facturation Manquant")

            # 3. CALCUL SCRIPTURAIRE & RARETÉ
            amount = float(data.get('amount', 0))
            rate = float(data.get('declared_rate', 0.1)) / 100
            reward_util = min(amount * rate, 100) # Bouclier Anti-Fraude

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            self.wfile.write(json.dumps({
                "status": "CAPTURE_DIRECTE_SCELLÉE",
                "user_id": user_id,
                "assigned_wallet": deterministic_wallet,
                "reward_util": round(reward_util, 6),
                "royalties": {"creator": amount * 0.005},
                "node": "IAD1_WASHINGTON_ULTRA_PRO"
            }).encode())
        except Exception as e:
            self.send_response(403)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
