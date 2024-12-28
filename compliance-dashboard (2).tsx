import React, { useState } from 'react';
import { 
  Search, Menu, Bell, User,
  AlertTriangle, BarChart, Users,
  FileText, Settings, Calendar,
  HelpCircle, ChevronRight, ChevronLeft,
  FileCheck, MapPin, Globe, Plus,
  Clock, Shield, MessageSquare,
  Instagram, Linkedin, Facebook, Twitter,
  Send, Mail, Eye, Filter
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  auditScores: [
    { date: 'Nov 25', score: 92 },
    { date: 'Dec 2', score: 93 },
    { date: 'Dec 9', score: 91 },
    { date: 'Dec 16', score: 94 },
    { date: 'Dec 23', score: 94 }
  ],
  website: {
    lastCheck: '2 minutes ago',
    status: 'online',
    uptime: '99.9%',
    lastDowntime: 'None in last 30 days',
    requiredDisclosures: {
      total: 12,
      present: 11,
      missing: ['State-specific fee schedule']
    }
  },
  clients: {
    total: 113,
    withAgreements: 108,
    pending: 5,
    byState: [
      { state: 'CA', clients: 28, registered: true },
      { state: 'NY', clients: 22, registered: true },
      { state: 'TX', clients: 18, registered: true },
      { state: 'FL', clients: 15, registered: true }
    ]
  },
  employees: [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Investment Adviser",
      crd: "123456",
      ce_status: "Due in 30 days",
      registrations: ["Series 65", "CFP"],
      state_registrations: ["CA", "NY", "TX"],
      alerts: ["CE Due in 30 days", "U4 Update Required"]
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Senior Adviser",
      crd: "789012",
      ce_status: "Urgent",
      registrations: ["Series 66", "CFA"],
      state_registrations: ["CA", "FL", "IL"],
      alerts: ["CE Overdue", "Form U4 Amendment Needed"]
    }
  ]
};

const ComplianceSystem = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const mockAuditCategories = {
  books_and_records: {
    title: "Books and Records",
    items: [
      { id: "br1", title: "Client Agreements", required: true, status: "complete" },
      { id: "br2", title: "Account Statements", required: true, status: "pending" },
      { id: "br3", title: "Trade Records", required: true, status: "complete" },
      { id: "br4", title: "Fee Calculations", required: true, status: "incomplete" },
      { id: "br5", title: "Investment Policy Statements", required: false, status: "pending" }
    ]
  },
  cybersecurity: {
    title: "Cybersecurity",
    items: [
      { id: "cs1", title: "Incident Response Plan", required: true, status: "complete" },
      { id: "cs2", title: "Access Control Policy", required: true, status: "complete" },
      { id: "cs3", title: "Data Protection Policy", required: true, status: "pending" },
      { id: "cs4", title: "Vendor Due Diligence", required: true, status: "incomplete" }
    ]
  },
  fiduciary: {
    title: "Fiduciary Duty",
    items: [
      { id: "fd1", title: "Investment Management Agreement", required: true, status: "complete" },
      { id: "fd2", title: "Disclosure Documents", required: true, status: "complete" },
      { id: "fd3", title: "Best Interest Documentation", required: true, status: "pending" }
    ]
  },
  marketing: {
    title: "Marketing Compliance",
    items: [
      { id: "mc1", title: "Website Review", required: true, status: "complete" },
      { id: "mc2", title: "Social Media Policy", required: true, status: "pending" },
      { id: "mc3", title: "Performance Advertising", required: true, status: "incomplete" },
      { id: "mc4", title: "Marketing Materials Archive", required: true, status: "complete" }
    ]
  }
};

const sidebarItems = [
    { icon: BarChart, label: 'Dashboard', id: 'dashboard' },
    { icon: Users, label: 'Employees', id: 'employees' },
    { icon: Shield, label: 'Audit', id: 'audit' },
    { icon: FileText, label: 'Documents', id: 'documents' },
    { icon: MessageSquare, label: 'Marketing', id: 'marketing' },
    { icon: Mail, label: 'Email Monitor', id: 'email' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ];

  const TopNav = () => (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <Menu 
            className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder={activeSection === 'employees' ? "Search employees..." : "Search..."}
              className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          {activeSection === 'employees' ? (
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Employee
            </button>
          ) : (
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              Run Audit
            </button>
          )}
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );

  const AuditView = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [reportType, setReportType] = useState('firm');
    const [checkedItems, setCheckedItems] = useState({});

    const toggleItem = (itemId) => {
      setCheckedItems(prev => ({
        ...prev,
        [itemId]: !prev[itemId]
      }));
    };

    const calculateCategoryProgress = (items) => {
      const completed = items.filter(item => item.status === 'complete').length;
      return Math.round((completed / items.length) * 100);
    };

    return (
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-normal">Audit Center</h1>
            <h2 className="text-2xl text-gray-500">Compliance Review & Reports</h2>
          </div>
          <div className="flex gap-4">
            <button 
              className={`px-4 py-2 rounded-lg ${
                reportType === 'firm' 
                  ? 'bg-emerald-50 text-emerald-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setReportType('firm')}
            >
              Firm-Wide
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${
                reportType === 'user' 
                  ? 'bg-emerald-50 text-emerald-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setReportType('user')}
            >
              User-Specific
            </button>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {Object.entries(mockAuditCategories).map(([key, category]) => (
            <Card key={key} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-medium">{category.title}</h3>
                    <p className="text-sm text-gray-500">
                      {category.items.length} compliance items
                    </p>
                  </div>
                  <span className="text-2xl font-medium text-emerald-600">
                    {calculateCategoryProgress(category.items)}%
                  </span>
                </div>
                <div className="space-y-3">
                  {category.items.map(item => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={checkedItems[item.id] || false}
                          onChange={() => toggleItem(item.id)}
                          className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                        />
                        <span className="text-sm">
                          {item.title}
                          {item.required && (
                            <span className="ml-2 text-xs text-red-600">*Required</span>
                          )}
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'complete' 
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-4">Documents Required for SEC/State Audit</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                The following documents should be readily available for regulatory examinations:
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Required Documentation</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                      Form ADV (Parts 1, 2A, 2B)
                    </li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                      Written Policies & Procedures
                    </li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                      Code of Ethics
                    </li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                      Business Continuity Plan
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Additional Records</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                      Trading Records & Account Statements
                    </li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                      Marketing Materials
                    </li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                      Client Correspondence
                    </li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                      Performance Calculation Documentation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const mockDocuments = {
    regulatory: {
      title: "Regulatory Documents",
      items: [
        {
          id: "adv1",
          title: "Form ADV Part 1",
          lastUpdated: "2024-01-15",
          status: "current",
          finraLinked: true,
          sections: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]
        },
        {
          id: "adv2a",
          title: "Form ADV Part 2A",
          lastUpdated: "2024-01-15",
          status: "needs_review",
          finraLinked: true,
          sections: ["Firm Overview", "Services", "Fees", "Methods of Analysis"]
        },
        {
          id: "adv2b",
          title: "Form ADV Part 2B",
          lastUpdated: "2024-01-10",
          status: "current",
          finraLinked: true,
          sections: ["Educational Background", "Disciplinary Information"]
        }
      ]
    },
    policies: {
      title: "Policies & Procedures",
      items: [
        {
          id: "pol1",
          title: "Written Policies & Procedures Manual",
          lastUpdated: "2024-01-20",
          status: "current",
          sections: ["Trading", "Privacy", "Anti-Money Laundering", "Best Execution"]
        },
        {
          id: "pol2",
          title: "Code of Ethics",
          lastUpdated: "2024-01-05",
          status: "needs_review",
          sections: ["Personal Trading", "Gifts & Entertainment", "Confidentiality"]
        },
        {
          id: "pol3",
          title: "Business Continuity Plan",
          lastUpdated: "2023-12-15",
          status: "needs_update",
          sections: ["Emergency Contacts", "Data Backup", "Alternative Locations"]
        }
      ]
    }
  };

  const DocumentsView = () => {
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [aiEditModalOpen, setAiEditModalOpen] = useState(false);
    const [editPrompt, setEditPrompt] = useState('');

    const DocumentEditor = ({ document, section }) => (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              setSelectedDocument(null);
              setSelectedSection(null);
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Documents
          </button>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setAiEditModalOpen(true)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L12 20M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              AI Assist
            </button>
            <button 
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              {editMode ? 'Save Changes' : 'Edit Document'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-medium mb-2">{document.title}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>Last updated: {document.lastUpdated}</span>
            {document.finraLinked && (
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                FINRA Linked
              </span>
            )}
          </div>

          <div className="prose max-w-none">
            {editMode ? (
              <textarea
                className="w-full min-h-[400px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                defaultValue="Document content goes here..."
              />
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg min-h-[400px]">
                Document content goes here...
              </div>
            )}
          </div>
        </div>

        {/* AI Edit Modal */}
        {aiEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">AI-Assisted Edit</h3>
                <button 
                  onClick={() => setAiEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <textarea
                className="w-full h-32 p-3 border border-gray-200 rounded-lg mb-4"
                placeholder="Describe the changes you want to make..."
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
              />
              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setAiEditModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );

    const DocumentsList = () => (
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-normal">Documents</h1>
            <h2 className="text-2xl text-gray-500">Regulatory & Compliance</h2>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              Upload Document
            </button>
          </div>
        </div>

        {Object.entries(mockDocuments).map(([key, category]) => (
          <div key={key} className="space-y-4">
            <h2 className="text-lg font-medium">{category.title}</h2>
            <div className="grid gap-4">
              {category.items.map(document => (
                <Card 
                  key={document.id}
                  className="hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => setSelectedDocument(document)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{document.title}</h3>
                          <p className="text-sm text-gray-500">Last updated: {document.lastUpdated}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {document.finraLinked && (
                          <Shield className="w-5 h-5 text-emerald-500" />
                        )}
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          document.status === 'current'
                            ? 'bg-emerald-100 text-emerald-800'
                            : document.status === 'needs_review'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {document.status === 'current' ? 'Current' : 
                           document.status === 'needs_review' ? 'Needs Review' : 
                           'Update Required'}
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );

    return (
      <div className="p-6">
        {selectedDocument ? (
          <DocumentEditor document={selectedDocument} section={selectedSection} />
        ) : (
          <DocumentsList />
        )}
      </div>
    );
  };

  const mockSocialMedia = {
    posts: [
      {
        id: 1,
        platform: "linkedin",
        content: "Excited to announce our new investment strategy that guarantees returns...",
        date: "2024-01-24",
        author: "Sarah Johnson",
        status: "flagged",
        reason: "Performance guarantee claims",
        url: "https://linkedin.com/post/1"
      },
      {
        id: 2,
        platform: "facebook",
        content: "Check out our latest market analysis and investment opportunities",
        date: "2024-01-23",
        author: "Michael Chen",
        status: "approved",
        url: "https://facebook.com/post/2"
      },
      {
        id: 3,
        platform: "instagram",
        content: "Join our exclusive investment workshop next week!",
        date: "2024-01-22",
        author: "Sarah Johnson",
        status: "pending",
        url: "https://instagram.com/post/3"
      }
    ],
    complianceIssues: [
      "Performance guarantees",
      "Unregistered testimonials",
      "Missing disclaimers",
      "Unverified claims"
    ]
  };

  const MarketingView = () => {
    const [activeTab, setActiveTab] = useState('monitor');
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
      { role: 'assistant', content: 'Hello! I can help you review marketing materials and ensure compliance. You can also ask me questions about marketing regulations.' }
    ]);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSendMessage = () => {
      if (chatMessage.trim()) {
        setChatHistory([...chatHistory, { role: 'user', content: chatMessage }]);
        // Simulate AI response
        setTimeout(() => {
          setChatHistory(prev => [...prev, { 
            role: 'assistant', 
            content: 'Let me help you review that marketing material for compliance...' 
          }]);
        }, 1000);
        setChatMessage('');
      }
    };

    const SocialMediaMonitor = () => (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Social Media Monitor</h2>
          <div className="flex gap-4">
            {[
              { icon: Linkedin, name: 'LinkedIn', color: 'text-blue-600' },
              { icon: Facebook, name: 'Facebook', color: 'text-blue-500' },
              { icon: Instagram, name: 'Instagram', color: 'text-pink-500' },
              { icon: Twitter, name: 'Twitter', color: 'text-blue-400' }
            ].map(platform => (
              <button
                key={platform.name}
                className={`p-2 rounded-lg hover:bg-gray-100 ${platform.color}`}
              >
                <platform.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {mockSocialMedia.posts.map(post => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      post.platform === 'linkedin' ? 'bg-blue-100 text-blue-600' :
                      post.platform === 'facebook' ? 'bg-blue-100 text-blue-500' :
                      'bg-pink-100 text-pink-500'
                    }`}>
                      {post.platform === 'linkedin' ? <Linkedin className="w-5 h-5" /> :
                       post.platform === 'facebook' ? <Facebook className="w-5 h-5" /> :
                       <Instagram className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{post.author}</span>
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{post.content}</p>
                      {post.status === 'flagged' && (
                        <div className="mt-2 p-2 bg-red-50 text-red-800 text-sm rounded-md">
                          <AlertTriangle className="w-4 h-4 inline mr-1" />
                          {post.reason}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    post.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    post.status === 'flagged' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );

    const ComplianceChat = () => (
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50 rounded-lg mb-4">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white border border-gray-200'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-gray-200 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg">
              Upload Document
            </button>
            {selectedFile && (
              <span className="text-sm text-gray-500">
                {selectedFile.name}
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask about marketing compliance or review materials..."
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-normal">Marketing Compliance</h1>
            <h2 className="text-2xl text-gray-500">Social Media & Content Review</h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('monitor')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'monitor'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Social Media Monitor
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'chat'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Compliance Assistant
            </button>
          </div>
        </div>

        {activeTab === 'monitor' ? <SocialMediaMonitor /> : <ComplianceChat />}
      </div>
    );
  };

  const mockEmailData = {
    flaggedEmails: [
      {
        id: 1,
        sender: "Sarah Johnson",
        senderId: "sarah.j",
        manager: "Michael Chen",
        subject: "Investment Performance Update Q4",
        snippet: "Our strategy has consistently outperformed the market...",
        date: "2024-01-24 14:30",
        recipients: ["client.group@example.com"],
        issues: [
          {
            type: "performance_claims",
            description: "Unsubstantiated performance claims without proper disclaimers",
            solution: "Add required performance disclaimers and historical context"
          }
        ],
        status: "pending_review"
      },
      {
        id: 2,
        sender: "James Wilson",
        senderId: "james.w",
        manager: "Michael Chen",
        subject: "Exclusive Investment Opportunity",
        snippet: "Don't miss out on this guaranteed return investment...",
        date: "2024-01-24 11:15",
        recipients: ["potential.investors@example.com"],
        issues: [
          {
            type: "guarantees",
            description: "Claims of guaranteed returns",
            solution: "Remove guarantee claims and add appropriate risk disclosures"
          },
          {
            type: "urgency",
            description: "Creating false sense of urgency",
            solution: "Remove urgency language and present objective information"
          }
        ],
        status: "notification_sent"
      }
    ],
    complianceRules: [
      "No guarantee claims",
      "Required performance disclaimers",
      "Proper risk disclosures",
      "No promissory statements",
      "Accurate credentials"
    ]
  };

  const EmailMonitorView = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    const getStatusColor = (status) => {
      switch (status) {
        case 'notification_sent':
          return 'bg-yellow-100 text-yellow-800';
        case 'pending_review':
          return 'bg-blue-100 text-blue-800';
        case 'resolved':
          return 'bg-emerald-100 text-emerald-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const EmailDetail = ({ email }) => (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setSelectedEmail(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Email List
          </button>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Mark as Resolved
            </button>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
              Resend Notification
            </button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-medium">{email.subject}</h2>
                  <div className="mt-1 space-x-4 text-sm text-gray-500">
                    <span>From: {email.sender}</span>
                    <span>To: {email.recipients.join(', ')}</span>
                    <span>{email.date}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(email.status)}`}>
                  {email.status.replace('_', ' ').charAt(0).toUpperCase() + email.status.slice(1).replace('_', ' ')}
                </span>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{email.snippet}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Compliance Issues</h3>
                {email.issues.map((issue, idx) => (
                  <div key={idx} className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                      <div>
                        <h4 className="font-medium text-red-800">
                          {issue.type.replace('_', ' ').charAt(0).toUpperCase() + issue.type.slice(1).replace('_', ' ')}
                        </h4>
                        <p className="mt-1 text-sm text-red-700">{issue.description}</p>
                        <div className="mt-2 p-3 bg-white rounded border border-red-100">
                          <h5 className="text-sm font-medium text-gray-900">Solution:</h5>
                          <p className="text-sm text-gray-700">{issue.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-medium mb-2">Notification Details</h3>
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Sent to:</strong> {email.sender}, {email.manager}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Time:</strong> {email.date}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    const EmailList = () => (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Flagged Emails</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending_review">Pending Review</option>
                <option value="notification_sent">Notification Sent</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {mockEmailData.flaggedEmails.map(email => (
            <Card 
              key={email.id}
              className="hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => setSelectedEmail(email)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{email.subject}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        From: {email.sender} · To: {email.recipients.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">{email.snippet}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">
                          {email.issues.length} compliance {email.issues.length === 1 ? 'issue' : 'issues'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(email.status)}`}>
                      {email.status.replace('_', ' ').charAt(0).toUpperCase() + email.status.slice(1).replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-500">{email.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );

    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-normal">Email Monitor</h1>
            <h2 className="text-2xl text-gray-500">Compliance Review</h2>
          </div>
        </div>

        {selectedEmail ? (
          <EmailDetail email={selectedEmail} />
        ) : (
          <EmailList />
        )}
      </div>
    );
  };

  const MainContent = () => {
    if (activeSection === 'employees') {
      return selectedEmployee ? (
        <EmployeeDetail employee={selectedEmployee} />
      ) : (
        <EmployeesList />
      );
    }
    if (activeSection === 'audit') {
      return <AuditView />;
    }
    if (activeSection === 'documents') {
      return <DocumentsView />;
    }
    if (activeSection === 'marketing') {
      return <MarketingView />;
    }
    if (activeSection === 'email') {
      return <EmailMonitorView />;
    }
    return <DashboardView />;
  };

  const DashboardView = () => (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-normal">Good afternoon,</h1>
          <h2 className="text-2xl text-gray-500">Compliance Manager</h2>
        </div>
        <div className="flex gap-8 text-right">
          <div>
            <div className="text-sm text-gray-500">Total Clients</div>
            <div className="text-2xl">{mockData.clients.total}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Agreements Complete</div>
            <div className="text-2xl text-emerald-600">
              {Math.round((mockData.clients.withAgreements / mockData.clients.total) * 100)}%
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Website Status</div>
            <div className="text-2xl text-emerald-600">Online</div>
          </div>
        </div>
      </div>

      {/* Website Monitor */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Website Compliance Monitor
              </h2>
              <p className="text-sm text-gray-500">Last checked {mockData.website.lastCheck}</p>
            </div>
            <span className="px-3 py-1 text-sm rounded-full bg-emerald-100 text-emerald-800">
              ONLINE
            </span>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500">Uptime (30 days)</div>
              <div className="text-xl">{mockData.website.uptime}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Required Disclosures</div>
              <div className="text-xl">
                {mockData.website.requiredDisclosures.present}/{mockData.website.requiredDisclosures.total}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Last Downtime</div>
              <div className="text-xl">{mockData.website.lastDowntime}</div>
            </div>
          </div>
          {mockData.website.requiredDisclosures.missing.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm text-yellow-800">
                <strong>Missing Disclosures:</strong> {mockData.website.requiredDisclosures.missing.join(', ')}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Score Trend */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-4">Audit Score Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.auditScores}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  domain={[85, 100]}
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4">
            {['5D', '1M', '6M', 'YTD', '1Y', 'MAX'].map((period) => (
              <button
                key={period}
                className="px-3 py-1 text-sm rounded-md hover:bg-gray-100"
              >
                {period}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Client Agreements Status */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <FileCheck className="w-5 h-5" />
            Client Agreements Status
          </h2>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-500">Total Clients</div>
              <div className="text-xl">{mockData.clients.total}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Complete Agreements</div>
              <div className="text-xl text-emerald-600">{mockData.clients.withAgreements}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Pending Agreements</div>
              <div className="text-xl text-yellow-600">{mockData.clients.pending}</div>
            </div>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${(mockData.clients.withAgreements / mockData.clients.total) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* State Registration Requirements */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            State Registration Requirements
          </h2>
          <div className="space-y-4">
            {mockData.clients.byState.map(state => (
              <div key={state.state} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 text-gray-600 font-medium">{state.state}</div>
                  <div className="text-sm text-gray-500">{state.clients} clients</div>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  state.clients >= 5 && !state.registered
                    ? 'bg-red-100 text-red-800'
                    : state.clients >= 5 && state.registered
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {state.clients >= 5 
                    ? (state.registered ? 'Properly Registered' : 'Registration Required')
                    : 'Registration Not Required'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employee Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Employee Overview</h2>
            <button 
              onClick={() => setActiveSection('employees')}
              className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              View All Employees
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {mockData.employees.map(employee => (
              <div 
                key={employee.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setActiveSection('employees');
                  setSelectedEmployee(employee);
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.title}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  employee.ce_status === 'Urgent' 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {employee.ce_status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const EmployeesList = () => (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-normal">Employees</h1>
      </div>

      <div className="grid gap-4">
        {mockData.employees.map(employee => (
          <Card 
            key={employee.id}
            className="hover:shadow-sm transition-shadow cursor-pointer"
            onClick={() => setSelectedEmployee(employee)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.title}</p>
                    <p className="text-sm text-gray-500">CRD #{employee.crd}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    employee.ce_status === 'Urgent' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {employee.ce_status}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const EmployeeDetail = ({ employee }) => (
    <div className="p-6 space-y-6">
      <button 
        onClick={() => setSelectedEmployee(null)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Employees
      </button>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-gray-600" />
        </div>
        <div>
          <h1 className="text-2xl font-medium">{employee.name}</h1>
          <p className="text-gray-500">{employee.title} · CRD #{employee.crd}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-4">Registrations</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-500 mb-2">Professional</h3>
                <div className="flex flex-wrap gap-2">
                  {employee.registrations.map((reg, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-2">State Registrations</h3>
                <div className="flex flex-wrap gap-2">
                  {employee.state_registrations.map((state, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {state}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-4">Active Alerts</h2>
            <div className="space-y-2">
              {employee.alerts.map((alert, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-yellow-50 text-yellow-800 rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">{alert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-4">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 rounded-full bg-emerald-500" />
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSelectedEmployee(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-4 left-4">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
            <HelpCircle className="w-5 h-5" />
            {isSidebarOpen && <span>Help Center</span>}
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default ComplianceSystem;