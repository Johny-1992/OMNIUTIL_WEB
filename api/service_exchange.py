import json, hashlib, time, datetime
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(content_length))

            # 1. LOGIQUE SCRIPTURALE : Récupération du taux déclaré par le partenaire
            declared_rate = float(data.get('declared_rate', 0.5)) / 100
            amount = float(data.get('amount', 0))

            # 2. CALCUL DES TAXES SOUVERAINES (0.5% CREATOR / 0.5% TREASURY)
            creator_royalty = amount * 0.005
            support_royalty = amount * 0.005

            # 3. BOUCLIER DE RARETÉ & MÉRITE
            annual_supply = 750000
            days_left = (datetime.date(datetime.date.today().year, 12, 31) - datetime.date.today()).days + 1
            daily_quota = annual_supply / days_left
            
            reward_requested = amount * declared_rate
            status = "EXCHANGE_SCELLÉ"
            
            # CLAUSE ANTI-FRAUDE : Rejet si hors-mérite ou suspect (> 100 UTIL)
            if reward_requested > 100 or amount < 0.1 or reward_requested > daily_quota:
                reward_util = min(daily_quota, 100)
                status = "RÉGULATION_FRAUDE_DÉTECTÉE_OU_RARETÉ"
            else:
                reward_util = reward_requested

            tx_id = hashlib.sha256(f"{data.get('wallet')}{time.time()}".encode()).hexdigest()[:12].upper()

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            self.wfile.write(json.dumps({
                "status": status,
                "service_code": f"OMNI-{tx_id}",
                "reward_util": round(reward_util, 4),
                "royalties": {"creator": creator_royalty, "treasury": support_royalty},
                "node": "IAD1_WASHINGTON_ACTIVE",
                "manifesto": "Anti-Fraud Compliance Active - Breach results in Partnership Revocation"
            }).encode())
        except Exception as e:
            self.send_response(500)
            self.end_headers()
