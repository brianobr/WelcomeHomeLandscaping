import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QuoteRequest } from "@shared/schema";
import { AdminLogin } from "@/components/AdminLogin";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Clock, 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  ArrowLeft,
  CheckCircle,
  XCircle,
  LogOut,
  Trash2
} from "lucide-react";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "changeme"; // Fallback for development

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);
  const { toast } = useToast();
  const { data: quoteRequests, isLoading } = useQuery({ 
    queryKey: ['/api/quote-requests'],
    enabled: isAuthenticated // Only fetch data when authenticated
  });

  const deleteQuoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await apiRequest(`/api/quote-requests/${id}`, 'DELETE');
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quote-requests'] });
      toast({
        title: "Quote request deleted",
        description: "The quote request has been successfully removed."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete quote request. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setLoginError("");
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setSelectedRequest(null);
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} error={loginError} />;
  }

  const requests = (quoteRequests as any)?.data || [];
  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r: QuoteRequest) => r.status === 'pending').length;
  const recentRequests = requests.filter((r: QuoteRequest) => {
    if (!r.createdAt) return false;
    const requestDate = new Date(r.createdAt);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return requestDate > threeDaysAgo;
  }).length;

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string | null) => {
    if (!status) return <Badge variant="secondary">Unknown</Badge>;
    
    switch (status) {
      case 'pending':
        return <Badge variant="default" className="bg-yellow-500">Pending</Badge>;
      case 'contacted':
        return <Badge variant="default" className="bg-blue-500">Contacted</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome Home Landscaping & Power Washing</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Website
            </Link>
          </Button>
          <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:text-red-700">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">All time quote requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent (3 days)</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{recentRequests}</div>
            <p className="text-xs text-muted-foreground">New requests this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingRequests})</TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Quote Requests</CardTitle>
                <CardDescription>Latest customer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.slice(0, 5).map((request: QuoteRequest) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{request.firstName} {request.lastName}</p>
                        <p className="text-sm text-gray-600">{request.services?.join(', ') || 'No services'}</p>
                        <p className="text-xs text-gray-500">{formatDate(request.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(request.status)}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedRequest(request)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteQuoteMutation.mutate(request.id)}
                          disabled={deleteQuoteMutation.isPending}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Services</CardTitle>
                <CardDescription>Most requested services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(() => {
                    const serviceCounts = requests.reduce((acc: Record<string, number>, request: QuoteRequest) => {
                      if (request.services) {
                        request.services.forEach((service: string) => {
                          acc[service] = (acc[service] || 0) + 1;
                        });
                      }
                      return acc;
                    }, {} as Record<string, number>);

                    return Object.entries(serviceCounts)
                      .sort(([,a], [,b]) => (b as number) - (a as number))
                      .slice(0, 6)
                      .map(([service, count]) => (
                        <div key={service} className="flex justify-between items-center">
                          <span className="capitalize">{service.replace('-', ' ')}</span>
                          <Badge variant="secondary">{count as number} requests</Badge>
                        </div>
                      ));
                  })()}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <RequestsTable 
            requests={requests.filter((r: QuoteRequest) => r.status === 'pending')} 
            onViewRequest={setSelectedRequest}
            onDeleteRequest={(id: string) => deleteQuoteMutation.mutate(id)}
            isDeleting={deleteQuoteMutation.isPending}
          />
        </TabsContent>

        <TabsContent value="all">
          <RequestsTable 
            requests={requests} 
            onViewRequest={setSelectedRequest}
            onDeleteRequest={(id: string) => deleteQuoteMutation.mutate(id)}
            isDeleting={deleteQuoteMutation.isPending}
          />
        </TabsContent>
      </Tabs>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}

function RequestsTable({ 
  requests, 
  onViewRequest,
  onDeleteRequest,
  isDeleting = false
}: { 
  requests: QuoteRequest[]; 
  onViewRequest: (request: QuoteRequest) => void;
  onDeleteRequest: (id: string) => void;
  isDeleting?: boolean;
}) {
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string | null) => {
    if (!status) return <Badge variant="secondary">Unknown</Badge>;
    
    switch (status) {
      case 'pending':
        return <Badge variant="default" className="bg-yellow-500">Pending</Badge>;
      case 'contacted':
        return <Badge variant="default" className="bg-blue-500">Contacted</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quote Requests</CardTitle>
        <CardDescription>Manage customer inquiries and requests</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request: QuoteRequest) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{request.firstName} {request.lastName}</p>
                    <p className="text-sm text-gray-600">{request.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <a href={`tel:${request.phone}`} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                      <Phone className="h-3 w-3" />
                      {request.phone}
                    </a>
                    <a href={`mailto:${request.email}`} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                      <Mail className="h-3 w-3" />
                      Email
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {(request.services || []).map((service: string) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {service.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    {request.city}, {request.state || 'TX'}
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(request.createdAt)}
                </TableCell>
                <TableCell>
                  {getStatusBadge(request.status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewRequest(request)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDeleteRequest(request.id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function RequestDetailModal({ 
  request, 
  onClose 
}: { 
  request: QuoteRequest; 
  onClose: () => void;
}) {
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Quote Request Details</CardTitle>
            <CardDescription>Customer: {request.firstName} {request.lastName}</CardDescription>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <XCircle className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Name</p>
                <p className="text-lg">{request.firstName} {request.lastName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <a href={`tel:${request.phone}`} className="text-lg text-blue-600 hover:text-blue-800">
                  {request.phone}
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <a href={`mailto:${request.email}`} className="text-lg text-blue-600 hover:text-blue-800">
                  {request.email}
                </a>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Location</p>
                <p className="text-lg">{request.address}</p>
                <p className="text-sm text-gray-600">{request.city}, {request.state || 'TX'} {request.zip}</p>
              </div>
            </div>
          </div>

          {/* Services Requested */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Services Requested
            </h3>
            <div className="flex flex-wrap gap-2">
              {(request.services || []).map((service: string) => (
                <Badge key={service} className="capitalize">
                  {service.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Description */}
          {request.description && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Project Description</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{request.description}</p>
              </div>
            </div>
          )}

          {/* Request Details */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Request Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <Badge variant="default">{request.status || 'pending'}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p>{formatDate(request.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button asChild className="flex-1">
              <a href={`tel:${request.phone}`}>Call Customer</a>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <a href={`mailto:${request.email}?subject=Quote Request - Welcome Home Landscaping`}>
                Send Email
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}