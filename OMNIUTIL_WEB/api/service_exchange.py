from http.server import BaseHTTPRequestHandler
import json,hashlib
class handler(BaseHTTPRequestHandler):
 def do_POST(self):
  l=int(self.headers['Content-Length']);d=json.loads(self.rfile.read(l))
  u=d.get('user_id','UKN');a=float(d.get('amount',0));r=float(d.get('rate',0.001))
  w="0x"+hashlib.sha256(u.encode()).hexdigest()[:40]
  u_r=(a*r)/3650
  res={"status":"GRAFT_OK","node":"iad1","wallet":w,"reward":f"{u_r:.12f}","ref":"3650$"}
  self.send_response(200);self.send_header('Content-type','application/json');self.end_headers()
  self.wfile.write(json.dumps(res).encode())
