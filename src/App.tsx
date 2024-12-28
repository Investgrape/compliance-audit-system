import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Audit System</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Welcome to your compliance management dashboard.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;