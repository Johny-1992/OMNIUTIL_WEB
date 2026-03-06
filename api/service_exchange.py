import json, hashlib, time, datetime
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(content_length))

            # 1. PARAMÈTRE SOUVERAIN : Génération Wallet par Identifiant (Zéro Friction)
            user_id = data.get('user_id')
            partner_id = data.get('service', 'GLOBAL')
            billing_id = data.get('billing_id')
            
            if not billing_id or not user_id:
                raise ValueError("ERREUR_ADMISSIBILITÉ : Identifiants ou Facture Manquants")

            # 2. CRÉATION DU WALLET UNIQUE (Sceau Déterministe)
            seed = f"OMNI:{partner_id}:{user_id}".encode()
            assigned_wallet = "0x" + hashlib.sha256(seed).hexdigest()[:40]

            # 3. CALCUL DU MÉRITE (Taux Déclaré) ET RARETÉ (Prix de Survie)
            amount = float(data.get('amount', 0))
            rate = float(data.get('declared_rate', 0.1)) / 100
            valeur_usd = amount * rate
            
            # Prix calculé pour 100M d'abonnés (Rareté Inverse)
            prix_util = 3650.96 
            reward_util = valeur_usd / prix_util

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            self.wfile.write(json.dumps({
                "status": "CAPTURE_DIRECTE_MÉRITOCRATIQUE_SCELLÉE",
                "assigned_wallet": assigned_wallet,
                "reward_util": round(reward_util, 8),
                "royalties_creator": amount * 0.005,
                "node": "IAD1_WASHINGTON_GALAXY_PRO"
            }).encode())
        except Exception as e:
            self.send_response(403)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
