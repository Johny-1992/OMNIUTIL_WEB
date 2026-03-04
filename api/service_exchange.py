import json, hashlib, time, datetime
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            raw_data = self.rfile.read(content_length)
            data = json.loads(raw_data)

            # 1. MATRICE DES TAUX PARTENAIRES (SCELLÉE)
            rates = {"AIRTEL": 0.005, "CANAL+": 0.01, "ECOBANK": 0.03}
            partner = data.get('service', 'AIRTEL').upper()
            base_rate = rates.get(partner, 0.005)

            # 2. CALCUL DES TAXES SOUVERAINES (0.5% + 0.5%)
            amount = float(data.get('amount', 0))
            creator_royalty = amount * 0.005
            support_royalty = amount * 0.005

            # 3. BOUCLIER D'ÉPUISEMENT (Calcul du Quota de Survie)
            # On simule un stock restant (ceci sera lié à la BSC après l'ownership)
            annual_supply = 1000000
            today = datetime.date.today()
            days_left = (datetime.date(today.year, 12, 31) - today).days + 1
            daily_quota = annual_supply / days_left

            # 4. RÉGULATION DE LA RARETÉ
            reward_requested = amount * base_rate
            status = "EXCHANGE_SCELLÉ"
            
            if reward_requested > daily_quota:
                reward_util = daily_quota # On protège le stock
                status = "RÉGULATION_RARETÉ_ACTIVE"
            else:
                reward_util = reward_requested

            # GÉNÉRATION CODE SCELLÉ 5D
            tx_id = hashlib.sha256(f"{data.get('wallet')}{time.time()}".encode()).hexdigest()[:12].upper()

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            response = {
                "status": status,
                "service_code": f"OMNI-{tx_id}",
                "reward_util": round(reward_util, 4),
                "royalties": {"creator": creator_royalty, "treasury": support_royalty},
                "node": "IAD1_WASHINGTON_ACTIVE",
                "days_to_reset": days_left
            }
            self.wfile.write(json.dumps(response).encode())

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
