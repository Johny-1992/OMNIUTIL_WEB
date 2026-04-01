# orchestrator/partner_engine.py
import hashlib
import time

class PartnerEngine:
    def __init__(self, partner_name, reward_rate):
        self.name = partner_name
        self.reward_rate = reward_rate # Taux prédéfini par l'écosystème
        self.creator_fee = 0.005
        self.treasury_fee = 0.005

    def capture_consumption(self, user_id, amount_usd, util_price):
        # Calcul de la récompense nette après prélèvement des droits (1%)
        gross_reward = (amount_usd * self.reward_rate) / util_price
        fee_amount = gross_reward * (self.creator_fee + self.treasury_fee)
        net_reward = gross_reward - fee_amount
        
        validation_hash = hashlib.sha256(f"{user_id}{amount_usd}{time.time()}".encode()).hexdigest()
        
        return {
            "user": user_id,
            "mint_amount": round(net_reward, 4),
            "fees_distributed": {
                "creator": round(gross_reward * self.creator_fee, 6),
                "treasury": round(gross_reward * self.treasury_fee, 6)
            },
            "proof": validation_hash
        }
