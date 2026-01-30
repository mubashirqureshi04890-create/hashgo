
import { GoogleGenAI, Type } from "@google/genai";

// 1. Particle Background Logic
const initBackground = () => {
    const canvas = document.getElementById('mining-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
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
        particles = Array.from({ length: Math.min(window.innerWidth / 8, 150) }, () => new Particle());
    };

    const animate = () => {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Grid overlay
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
        const step = 80;
        for(let x=0; x<canvas.width; x+=step) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
        for(let y=0; y<canvas.height; y+=step) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }

        particles.forEach(p => { p.update(); p.draw(); });
        animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();
};

// 2. Data Fetching & UI Rendering
const renderContent = (data) => {
    document.getElementById('app-headline').innerText = data.headline;
    document.getElementById('app-subheadline').innerText = data.subheadline;
    
    const grid = document.getElementById('features-grid');
    grid.innerHTML = data.features.map(f => `
        <div class="group p-8 rounded-2xl border border-white/[0.03] bg-zinc-900/10 hover:bg-zinc-900/30 hover:border-white/10 transition-all duration-500 text-left">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-1.5 h-1.5 bg-white/20 group-hover:bg-white transition-colors rounded-full"></div>
                <h3 class="text-[10px] md:text-[11px] font-orbitron font-bold text-white uppercase tracking-widest">${f.title}</h3>
            </div>
            <p class="text-[11px] md:text-xs text-zinc-500 leading-relaxed font-light">${f.description}</p>
        </div>
    `).join('');
};

const fetchData = async () => {
    const fallback = {
        headline: "PREMIUM MINING ENGINE",
        subheadline: "The industry's most efficient mobile mining utility. High-performance analysis and secure node connectivity.",
        features: [
            { title: "Peak Hashrate", description: "Optimized algorithms for maximum hardware efficiency." },
            { title: "Secure Node", description: "Encrypted communication for safe data transmission." },
            { title: "Smart Metrics", description: "Real-time performance tracking and analytics." }
        ]
    };

    const apiKey = (globalThis).process?.env?.API_KEY;
    if (!apiKey) return renderContent(fallback);

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "Generate a futuristic description for HASHGO mining software in JSON format with 'headline', 'subheadline', and 3 'features' objects (title, description).",
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
        const data = JSON.parse(response.text);
        renderContent(data);
    } catch (e) {
        console.error("Gemini failed, using fallback.", e);
        renderContent(fallback);
    }
};

// 3. Download Simulation
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
        }, 1200);
    });
};

// Start
document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    initDownload();
    fetchData();
});
