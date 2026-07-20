import React, { useEffect, useRef } from 'react';

export const OrganicFluidNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setSize();
    window.addEventListener('resize', setSize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx!.fill();
        
        ctx!.shadowBlur = 10;
        ctx!.shadowColor = 'rgba(0, 0, 0, 0.2)';
      }
    }

    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 1 - (dist / 120);
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = 1 - (distMouse / 150);
          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          
          const force = (150 - distMouse) / 150;
          p.vx -= (dxMouse / distMouse) * force * 0.02;
          p.vy -= (dyMouse / distMouse) * force * 0.02;
          
          const maxSpeed = 1.5;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > maxSpeed) {
            p.vx = (p.vx / speed) * maxSpeed;
            p.vy = (p.vy / speed) * maxSpeed;
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply opacity-70"
    />
  );
};
