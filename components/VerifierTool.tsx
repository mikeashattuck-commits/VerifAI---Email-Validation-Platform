import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle, ShieldCheck, Server, Mail, Zap, Loader2 } from 'lucide-react';
import { verifyEmail } from '../services/verifier';
import { VerificationResult, ValidationStatus } from '../types';

export const VerifierTool: React.FC = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await verifyEmail(email);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-10 shadow-2xl">
        <form onSubmit={handleVerify} className="relative mb-8">
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-500 transition-all shadow-inner">
            <Mail className="ml-4 w-6 h-6 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter an email to verify (e.g., elon@tesla.com)..."
              className="w-full bg-transparent px-4 py-4 text-lg text-white placeholder-slate-500 outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="m-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Verify
                </>
              )}
            </button>
          </div>
          {/* Disclaimer for demo */}
          <p className="mt-2 text-xs text-slate-500 text-center">
            Powered by Gemini AI &amp; Real-time DNS Analysis. No emails are stored.
          </p>
        </form>

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Result Card */}
            <div className={`p-6 rounded-xl border mb-6 flex items-start gap-4 ${
              result.status === ValidationStatus.VALID 
                ? 'bg-green-900/20 border-green-500/30' 
                : result.status === ValidationStatus.WARNING
                ? 'bg-yellow-900/20 border-yellow-500/30'
                : 'bg-red-900/20 border-red-500/30'
            }`}>
              {result.status === ValidationStatus.VALID && <CheckCircle className="w-10 h-10 text-green-500 shrink-0" />}
              {result.status === ValidationStatus.WARNING && <AlertTriangle className="w-10 h-10 text-yellow-500 shrink-0" />}
              {result.status === ValidationStatus.INVALID && <XCircle className="w-10 h-10 text-red-500 shrink-0" />}
              
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className={`text-2xl font-bold ${
                    result.status === ValidationStatus.VALID ? 'text-green-400' : 
                    result.status === ValidationStatus.WARNING ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {result.status === ValidationStatus.VALID ? 'Valid Email' : 
                     result.status === ValidationStatus.WARNING ? 'Risky Email' : 'Invalid Email'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-slate-400">Trust Score:</span>
                    <div className="w-32 h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          result.score > 75 ? 'bg-green-500' : result.score > 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.score}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-white">{result.score}/100</span>
                  </div>
                </div>
                
                <p className="mt-2 text-slate-300 leading-relaxed">
                  {result.aiAnalysis || "Analysis complete."}
                </p>

                {result.didYouMean && (
                  <div className="mt-4 p-3 bg-slate-900/50 rounded border border-brand-500/30 flex items-center gap-2">
                    <Search className="w-4 h-4 text-brand-400" />
                    <span className="text-sm text-slate-300">
                      Did you mean <strong className="text-brand-400 cursor-pointer hover:underline" onClick={() => {
                        setEmail(result.didYouMean || '');
                        // Optional: Trigger verify immediately
                      }}>{result.didYouMean}</strong>?
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-700">
                <h4 className="text-slate-400 text-sm uppercase font-semibold mb-4 flex items-center gap-2">
                  <Server className="w-4 h-4" /> SMTP &amp; DNS Status
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Format Syntax</span>
                    {result.formatValid ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">MX Records Found</span>
                    {result.mxFound ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-2 bg-slate-950 p-2 rounded">
                    {result.mxRecords && result.mxRecords.length > 0 ? (
                      result.mxRecords.slice(0, 2).map((mx, i) => (
                        <div key={i} className="truncate" title={mx}>{mx}</div>
                      ))
                    ) : (
                      "No MX records detected"
                    )}
                    {result.mxRecords && result.mxRecords.length > 2 && (
                      <div className="text-slate-600">+{result.mxRecords.length - 2} more...</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-700">
                <h4 className="text-slate-400 text-sm uppercase font-semibold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Risk Analysis
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Disposable Address</span>
                    {result.disposable ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Role-Based Account</span>
                    {result.roleAccount ? <AlertTriangle className="w-5 h-5 text-yellow-500" /> : <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Domain Reputation</span>
                     {/* Simplified visual logic for reputation based on score */}
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      result.score > 80 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {result.score > 80 ? 'HIGH' : result.score > 50 ? 'MODERATE' : 'LOW'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};