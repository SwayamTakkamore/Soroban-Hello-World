"use client";

import * as Client from "hello-world";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Loader2, Stars, Rocket } from "lucide-react";
import ParticleSystem from "../components/ParticleSystem";

const contract = new Client.Client({
  ...Client.networks.testnet,
  rpcUrl: "https://soroban-testnet.stellar.org:443",
});

interface StarConfig {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Home() {
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [stars, setStars] = useState<StarConfig[]>([]);

  // Initialize stars on client side only
  useEffect(() => {
    const starConfigs = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 12 + Math.random() * 8,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
    setStars(starConfigs);
  }, []);

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const { result } = await contract.hello({ to: name });
      setMsg(result.join(" ") + "!");
    } catch (error) {
      setMsg("Oops! Something went wrong. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-blue-900 to-cyan-900 overflow-hidden relative">
      {/* Particle System */}
      <ParticleSystem />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Stars */}
        {stars.length > 0 && stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute text-white/20"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          >
            <Stars size={star.size} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Rocket className="text-violet-400" size={40} />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Soroban
            </h1>
            <Sparkles className="text-cyan-400" size={40} />
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Hello World on Stellar
          </motion.p>
          
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-violet-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <form onSubmit={formSubmit} className="space-y-6">
              <div>
                <motion.label
                  className="block text-sm font-semibold text-gray-200 mb-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Enter your name to get a stellar greeting:
                </motion.label>
                
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your awesome name..."
                    required
                  />
                  <motion.div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-violet-400"
                    animate={{ rotate: name ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles size={20} />
                  </motion.div>
                </motion.div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading || !name.trim()}
                className="w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 size={20} />
                    </motion.div>
                    Sending to Stellar...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Greeting
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Response Message */}
        <AnimatePresence>
          {msg && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="mt-8 max-w-md w-full"
            >
              <div className="backdrop-blur-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl p-6 border border-emerald-400/30 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-2xl mb-2"
                >
                  🎉
                </motion.div>
                <motion.p
                  className="text-xl font-semibold text-emerald-100"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {msg}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-400 text-sm mb-2">
            Powered by{" "}
            <motion.span
              className="text-violet-400 font-semibold"
              whileHover={{ scale: 1.1 }}
            >
              Soroban Smart Contracts
            </motion.span>
          </p>
          <motion.div
            className="flex items-center justify-center gap-2 text-xs"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-gray-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <span className="text-gray-400">Created by</span>
            <motion.a
              href="https://x.com/swayam_voidroot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-bold cursor-pointer hover:underline"
              whileHover={{ 
                scale: 1.15,
                textShadow: "0 0 20px rgba(139, 92, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              Swayam_voidroot
            </motion.a>
            <motion.span
              className="text-gray-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              🚀
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}