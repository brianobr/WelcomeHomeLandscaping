import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Phone, Mail, MapPin, Calendar, User, Wrench } from 'lucide-react';
import type { QuoteRequest } from '@shared/schema';

export function AdminDashboard() {
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);

  const { data: quoteRequests, isLoading, error } = useQuery<{success: boolean, data: QuoteRequest[]}>({
    queryKey: ['/api/quote-requests'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const requests = quoteRequests?.data || [];
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const recentRequests = requests.filter(r => {
    const requestDate = new Date(r.createdAt);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return requestDate > threeDaysAgo;
  }).length;

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'default' as const,
      contacted: 'secondary' as const,
      quoted: 'outline' as const,
      completed: 'secondary' as const,
    };
    return <Badge variant={variants[status as keyof typeof variants] || 'default'}>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">Error loading quote requests. Please try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome Home Landscaping & Power Washing</p>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">All time quote requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingRequests}</div>
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
                  {requests.slice(0, 5).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{request.firstName} {request.lastName}</p>
                        <p className="text-sm text-gray-600">{request.services.join(', ')}</p>
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
                    const serviceCounts = requests.reduce((acc, request) => {
                      request.services.forEach(service => {
                        acc[service] = (acc[service] || 0) + 1;
                      });
                      return acc;
                    }, {} as Record<string, number>);

                    return Object.entries(serviceCounts)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 6)
                      .map(([service, count]) => (
                        <div key={service} className="flex justify-between items-center">
                          <span className="capitalize">{service.replace('-', ' ')}</span>
                          <Badge variant="secondary">{count} requests</Badge>
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
            requests={requests.filter(r => r.status === 'pending')} 
            onViewRequest={setSelectedRequest}
          />
        </TabsContent>

        <TabsContent value="all">
          <RequestsTable 
            requests={requests} 
            onViewRequest={setSelectedRequest}
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
  onViewRequest 
}: { 
  requests: QuoteRequest[]; 
  onViewRequest: (request: QuoteRequest) => void;
}) {
  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'default' as const,
      contacted: 'secondary' as const,
      quoted: 'outline' as const,
      completed: 'secondary' as const,
    };
    return <Badge variant={variants[status as keyof typeof variants] || 'default'}>{status}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quote Requests</CardTitle>
        <CardDescription>Manage customer quote requests</CardDescription>
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
            {requests.map((request) => (
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
                    {request.services.map(service => (
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
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewRequest(request)}
                  >
                    View Details
                  </Button>
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
  const formatDate = (dateString: string | Date) => {
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
            <CardTitle>Quote Request Details</CardTitle>
            <CardDescription>Request ID: {request.id}</CardDescription>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Name</p>
                <p>{request.firstName} {request.lastName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <a href={`tel:${request.phone}`} className="text-blue-600 hover:text-blue-800">
                  {request.phone}
                </a>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-600">Email</p>
                <a href={`mailto:${request.email}`} className="text-blue-600 hover:text-blue-800">
                  {request.email}
                </a>
              </div>
            </div>
          </div>

          {/* Service Location */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Service Location
            </h3>
            <div className="space-y-2">
              <p><strong>Address:</strong> {request.address}</p>
              <p><strong>City:</strong> {request.city}</p>
              <p><strong>State:</strong> {request.state || 'TX'}</p>
              <p><strong>ZIP:</strong> {request.zip}</p>
            </div>
          </div>

          {/* Services Requested */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Services Requested
            </h3>
            <div className="flex flex-wrap gap-2">
              {request.services.map(service => (
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
                <Badge variant="default">{request.status}</Badge>
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