import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Key, Copy, CheckCircle, Activity, Shield, AlertTriangle } from 'lucide-react';

const data = [
  { name: 'Mon', reqs: 4000 },
  { name: 'Tue', reqs: 3000 },
  { name: 'Wed', reqs: 2000 },
  { name: 'Thu', reqs: 2780 },
  { name: 'Fri', reqs: 1890 },
  { name: 'Sat', reqs: 2390 },
  { name: 'Sun', reqs: 3490 },
];

export const Dashboard: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  const apiKey = "sk_live_51Mz...9A2q"; // Mock key

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-white">Developer Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Total Verifications</h3>
            <Activity className="w-5 h-5 text-brand-400" />
          </div>
          <p className="text-3xl font-bold text-white">24,592</p>
          <p className="text-sm text-green-400 mt-2">+12% from last week</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Avg. Latency</h3>
            <Shield className="w-5 h-5 text-brand-400" />
          </div>
          <p className="text-3xl font-bold text-white">142ms</p>
          <p className="text-sm text-slate-400 mt-2">Global edge network</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Spam Blocked</h3>
            <AlertTriangle className="w-5 h-5 text-brand-400" />
          </div>
          <p className="text-3xl font-bold text-white">8,203</p>
          <p className="text-sm text-slate-400 mt-2">Disposable & risky domains</p>
        </div>
      </div>

      {/* API Key Section */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
          <Key className="w-5 h-5 text-brand-400" />
          Your API Key
        </h3>
        <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-lg border border-slate-700">
          <code className="flex-1 font-mono text-slate-300 overflow-hidden text-ellipsis">
            {apiKey}
          </code>
          <button 
            onClick={copyKey}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors border border-slate-600"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="text-sm text-slate-400 mt-3">
          This key has full access to the Email Verification API. Keep it safe.
        </p>
      </div>

      {/* Usage Chart */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-xl font-semibold mb-6 text-white">API Usage (Last 7 Days)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReqs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                itemStyle={{ color: '#38bdf8' }}
              />
              <Area type="monotone" dataKey="reqs" stroke="#38bdf8" fillOpacity={1} fill="url(#colorReqs)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};