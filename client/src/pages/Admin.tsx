import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { usePresaleData } from "@/hooks/usePresale";
import { formatEther, parseEther } from "viem";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS, PRESALE_ABI } from "@/lib/contracts";
import { toast } from "sonner";
import { Mail, Download, Trash2, Eye, RefreshCw } from "lucide-react";

// REPLACE THIS WITH YOUR WALLET ADDRESS
const OWNER_ADDRESS = "0x6a2ed39204da66d9eecd06d398e3b06e6ab609ae"; 

interface Subscriber {
  email: string;
  subscribedAt: string;
  id: string;
}

export default function Admin() {
  const { address, isConnected } = useAccount();
  const { 
    totalSold: tokensSold, 
    currentPhase, 
    refetch
  } = usePresaleData();

  // Newsletter state
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);

  // Read real contract balance (MATIC)
  const { data: maticBalance } = useReadContract({
    address: CONTRACTS.PRESALE as `0x${string}`,
    abi: [{
      type: 'function',
      name: 'balance',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'uint256' }]
    }],
    functionName: 'balance',
  });

  // Read USDT Balance of Presale Contract
  const { data: usdtBalance } = useReadContract({
    address: CONTRACTS.USDT as `0x${string}`,
    abi: [{
      type: 'function',
      name: 'balanceOf',
      stateMutability: 'view',
      inputs: [{ type: 'address' }],
      outputs: [{ type: 'uint256' }]
    }],
    functionName: 'balanceOf',
    args: [CONTRACTS.PRESALE],
  });

  // Withdraw MATIC
  const { writeContract: withdrawMatic, data: withdrawMaticHash } = useWriteContract();
  const { isLoading: isWithdrawingMatic, isSuccess: withdrawMaticSuccess } = useWaitForTransactionReceipt({
    hash: withdrawMaticHash,
  });

  // Withdraw USDT
  const { writeContract: withdrawUsdt, data: withdrawUsdtHash } = useWriteContract();
  const { isLoading: isWithdrawingUsdt, isSuccess: withdrawUsdtSuccess } = useWaitForTransactionReceipt({
    hash: withdrawUsdtHash,
  });

  // Update Phase
  const { writeContract: updatePhase, data: updatePhaseHash } = useWriteContract();
  const { isLoading: isUpdatingPhase, isSuccess: updatePhaseSuccess } = useWaitForTransactionReceipt({
    hash: updatePhaseHash,
  });

  // Load subscribers from Web3Forms
  const loadSubscribers = async () => {
    setIsLoadingSubscribers(true);
    try {
      // Get from localStorage (backup)
      const localSubs = JSON.parse(localStorage.getItem("lubdan_subscribers") || "[]");
      setSubscribers(localSubs);
      setShowSubscribers(true);
      toast.success(`Loaded ${localSubs.length} subscribers from local storage`);
    } catch (error) {
      console.error("Error loading subscribers:", error);
      toast.error("Failed to load subscribers");
    } finally {
      setIsLoadingSubscribers(false);
    }
  };

  const deleteSubscriber = (id: string) => {
    try {
      const updatedSubs = subscribers.filter(sub => sub.id !== id);
      setSubscribers(updatedSubs);
      localStorage.setItem("lubdan_subscribers", JSON.stringify(updatedSubs));
      toast.success("Subscriber deleted");
    } catch (error) {
      toast.error("Failed to delete subscriber");
    }
  };

  const exportToCSV = () => {
    const csv = [
      "Email,Subscribed At,ID",
      ...subscribers.map(sub => `${sub.email},${sub.subscribedAt},${sub.id}`)
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lubdan-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success("CSV exported successfully");
  };

  const handleWithdrawMatic = () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    withdrawMatic({
      address: CONTRACTS.PRESALE as `0x${string}`,
      abi: PRESALE_ABI,
      functionName: 'withdrawMatic',
    });
  };

  const handleWithdrawUsdt = () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    withdrawUsdt({
      address: CONTRACTS.PRESALE as `0x${string}`,
      abi: PRESALE_ABI,
      functionName: 'withdrawUSDT',
    });
  };

  const handleUpdatePhase = (newPhase: number) => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    updatePhase({
      address: CONTRACTS.PRESALE as `0x${string}`,
      abi: PRESALE_ABI,
      functionName: 'updatePhase',
      args: [BigInt(newPhase)],
    });
  };

  useEffect(() => {
    if (withdrawMaticSuccess) {
      toast.success("MATIC withdrawn successfully!");
      refetch();
    }
  }, [withdrawMaticSuccess]);

  useEffect(() => {
    if (withdrawUsdtSuccess) {
      toast.success("USDT withdrawn successfully!");
      refetch();
    }
  }, [withdrawUsdtSuccess]);

  useEffect(() => {
    if (updatePhaseSuccess) {
      toast.success("Phase updated successfully!");
      refetch();
    }
  }, [updatePhaseSuccess]);

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Admin Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please connect your wallet to access the admin panel.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (address?.toLowerCase() !== OWNER_ADDRESS.toLowerCase()) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You are not authorized to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-display font-bold mb-8">Admin Panel</h1>

      {/* Newsletter Subscribers Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Newsletter Subscribers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Manage newsletter subscribers. Click "Load Subscribers" to view all registered emails.
          </p>

          <div className="flex gap-2 mb-4">
            <Button
              onClick={loadSubscribers}
              disabled={isLoadingSubscribers}
              className="flex items-center gap-2"
            >
              {isLoadingSubscribers ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Load Subscribers
                </>
              )}
            </Button>

            {showSubscribers && subscribers.length > 0 && (
              <Button
                onClick={exportToCSV}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            )}
          </div>

          {showSubscribers && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium">
                  Total Subscribers: <span className="text-primary">{subscribers.length}</span>
                </p>
              </div>

              {subscribers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No subscribers yet.</p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {subscribers.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{sub.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(sub.subscribedAt).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSubscriber(sub.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-400 mb-2">
              <strong>💡 Tip:</strong> Para ver todos os emails no Web3Forms:
            </p>
            <ol className="text-xs text-muted-foreground space-y-1 ml-4 list-decimal">
              <li>Vá para: <a href="https://web3forms.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://web3forms.com/</a></li>
              <li>Faça login com seu email</li>
              <li>Veja todos os submissions no dashboard</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Presale Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Tokens Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{tokensSold?.toLocaleString() || "0"}</p>
            <p className="text-sm text-muted-foreground">LBD</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Phase {currentPhase}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contract Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {maticBalance ? formatEther(maticBalance as bigint) : "0"} MATIC
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {usdtBalance ? formatEther(usdtBalance as bigint) : "0"} USDT
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Withdraw Funds</h3>
            <div className="flex gap-2">
              <Button
                onClick={handleWithdrawMatic}
                disabled={isWithdrawingMatic}
              >
                {isWithdrawingMatic ? "Withdrawing..." : "Withdraw MATIC"}
              </Button>
              <Button
                onClick={handleWithdrawUsdt}
                disabled={isWithdrawingUsdt}
                variant="outline"
              >
                {isWithdrawingUsdt ? "Withdrawing..." : "Withdraw USDT"}
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Update Phase</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((phase) => (
                <Button
                  key={phase}
                  onClick={() => handleUpdatePhase(phase)}
                  disabled={isUpdatingPhase || currentPhase === phase}
                  variant={currentPhase === phase ? "default" : "outline"}
                >
                  Phase {phase}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
