import React from 'react';
import { Terminal, Copy } from 'lucide-react';

export const ApiDocs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Terminal className="w-8 h-8 text-brand-400" />
        <h2 className="text-3xl font-bold text-white">API Documentation</h2>
      </div>

      <div className="space-y-12">
        {/* Section 1: Overview */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-4">Verification Endpoint</h3>
          <p className="text-slate-400 mb-4">
            Perform real-time email verification. This endpoint checks syntax, DNS existence, disposable providers, and uses AI for reputation scoring.
          </p>
          <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
            <div className="flex items-center px-4 py-2 border-b border-slate-700 bg-slate-800/50">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 mr-2">GET</span>
              <code className="text-sm text-slate-300 font-mono">https://api.verifai.com/v1/check</code>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-slate-300">
{`curl -X GET "https://api.verifai.com/v1/check?email=elon@tesla.com" \\
  -H "Authorization: Bearer sk_live_..."`}
              </pre>
            </div>
          </div>
        </section>

        {/* Section 2: Response */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-4">Response Object</h3>
          <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
            <pre className="text-sm font-mono text-blue-300">
{`{
  "email": "elon@tesla.com",
  "status": "valid",
  "score": 98,
  "details": {
    "is_disposable": false,
    "is_role_account": false,
    "mx_records": true,
    "smtp_check": true
  },
  "ai_analysis": {
    "verdict": "Likely a legitimate corporate address.",
    "typo_suggestion": null
  }
}`}
            </pre>
          </div>
        </section>

        {/* Section 3: Errors */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-4">Error Codes</h3>
          <div className="overflow-hidden rounded-lg border border-slate-700">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-800 text-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Code</th>
                  <th className="px-6 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 bg-slate-900">
                <tr>
                  <td className="px-6 py-4 font-mono">400 Bad Request</td>
                  <td className="px-6 py-4">Missing email parameter or invalid format.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">401 Unauthorized</td>
                  <td className="px-6 py-4">Invalid or missing API key.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">429 Too Many Requests</td>
                  <td className="px-6 py-4">Rate limit exceeded (100 req/sec for Free tier).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};