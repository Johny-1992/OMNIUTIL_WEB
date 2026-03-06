import json, hashlib, time, datetime
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(content_length))

            amount = float(data.get('amount', 0))
            rate = float(data.get('declared_rate', 1.0)) / 100
            valeur_due_usd = amount * rate

            # 1. LOI DE RARETÉ (1M / 365 jours)
            days_left = (datetime.date(datetime.date.today().year, 12, 31) - datetime.date.today()).days + 1
            daily_quota = 1000000 / 365 # Quota fixe pour l'équilibre annuel

            # 2. CALCUL DU PRIX DE RARETÉ (Si demande > Quota)
            # On simule un flux global de 10M$ de récompenses/jour pour le calcul
            flux_global_du_jour = 10000000 
            prix_util_rarete = flux_global_du_jour / daily_quota # Ex: 3650.96 $

            # 3. DISTRIBUTION FRACTIONNAIRE (Poussière d'Étoile)
            reward_util = valeur_due_usd / prix_util_rarete

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            self.wfile.write(json.dumps({
                "status": "RÉCOMPENSE_FRACTIONNAIRE_SCELLÉE",
                "valeur_usd": round(valeur_due_usd, 2),
                "reward_util": round(reward_util, 8),
                "prix_calculé_util": round(prix_util_rarete, 2),
                "royalties_creator": amount * 0.005,
                "node": "IAD1_WASHINGTON_GALAXY_NODE"
            }).encode())
        except Exception as e:
            self.send_response(403)
            self.end_headers()
