import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_landing_sec = """                <section id="landing" className={`min-h-screen h-[100dvh] md:h-screen w-full relative flex flex-col justify-center bg-[#0a0a0c]`}>
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_60%)] pointer-events-none" />
          <OrganicBackground />
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-28">"""

new_landing_sec = """                <section id="landing" className={`min-h-screen w-full relative flex flex-col justify-center bg-[#0a0a0c]`}>
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_60%)] pointer-events-none" />
          <OrganicBackground />
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center min-h-screen pt-40 pb-24">"""

app = app.replace(old_landing_sec, new_landing_sec)

with open('src/App.tsx', 'w') as f:
    f.write(app)
