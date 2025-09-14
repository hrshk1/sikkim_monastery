import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">You are Offline</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We're sorry, but the page you are trying to access is not available for offline use.</p>
          <p className="mt-4">Please connect to the internet to view this page.</p>
        </CardContent>
      </Card>
    </div>
  );
}
