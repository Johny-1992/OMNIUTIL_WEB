import json, hashlib, time, datetime
import os
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(content_length))

            # 1. PARAMÈTRES DE SOUVERAINETÉ (OMNIPRÉSENCE)
            user_id = data.get('user_id')
            partner_id = data.get('service', 'GLOBAL')
            action = data.get('action', 'CAPTURE') # CAPTURE, SWAP, ou TRANSFER
            
            # PRIX DE RARETÉ SCELLÉ (Loi de l'Empire)
            PRIX_UTIL = 3650.96

            # 2. GÉNÉRATION DU WALLET SOUVERAIN (Zéro Friction)
            # L'ID client devient son coffre-fort mathématique
            seed = f"OMNI:{partner_id}:{user_id}".encode()
            assigned_wallet = "0x" + hashlib.sha256(seed).hexdigest()[:40]

            # 3. LOGIQUE DE MOUVEMENT DU MÉRITE (Capacités "Dieu")
            response_payload = {
                "status": "ACTION_SCELLÉE_IAD1",
                "wallet_id": assigned_wallet,
                "node": "IAD1_WASHINGTON_GALAXY_PRO",
                "timestamp": datetime.datetime.now().isoformat()
            }

            if action == 'CAPTURE':
                # Capture de facturation (Airtel, Amazon, etc.)
                amount = float(data.get('amount', 0))
                rate = float(data.get('declared_rate', 0.1)) / 100
                reward_util = (amount * rate) / PRIX_UTIL
                
                response_payload.update({
                    "type": "MINT_MÉRITE",
                    "reward_util": round(reward_util, 8),
                    "royalties_creator": round(amount * 0.005, 8),
                    "royalties_treasury": round(amount * 0.005, 8)
                })

            elif action == 'SWAP':
                # Échange UTIL vers USDT (Liquidité Immédiate)
                amount_util = float(data.get('amount_util', 0))
                value_usdt = amount_util * PRIX_UTIL
                response_payload.update({
                    "type": "SWAP_USDT",
                    "converted_value": round(value_usdt, 2),
                    "fees_gas": "SOUVERAIN_FREE"
                })

            elif action == 'TRANSFER':
                # Transfert P2P entre abonnés du même écosystème
                recipient_id = data.get('recipient_id')
                amount_util = float(data.get('amount_util', 0))
                response_payload.update({
                    "type": "P2P_TRANSFER",
                    "to": recipient_id,
                    "amount": amount_util,
                    "validation_hash": hashlib.sha256(f"{assigned_wallet}{recipient_id}{time.time()}".encode()).hexdigest()
                })

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response_payload).encode())

        except Exception as e:
            self.send_response(403)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
