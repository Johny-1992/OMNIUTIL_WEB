import requests
import json

# CONFIGURATION
TARGET_URL = "https://omniutil-web.vercel.app/api/graft"
ID_TEST = "AUDIT_V2040_INTERNAL"

def run_audit():
    print("\n🛡️ --- STARTING OMNI_SECURITY_AUDIT v2040 ---")
    
    # TEST 1 : TENTATIVE DE BYPASS DES TAXES
    print("\n[TEST 1] Injection de paramètre (Taux 0%)...")
    payload = {"partner_id": ID_TEST, "tax_rate": 0.0}
    try:
        r = requests.post(TARGET_URL, json=payload, timeout=10)
        print(f"RÉPONSE : {r.status_code}")
        if r.status_code == 403 or r.status_code == 401:
            print("✅ LOGIQUE MÈRE INVIOLABLE : Tentative rejetée.")
        else:
            print("⚠️ ANALYSE REQUISE : Vérifiez vos règles de validation API.")
    except Exception as e:
        print(f"❌ CONNEXION IMPOSSIBLE : {e}")

    # TEST 2 : INTÉGRITÉ DE LA SIGNATURE
    print("\n[TEST 2] Vérification Signature IA...")
    try:
        r = requests.post(TARGET_URL, json={"partner_id": "TEST_ID"})
        data = r.json()
        sig = data.get("ai_signature", "NONE")
        print(f"SIGNATURE DÉTECTÉE : {sig}")
        if sig == "OMNI_COORD_V9.0":
            print("✅ CERTIFICATION : Signature authentique.")
    except:
        print("ℹ️ NOTE : Endpoint API non détecté ou réponse non-JSON.")

    print("\n--- AUDIT COMPLETE ---")

if __name__ == "__main__":
    run_audit()
