import { useGetOverviewStats, useListApplications, useApprovePartner, useRejectPartner } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useGetOverviewStats();
  const { data: pendingApps, refetch } = useListApplications({ status: "pending" });
  const approve = useApprovePartner();
  const reject = useRejectPartner();
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    approve.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Approved" });
        refetch();
      }
    });
  };

  const handleReject = (id: string) => {
    reject.mutate({ id, data: { reason: "Admin rejection" } }, {
      onSuccess: () => {
        toast({ title: "Rejected" });
        refetch();
      }
    });
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-white">Global AI Coordinator</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Total Network Volume (USD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-white">${stats?.totalConsumptionVolumeUSD?.toLocaleString() || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">UTIL Circulating Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-white">{stats?.utilCirculatingSupply?.toLocaleString() || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">24h Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-white">{stats?.transactionsLast24h?.toLocaleString() || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-4 h-4" /> Pending Integrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApps?.map(app => (
              <div key={app.id} className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg border border-border">
                <div>
                  <h4 className="font-bold text-white">{app.name}</h4>
                  <p className="text-sm text-muted-foreground">{app.ecosystemType} • Rate: {app.rewardRate}%</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{app.walletAddress}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={() => handleReject(app.id)} disabled={reject.isPending}>Reject</Button>
                  <Button size="sm" onClick={() => handleApprove(app.id)} disabled={approve.isPending} className="bg-green-600 hover:bg-green-500 text-white">Approve</Button>
                </div>
              </div>
            ))}
            {(!pendingApps || pendingApps.length === 0) && (
              <div className="text-center text-muted-foreground py-8">All clear. No pending applications.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
