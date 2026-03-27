from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data)
            partner_id = data.get("partner_id", "ANONYMOUS")
            tax_rate = data.get("tax_rate", 0.01) # Par défaut 1% total

            # LOGIQUE MÈRE : PROTECTION DU SEUIL CRITIQUE (1% minimum total)
            if tax_rate < 0.01:
                response_data = {
                    "status": "FORBIDDEN",
                    "reason": "Sovereignty Tax cannot be lower than 1% (0.5% Infra + 0.5% Treasury)",
                    "ai_signature": "OMNI_COORD_V9.0_SECURITY_BLOCK"
                }
                status_code = 403
            else:
                response_data = {
                    "status": "GRAFT_SUCCESSFUL",
                    "partner_id": partner_id,
                    "node": "Washington_iad1",
                    "ai_signature": "OMNI_COORD_V9.0",
                    "merit_status": "ACTIVATED"
                }
                status_code = 200

        except Exception as e:
            response_data = {"error": str(e)}
            status_code = 400

        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode())
