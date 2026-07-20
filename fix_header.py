import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_header = """            <header className={`fixed top-0 w-full z-[60] backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center bg-[#0a0a0c]/80`}>
        <div className="flex items-center gap-6 pl-4 md:pl-6 lg:pl-8">
          <div className="flex items-center font-sans text-lg md:text-xl font-bold tracking-tight text-white uppercase">
            <span className="text-[#00f2ff] font-mono font-light text-xl opacity-70">{`>`}</span>
            <span className="text-[#00f2ff] font-mono font-light text-xl -ml-0.5 mt-2 opacity-70">{`_`}</span>
            <span className="ml-3 tracking-wide">KARTHIKRAJ_<span className="text-[#3B82F6]">NADAR</span></span>
          </div>
        </div>"""

new_header = """      <header className={`fixed top-0 w-full z-[60] backdrop-blur-xl border-b border-white/5 bg-[#0a0a0c]/80`}>
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center font-sans text-lg md:text-xl font-bold tracking-tight text-white uppercase">
              <span className="text-[#00f2ff] font-mono font-light text-xl opacity-70">{`>`}</span>
              <span className="text-[#00f2ff] font-mono font-light text-xl -ml-0.5 mt-2 opacity-70">{`_`}</span>
              <span className="ml-3 tracking-wide">KARTHIKRAJ_<span className="text-[#3B82F6]">NADAR</span></span>
            </div>
          </div>"""

app = app.replace(old_header, new_header)

with open('src/App.tsx', 'w') as f:
    f.write(app)
