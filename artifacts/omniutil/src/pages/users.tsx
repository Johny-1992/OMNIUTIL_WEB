import { useListUsers } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Users() {
  const { data: usersData, isLoading } = useListUsers();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-white">Users Explorer</h1>
      
      <div className="max-w-md">
        <Input placeholder="Search wallet address..." className="bg-card" />
      </div>

      {isLoading ? (
        <div className="text-center p-8 text-muted-foreground">Loading network data...</div>
      ) : (
        <div className="grid gap-4">
          {usersData?.data?.map(user => (
            <Card key={user.walletAddress}>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-mono font-medium text-white">{user.walletAddress}</h3>
                  <p className="text-sm text-muted-foreground">Last active: {new Date(user.lastActivity || "").toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold font-mono text-primary">{user.utilBalance.toLocaleString()} UTIL</div>
                  <p className="text-sm text-muted-foreground">Total Earned: {user.totalEarned.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          {(!usersData?.data || usersData.data.length === 0) && (
             <div className="text-center py-12 text-muted-foreground">No users found.</div>
          )}
        </div>
      )}
    </div>
  );
}
