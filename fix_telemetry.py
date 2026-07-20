import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    "const [terminalMode, setTerminalMode] = useState<'bim' | 'arch'>('bim');",
    "const [terminalMode, setTerminalMode] = useState<'bim' | 'arch'>('bim');\n  const [activeTelemetry, setActiveTelemetry] = useState(0);"
)

old_telemetry = """            {/* HARDWARE & SOFTWARE TELEMETRY */}
            <div className="pt-16 mt-16 md:mt-24 border-t border-white/10 w-full mb-12">
              <h2 className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-[#3B82F6] mb-8 uppercase">
                // Hardware & Software Telemetry
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 md:pb-20">
                
                {/* Card 1 */}
                <div className="border border-white/10 bg-[#0a0a0c]/80 p-6 rounded-xl hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-bold text-gray-200 text-sm md:text-base tracking-wide">1. BIM & VDC Core Engine</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Revit', 'Navisworks Manage', 'Vectorworks', 'ISO 19650 Standards', '5D Quantity Harvesting'].map(t => (
                      <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] md:text-[11px] font-mono text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card 2 */}
                <div className="border border-white/10 bg-[#0a0a0c]/80 p-6 rounded-xl hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-bold text-gray-200 text-sm md:text-base tracking-wide">2. Automation & Runtime API</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'Dynamo', 'Revit API core', 'JSON Data Serialization', 'Script Automation'].map(t => (
                      <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] md:text-[11px] font-mono text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card 3 */}
                <div className="border border-white/10 bg-[#0a0a0c]/80 p-6 rounded-xl hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg">
                      <Component className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-bold text-gray-200 text-sm md:text-base tracking-wide">3. Computational Geometry Suite</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Rhino 3D', 'Grasshopper', 'Wallacei', 'Galapagos', 'Ladybug Tools', 'Rhino.Inside.Revit'].map(t => (
                      <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] md:text-[11px] font-mono text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card 4 */}
                <div className="border border-white/10 bg-[#0a0a0c]/80 p-6 rounded-xl hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-bold text-gray-200 text-sm md:text-base tracking-wide">4. Full-Stack Systems (Web)</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind CSS', 'Node.js REST APIs', 'Firestore Database', 'Web Hosting (Vercel)'].map(t => (
                      <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] md:text-[11px] font-mono text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card 5 */}
                <div className="border border-white/10 bg-[#0a0a0c]/80 p-6 rounded-xl hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-bold text-gray-200 text-sm md:text-base tracking-wide">5. Reality Capture & Rendering</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['D5 Render', 'Twinmotion', 'Enscape', 'Adobe Creative Suite', 'Stable Diffusion Prompting'].map(t => (
                      <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] md:text-[11px] font-mono text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>"""

telemetry_data = """  const telemetryDomains = [
    {
      id: 1,
      title: "BIM & VDC Core Engine",
      icon: <Layers className="w-4 h-4" />,
      pills: ['Revit', 'Navisworks Manage', 'Vectorworks', 'ISO 19650 Standards', '5D Quantity Harvesting']
    },
    {
      id: 2,
      title: "Automation & Runtime API",
      icon: <Terminal className="w-4 h-4" />,
      pills: ['Python', 'Dynamo', 'Revit API core', 'JSON Data Serialization', 'Script Automation']
    },
    {
      id: 3,
      title: "Computational Geometry Suite",
      icon: <Component className="w-4 h-4" />,
      pills: ['Rhino 3D', 'Grasshopper', 'Wallacei', 'Galapagos', 'Ladybug Tools', 'Rhino.Inside.Revit']
    },
    {
      id: 4,
      title: "Full-Stack Systems (Web)",
      icon: <Cpu className="w-4 h-4" />,
      pills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js REST APIs', 'Firestore Database', 'Web Hosting (Vercel)']
    },
    {
      id: 5,
      title: "Reality Capture & Rendering",
      icon: <Monitor className="w-4 h-4" />,
      pills: ['D5 Render', 'Twinmotion', 'Enscape', 'Adobe Creative Suite', 'Stable Diffusion Prompting']
    }
  ];"""

if "telemetryDomains =" not in app:
    app = app.replace(
        "const [activeTelemetry, setActiveTelemetry] = useState(0);",
        "const [activeTelemetry, setActiveTelemetry] = useState(0);\n" + telemetry_data
    )


new_telemetry = """            {/* HARDWARE & SOFTWARE TELEMETRY */}
            <div className="pt-16 mt-16 md:mt-24 border-t border-white/10 w-full mb-12">
              <h2 className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-[#3B82F6] mb-8 uppercase">
                // Hardware & Software Telemetry
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 md:pb-20">
                
                {/* Left Column: Domain List */}
                <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-2">
                  {telemetryDomains.map((domain, idx) => {
                    const isActive = activeTelemetry === idx;
                    return (
                      <button
                        key={domain.id}
                        onClick={() => setActiveTelemetry(idx)}
                        className={`w-full flex items-center justify-between p-4 text-left transition-all duration-300 border-l-2 ${
                          isActive 
                            ? "bg-[#3B82F6]/10 border-[#3B82F6] text-white" 
                            : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`${isActive ? "text-[#3B82F6]" : "text-gray-600"}`}>
                            {domain.icon}
                          </span>
                          <span className="font-mono text-[11px] md:text-xs tracking-wider uppercase">
                            0{domain.id} // {domain.title}
                          </span>
                        </div>
                        {isActive && <ChevronRight className="w-4 h-4 text-[#3B82F6]" />}
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Active Domain Data */}
                <div className="md:col-span-7 lg:col-span-8 flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTelemetry}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full border border-white/5 bg-zinc-900/30 p-8 md:p-12 rounded-xl backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-4 mb-8">
                         <div className="p-3 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg">
                           {telemetryDomains[activeTelemetry].icon}
                         </div>
                         <h3 className="font-sans font-bold text-gray-200 text-lg md:text-xl tracking-wide">
                           {telemetryDomains[activeTelemetry].title}
                         </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {telemetryDomains[activeTelemetry].pills.map(t => (
                          <span key={t} className="px-4 py-2 bg-black/40 border border-white/10 rounded-md text-[11px] md:text-xs font-mono text-gray-300 shadow-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>"""

app = app.replace(old_telemetry, new_telemetry)

with open('src/App.tsx', 'w') as f:
    f.write(app)
