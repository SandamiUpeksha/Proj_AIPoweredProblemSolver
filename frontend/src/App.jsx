import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/resolve/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problemText: input })
      });

      if (!response.ok) throw new Error('Server error');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Unable to connect to the server. Please ensure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6 font-light">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-light tracking-wide text-gray-800 mb-3">ResolveAI</h1>
          <p className="text-gray-500 font-light text-lg">Your smart relationship assistant</p>
        </header>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-gray-200/50 mb-6">
          <textarea
            className="w-full bg-white/50 border border-gray-300 rounded-3xl p-5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all resize-none font-light"
            placeholder="Tell me what's wrong... (e.g., 'We always argue about chores')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="5"
          />
          
          <button
            onClick={handleAnalyze}
            disabled={loading || !input.trim()}
            className="w-full mt-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-full font-light text-lg hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {loading ? 'Analyzing...' : 'Find Solution 🧠'}
          </button>

          {error && (
            <div className="mt-4 bg-red-50/80 backdrop-blur border border-red-200 rounded-3xl p-4">
              <p className="text-red-600 text-sm font-light">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-gray-200/50 animate-fadeIn">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-light mb-6 shadow-md">
              {result.category}
            </div>

            <h3 className="text-3xl font-light text-gray-800 mb-6">Suggested Solutions:</h3>

            <ul className="space-y-4">
              {result.suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="bg-white/60 backdrop-blur border border-gray-200 rounded-3xl p-6 text-gray-700 leading-relaxed font-light shadow-sm hover:shadow-md transition-shadow"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
