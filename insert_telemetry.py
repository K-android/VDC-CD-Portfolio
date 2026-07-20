import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# Add Eye or Monitor to imports if not there
if "Monitor" not in app:
    app = app.replace('} from "lucide-react";', '  Monitor,\n} from "lucide-react";')

old_stats = """            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 mt-12 md:mt-24 border-t border-white/10">
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">11+</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Automation Scripts</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">100%</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">ISO 19650 Compliant</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">Python</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Dynamo & APIs</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">LOD 350</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">MODELING PRECISION</div>
              </div>
            </div>
          </div>
        </section>"""

telemetry_section = """            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 mt-12 md:mt-24 border-t border-white/10">
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">11+</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Automation Scripts</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">100%</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">ISO 19650 Compliant</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">Python</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">Dynamo & APIs</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-[#3B82F6] tracking-tighter mb-1">LOD 350</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">MODELING PRECISION</div>
              </div>
            </div>

            {/* HARDWARE & SOFTWARE TELEMETRY */}
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
            </div>

          </div>
        </section>"""

app = app.replace(old_stats, telemetry_section)

with open('src/App.tsx', 'w') as f:
    f.write(app)
