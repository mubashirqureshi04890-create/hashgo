
import { GoogleGenAI, Type } from "@google/genai";

// --- Background Logic ---
const initMiningBackground = () => {
    const canvas = document.getElementById('mining-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = Array.from({ length: 120 }, () => new Particle());
    };

    const animate = () => {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
        for(let i=0; i<canvas.width; i+=80) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); ctx.stroke(); }
        for(let i=0; i<canvas.height; i+=80) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(canvas.width,i); ctx.stroke(); }

        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();
};

// --- Content System ---
const updateUI = (data) => {
    const headlineEl = document.getElementById('app-headline');
    const subheadlineEl = document.getElementById('app-subheadline');
    const gridEl = document.getElementById('features-grid');

    if (data.headline) headlineEl.innerText = data.headline;
    if (data.subheadline) subheadlineEl.innerText = data.subheadline;

    if (data.features) {
        gridEl.innerHTML = data.features.map(f => `
            <div class="p-8 rounded-2xl border border-white/[0.03] bg-zinc-900/10 hover:bg-zinc-900/30 transition-all duration-500 text-left">
                <div class="h-1 w-8 bg-zinc-800 mb-4 group-hover:bg-white transition-all"></div>
                <h3 class="text-[10px] font-orbitron font-bold text-white uppercase tracking-widest mb-2">${f.title}</h3>
                <p class="text-[11px] text-zinc-500 leading-relaxed">${f.description}</p>
            </div>
        `).join('');
    }
};

const loadContent = async () => {
    const fallback = {
        headline: "PREMIUM MINING ENGINE",
        subheadline: "The industry's most efficient mobile mining utility. Optimized for high-performance hardware analysis.",
        features: [
            { title: "Peak Efficiency", description: "Hardware-level optimization for maximum mining output." },
            { title: "Secure Nodes", description: "Encrypted end-to-end communication for node security." },
            { title: "Real-time Stats", description: "Live tracking of hashrate and network connectivity." }
        ]
    };

    // Safe way to get API_KEY on Vercel to avoid "blank screen"
    const apiKey = (globalThis).process?.env?.API_KEY;
    if (!apiKey) return updateUI(fallback);

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "Generate a futuristic description for HASHGO mining software. Output JSON with headline, subheadline, and 3 features.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        headline: { type: Type.STRING },
                        subheadline: { type: Type.STRING },
                        features: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    description: { type: Type.STRING }
                                }
                            }
                        }
                    },
                    required: ["headline", "subheadline", "features"]
                }
            }
        });
        updateUI(JSON.parse(response.text));
    } catch (e) {
        updateUI(fallback);
    }
};

// --- Interaction Logic ---
const initDownload = () => {
    const btn = document.getElementById('download-btn');
    const text = document.getElementById('btn-text');
    const loader = document.getElementById('btn-loader');

    btn.addEventListener('click', () => {
        text.classList.add('hidden');
        loader.classList.remove('hidden');
        btn.disabled = true;

        setTimeout(() => {
            const a = document.createElement('a');
            a.href = 'apk/hashgo_v1.0.0.apk';
            a.download = 'hashgo_v1.0.0.apk';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            text.classList.remove('hidden');
            loader.classList.add('hidden');
            btn.disabled = false;
        }, 1500);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initMiningBackground();
    initDownload();
    loadContent();
});
