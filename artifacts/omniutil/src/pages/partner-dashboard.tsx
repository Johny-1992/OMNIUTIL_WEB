import { useGetPartnerStats, useGetRewardsTimeline, useListUsers, useListTransactions } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, DollarSign, Zap } from "lucide-react";

export default function PartnerDashboard() {
  const partnerId = localStorage.getItem("partnerId") || "default-partner-id"; // Mocked for now

  const { data: stats, isLoading: statsLoading } = useGetPartnerStats(partnerId, { query: { enabled: !!partnerId, queryKey: ["partnerStats", partnerId] } });
  
  if (statsLoading) return <div className="p-8 text-center">Loading Data...</div>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Partner Control Center</h1>
        <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-mono border border-green-500/30">
          ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats?.totalUsers?.toLocaleString() || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            <Activity className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats?.activeUsers?.toLocaleString() || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Volume (USD)</CardTitle>
            <DollarSign className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">${stats?.totalConsumptionUSD?.toLocaleString() || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rewards Dist (UTIL)</CardTitle>
            <Zap className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-primary">{stats?.totalRewardsUTIL?.toLocaleString() || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentTransactions?.map(tx => (
                <div key={tx.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-white">{tx.type}</p>
                    <p className="text-xs font-mono text-muted-foreground">{tx.txHash?.substring(0,10)}...</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-primary">+{tx.amount} UTIL</p>
                  </div>
                </div>
              ))}
              {(!stats?.recentTransactions || stats.recentTransactions.length === 0) && (
                <div className="text-center text-muted-foreground py-4">No recent activity</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
