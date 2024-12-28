import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ComplianceDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Compliance Audit Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to the Compliance Audit System</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceDashboard;