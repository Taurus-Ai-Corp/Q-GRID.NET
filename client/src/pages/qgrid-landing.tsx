import { ArrowRight, Play, Shield, Globe, Zap, Lock, Cpu, Settings, Mail, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function QGridLanding() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/leads/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setEmail("");
      } else {
        const data = await res.json();
        setSubmitError(data.error || "Failed to subscribe");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ecosystemFeatures = [
    { num: "01", icon: Shield, title: "POST-QUANTUM CRYPTOGRAPHY", desc: "Implementing NIST FIPS 204 (ML-DSA) for digital signatures and FIPS 203 (ML-KEM) for key encapsulation." },
    { num: "02", icon: Globe, title: "HEDERA GOVERNANCE", desc: "Built on the only public network with 17 Fortune 500 governance members. Enterprise credibility." },
    { num: "03", icon: Zap, title: "CRYPTOGRAPHIC AGILITY", desc: "Seamless migration framework from Ed25519 to quantum-resistant standards without downtime." },
    { num: "04", icon: Lock, title: "HEALTHCARE SECURITY", desc: "HIPAA compliant frameworks with ML-DSA signed medical history and immutable audit trails." },
    { num: "05", icon: Cpu, title: "CBDC INFRASTRUCTURE", desc: "Future-proof digital currency platforms compliant with approaching SWIFT 2027 deadlines." },
    { num: "06", icon: Settings, title: "INDUSTRIAL IOT", desc: "Supply chain tracking with authenticity verification and tamper-proof product history." },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navigation */}
      <header className="bg-[#E31837] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter">Q-GRID</span>
            <span className="text-[10px] opacity-70">™ Taurus AI Corp.</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <button className="px-4 py-2 text-sm font-bold hover:bg-white/10 transition-all border border-white/30">
              🏠 HOME
            </button>
            <button onClick={() => setLocation("/app/accounts")} className="px-4 py-2 text-sm font-bold hover:bg-white/10 transition-all">
              👤 ACCOUNTS
            </button>
            <button onClick={() => setLocation("/app/services")} className="px-4 py-2 text-sm font-bold hover:bg-white/10 transition-all">
              📋 SERVICES
            </button>
            <button onClick={() => setLocation("/app/cbdc-service")} className="px-4 py-2 text-sm font-bold bg-black text-white hover:bg-gray-900 transition-all">
              💰 CBDC
            </button>
            <button onClick={() => setLocation("/app/login")} className="px-4 py-2 text-sm font-bold border border-white hover:bg-white hover:text-[#E31837] transition-all flex items-center gap-1">
              ➡️ SIGN IN
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1a1a1a] py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(227, 24, 55, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 24, 55, 0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-[#E31837] text-white text-xs font-bold px-3 py-1 uppercase tracking-wide">
              NIST FIPS 203/204 COMPLIANT
            </span>
            <span className="bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-wide">
              HEDERA HASHGRAPH
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-8">
            <span className="text-white">QUANTUM</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700 line-through decoration-[#E31837]">RESISTANCE</span>
            <br />
            <span className="text-[#E31837]">IS NOW.</span>
          </h1>

          {/* Description Box */}
          <div className="bg-white text-black p-6 max-w-md mb-8">
            <p className="text-lg font-medium leading-relaxed">
              The world's first quantum-resistant blockchain platform. Securing the <span className="font-black">$Trillion</span> economy against the 2030 threat window.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setLocation("/big-bang")}
              className="bg-[#E31837] text-white px-8 py-4 font-black uppercase tracking-wide flex items-center gap-2 hover:bg-red-700 transition-all"
            >
              LAUNCH APP <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLocation("/app/quantum-rupee-platform")}
              className="bg-transparent border-2 border-black text-white px-8 py-4 font-black uppercase tracking-wide hover:bg-white hover:text-black transition-all"
            >
              QUANTUM-RUPEE™
            </button>
          </div>
        </div>
      </section>

      {/* Scrolling Status Bar */}
      <div className="bg-black py-3 border-y border-gray-800 overflow-hidden">
        <div className="flex items-center gap-8 animate-scroll whitespace-nowrap" style={{ transform: `translateX(-${scrollPosition}%)` }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-xs font-mono">
              <span className="text-gray-500">/// SYSTEM STATUS: <span className="text-green-500">SECURE</span></span>
              <span className="text-gray-500">/// ML-DSA: <span className="text-green-500">ACTIVE</span></span>
              <span className="text-gray-500">/// ML-KEM: <span className="text-green-500">ACTIVE</span></span>
              <span className="text-gray-500">/// HEDERA TPS: <span className="text-[#E31837]">10,000+</span></span>
              <span className="text-gray-500">/// FINALITY: <span className="text-[#E31837]">3S</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* The Ecosystem Section - Yellow Background */}
      <section className="bg-[#F5F0E1] text-black py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-6xl font-black mb-4">THE ECOSYSTEM</h2>
          <p className="text-sm font-mono text-gray-600 mb-2">/// ARCHITECTURE_V1.0</p>
          <p className="text-lg mb-12">Deployed on Hedera Hashgraph. Secured by Math.</p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ecosystemFeatures.map((feature, i) => (
              <div key={i} className="bg-white p-6 border border-gray-200 hover:border-[#E31837] transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <feature.icon className="w-8 h-8 text-gray-800 group-hover:text-[#E31837] transition-all" />
                  <span className="text-xs font-mono text-gray-400">{feature.num}</span>
                </div>
                <h3 className="text-lg font-black uppercase mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Overview Section - Black Background */}
      <section className="bg-black py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-2">
                <span className="text-white">STACK</span>
                <br />
                <span className="text-gray-600">OVERVIEW</span>
              </h2>
              <p className="text-gray-400 mb-8">Built for speed, security, and scale.</p>

              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-[#E31837]"></span>
                  <span className="text-sm font-mono">ML-DSA (NIST FIPS 204)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-yellow-500"></span>
                  <span className="text-sm font-mono">ML-KEM (NIST FIPS 203)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-gray-600"></span>
                  <span className="text-sm font-mono">Hedera Consensus Service</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-blue-500"></span>
                  <span className="text-sm font-mono">HYBRID ECDSA+PQC Signing</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500"></span>
                  <span className="text-sm font-mono">React / Wouter / Tailwind</span>
                </li>
              </ul>
            </div>

            {/* Right - Code + Stats */}
            <div>
              {/* Code Block */}
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden mb-6">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <pre className="p-4 text-sm font-mono overflow-x-auto">
                  <code className="text-gray-400">
{`// Quantum Key Generation
const
`}<span className="text-[#E31837]">mldsa</span>{` = new MLDSACrypto("ML-DSA-65");
const
`}<span className="text-yellow-500">keyPair</span>{` = mldsa.generateKeyPair();

// Sign Transaction
const
`}<span className="text-green-500">signature</span>{` = mldsa.sign(keyPair.private, "tx_payload");

> Quantum Security Active...`}
                  </code>
                </pre>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white text-black p-4">
                  <div className="text-3xl font-black">10k+</div>
                  <div className="text-xs uppercase text-gray-500">TPS</div>
                </div>
                <div className="bg-white text-black p-4">
                  <div className="text-3xl font-black">3s</div>
                  <div className="text-xs uppercase text-gray-500">FINALITY</div>
                </div>
                <div className="bg-white text-black p-4">
                  <div className="text-3xl font-black">Low</div>
                  <div className="text-xs uppercase text-gray-500">COST</div>
                </div>
                <div className="bg-[#E31837] text-white p-4">
                  <div className="text-3xl font-black">100%</div>
                  <div className="text-xs uppercase">SAFE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See It In Action Section - Red Background */}
      <section className="bg-[#E31837] py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-white">SEE IT IN ACTION</h2>

          {/* Video Placeholder */}
          <div className="bg-black/20 aspect-video max-w-2xl mx-auto mb-8 flex items-center justify-center rounded-lg border-2 border-white/20 cursor-pointer hover:border-white transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-all">
                <Play className="w-8 h-8 text-[#E31837] ml-1" />
              </div>
              <span className="text-white font-bold uppercase text-sm">WATCH 10MIN DEMO</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setLocation("/app/cbdc-offline-flow")}
              className="bg-transparent border-2 border-white text-white px-6 py-3 font-bold uppercase tracking-wide flex items-center gap-2 hover:bg-white hover:text-[#E31837] transition-all"
            >
              VIEW CBDC OFFLINE ARCHITECTURE <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLocation("/big-bang")}
              className="bg-black text-white px-6 py-3 font-bold uppercase tracking-wide flex items-center gap-2 hover:bg-gray-900 transition-all"
            >
              LAUNCH APP <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#1a1a1a] py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <Mail className="w-10 h-10 text-[#E31837] mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Stay Quantum-Ready</h3>
          <p className="text-gray-400 mb-6 text-sm">Get weekly updates on post-quantum security, CBDC developments, and platform news.</p>
          {submitSuccess ? (
            <div className="flex items-center justify-center gap-2 text-green-500">
              <Check className="w-5 h-5" />
              <span>Successfully subscribed!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black border border-gray-700 focus:border-[#E31837] outline-none text-white font-mono text-sm"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#E31837] text-white font-bold uppercase text-sm hover:bg-red-700 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </button>
            </form>
          )}
          {submitError && <p className="text-red-400 mt-2 text-sm">{submitError}</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h4 className="text-2xl font-black mb-2">Q_GRID</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Securing the future of blockchain infrastructure against the quantum threat. Built on Hedera.
              </p>
            </div>

            {/* Platform Links */}
            <div>
              <h5 className="text-[#E31837] font-bold uppercase text-sm mb-4">Platform</h5>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-all">Quantum Core</a></li>
                <li><a href="#" className="hover:text-white transition-all">Hedera Integration</a></li>
                <li><a href="#" className="hover:text-white transition-all">Healthcare</a></li>
                <li><a href="#" className="hover:text-white transition-all">CBDC</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h5 className="text-[#E31837] font-bold uppercase text-sm mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-all">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-all">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-all">Whitepaper</a></li>
              </ul>
            </div>

            {/* Status */}
            <div>
              <h5 className="text-[#E31837] font-bold uppercase text-sm mb-4">System Status</h5>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-500">All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800 text-xs text-gray-600">
            <span>© 2025 Q_GRID. ALL RIGHTS RESERVED.</span>
            <span className="mt-2 md:mt-0">SYSTEM STATUS: <span className="text-green-500">ONLINE</span></span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
