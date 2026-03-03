import json, hashlib, time, os
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(content_length))
            
            # LOGIQUE MÈRE : TAXE 1% (0.5% CREATOR / 0.5% TREASURY)
            amount = float(data.get('amount', 0))
            creator_royalty = amount * 0.005
            support_royalty = amount * 0.005
            
            # GÉNÉRATION CODE SCELLÉ 5D
            tx_id = hashlib.sha256(f"{data.get('wallet')}{time.time()}".encode()).hexdigest()[:12].upper()
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            self.wfile.write(json.dumps({
                "status": "EXCHANGE_SCELLÉ",
                "service_code": f"OMNI-{tx_id}",
                "royalties": {"creator": creator_royalty, "treasury": support_royalty},
                "node": "IAD1_WASHINGTON_ACTIVE"
            }).encode())
        except Exception as e:
            self.send_response(500)
            self.end_headers()
