from http.server import BaseHTTPRequestHandler
import json

# CONFIGURATION SOUVERAINE MAINNET (BSC)
CONTRACT_ADDR = "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B"
OWNER_ADDR = "0x40BB46B9D10Dd121e7D2150EC3784782ae648090"
TREASURY_ADDR = "0xB13B61a6a84ABfAEfF17E92E41ee6F0eBF42693B"

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data)
            flow_value_usd = float(data.get("flow_value_usd", 0.0))
            tax_rate = float(data.get("tax_rate", 0.01))
            util_price_usd = 0.10 # Oracle à lier ultérieurement

            # LOGIQUE DE RÉPARTITION SOUVERAINE
            reward_util = (flow_value_usd * tax_rate) / util_price_usd
            infra_share = reward_util * 0.005
            treasury_share = reward_util * 0.005
            user_net = reward_util - (infra_share + treasury_share)

            response_data = {
                "status": "GRAFT_SUCCESSFUL",
                "contract": CONTRACT_ADDR,
                "ai_signature": "OMNI_COORD_V9.0",
                "settlement": {
                    "to_owner": {"addr": OWNER_ADDR, "amount": round(infra_share, 6)},
                    "to_treasury": {"addr": TREASURY_ADDR, "amount": round(treasury_share, 6)},
                    "to_user_merit": round(user_net, 6)
                },
                "network": "Binance Smart Chain (Mainnet)"
            }
            status_code = 200

        except Exception as e:
            response_data = {"error": str(e)}
            status_code = 400

        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode())
