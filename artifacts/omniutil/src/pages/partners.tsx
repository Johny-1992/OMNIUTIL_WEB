import { useListPartners } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Partners() {
  const { data: partners, isLoading } = useListPartners();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-white">Partners Directory</h1>
      
      {isLoading ? (
        <div className="text-center p-8 text-muted-foreground">Loading ecosystem data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners?.map(partner => (
            <Card key={partner.id} className="bg-card hover:bg-secondary/50 transition-colors cursor-pointer border border-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-white">{partner.name}</h3>
                  <Badge variant={partner.status === "active" ? "default" : "secondary"}>
                    {partner.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ecosystem</span>
                    <span className="capitalize">{partner.ecosystemType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reward Rate</span>
                    <span className="font-mono text-primary">{partner.rewardRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Users</span>
                    <span className="font-mono">{partner.totalUsers?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {(!partners || partners.length === 0) && (
            <div className="col-span-3 text-center py-12 text-muted-foreground">No partners found.</div>
          )}
        </div>
      )}
    </div>
  );
}
