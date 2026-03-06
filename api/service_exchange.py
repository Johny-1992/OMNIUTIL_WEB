import json, hashlib, time, datetime
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(content_length))

            # PROTOCOLE DE MÉXITOCRATIE : Capture Directe par Webhook
            # Chaque requête doit contenir l'ID de Facturation Original (Gage Réel)
            billing_id = data.get('billing_id')
            if not billing_id:
                raise ValueError("ERREUR_TRAÇABILITÉ : ID de Facturation Partenaire Manquant")

            declared_rate = float(data.get('declared_rate', 0.5)) / 100
            amount = float(data.get('amount', 0))
            
            # SÉCURITÉ : Royalties 0.5% (Creator) / 0.5% (Treasury)
            creator_royalty = amount * 0.005
            support_royalty = amount * 0.005

            # RÉGULATION RARETÉ & QUOTA JOURNALIER
            annual_supply = 750000
            days_left = (datetime.date(datetime.date.today().year, 12, 31) - datetime.date.today()).days + 1
            daily_quota = annual_supply / days_left
            
            reward_util = min(amount * declared_rate, daily_quota, 100)
            status = "CAPTURE_DIRECTE_VALIDÉE" if reward_util < 100 else "RÉGULATION_FRAUDE_DÉTECTÉE"

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            self.wfile.write(json.dumps({
                "status": status,
                "billing_id": billing_id,
                "reward_util": round(reward_util, 6),
                "royalties": {"creator": creator_royalty, "treasury": support_royalty},
                "node": "IAD1_ACTIVE_WEBHOOK_PRO"
            }).encode())
        except Exception as e:
            self.send_response(403)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
