import re

with open('src/components/ArchSection.tsx', 'r') as f:
    content = f.read()

# Fix imports
if 'Hammer' not in content:
    content = content.replace('from \'lucide-react\';', ', Hammer } from \'lucide-react\';')

old_projects_section = """            {/* ARCH PROJECTS */}
            <div id="arch-works" className="pt-16 border-t border-gray-100 scroll-mt-24">
              <div className="mb-12">
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] mb-4 text-gray-800 font-bold">
                  Section_01 // Projects
                </h2>
                <h3 className="text-lg md:text-xl font-mono uppercase tracking-[0.1em] text-black font-bold">
                  <span className="opacity-40 font-serif">{"{"}</span> CORE_FOLIO_V1.0 <span className="opacity-40 font-serif">{"}"}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {archArsenal.filter(item => item.category !== 'Fabrication').map((item) => (<ProjectCard key={`arch-nf-${item.id}`} 
                    item={item} 
                    isArch={true} 
                    onClick={() => setSelectedArsenalItem(item)} 
                    onShowScript={(scriptUrl: string, title: string) => {
                      setExpandedMedia({
                        src: scriptUrl,
                        isVideo: false,
                        googleDriveId: getDriveId(scriptUrl),
                        alt: `Script: ${title}`
                      });
                    }}
                  />
                ))}
              </div>
            </div>"""

new_projects_section = """            {/* ARCH PROJECTS */}
            <div id="arch-works" className="pt-16 border-t border-gray-100 scroll-mt-24">
              <div className="mb-12">
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] mb-4 text-gray-800 font-bold">
                  Section_01 // Projects
                </h2>
                <h3 className="text-lg md:text-xl font-mono uppercase tracking-[0.1em] text-black font-bold">
                  <span className="opacity-40 font-serif">{"{"}</span> CORE_FOLIO_V1.0 <span className="opacity-40 font-serif">{"}"}</span>
                </h3>
              </div>

              <div className="space-y-16">
                {/* Row 1: The Anchors */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {archArsenal.filter(item => ["ARCH_08", "ARCH_01"].includes(item.id)).map((item) => (<ProjectCard key={`arch-r1-${item.id}`} 
                        item={item} 
                        isArch={true} 
                        onClick={() => setSelectedArsenalItem(item)} 
                        onShowScript={(scriptUrl: string, title: string) => {
                          setExpandedMedia({
                            src: scriptUrl,
                            isVideo: false,
                            googleDriveId: getDriveId(scriptUrl),
                            alt: `Script: ${title}`
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Row 2: The Typology Matrix */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {archArsenal.filter(item => ["ARCH_05", "ARCH_09", "ARCH_02"].includes(item.id)).map((item) => (<ProjectCard key={`arch-r2-${item.id}`} 
                        item={item} 
                        isArch={true} 
                        onClick={() => setSelectedArsenalItem(item)} 
                        onShowScript={(scriptUrl: string, title: string) => {
                          setExpandedMedia({
                            src: scriptUrl,
                            isVideo: false,
                            googleDriveId: getDriveId(scriptUrl),
                            alt: `Script: ${title}`
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>"""

content = content.replace(old_projects_section, new_projects_section)

old_fabrication_section = """            {/* ARCH FABRICATION */}
            <div className="pt-16 border-t border-gray-100 font-serif">
              <div className="mb-12 font-serif">
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] mb-4 text-gray-800 font-bold">
                  Section_02 // Fabrication &amp; Hands-on
                </h2>
                <h3 className="text-lg md:text-xl font-mono uppercase tracking-[0.1em] text-black italic font-bold">
                  <span className="opacity-40">{"<"}</span> PHYSICAL_PROTOTYPING <span className="opacity-40">{">"}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 font-sans">
                {archArsenal.filter(item => item.category === 'Fabrication').map((item) => (<ProjectCard key={`arch-fab-${item.id}`} 
                    item={item} 
                    isArch={true} 
                    onClick={() => setSelectedArsenalItem(item)} 
                    onShowScript={(scriptUrl: string, title: string) => {
                      setExpandedMedia({
                        src: scriptUrl,
                        isVideo: false,
                        googleDriveId: getDriveId(scriptUrl),
                        alt: `Script: ${title}`
                      });
                    }}
                  />
                ))}
              </div>
            </div>"""

new_fabrication_section = """            {/* ARCH FABRICATION */}
            <div className="pt-16 border-t border-gray-100 font-serif">
              <div className="mb-12 font-serif">
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] mb-4 text-gray-800 font-bold">
                  Section_02 // Fabrication &amp; Hands-on
                </h2>
                <h3 className="text-lg md:text-xl font-mono uppercase tracking-[0.1em] text-black italic font-bold">
                  <span className="opacity-40">{"<"}</span> PHYSICAL_PROTOTYPING <span className="opacity-40">{">"}</span>
                </h3>
              </div>

              <div className="flex flex-col border border-gray-200 rounded-xl bg-white overflow-hidden font-sans">
                {archArsenal.filter(item => ["ARCH_06", "ARCH_07", "ARCH_04"].includes(item.id) || item.category === 'Fabrication').map((item: any, index: number, arr: any[]) => (
                  <div 
                    key={`arch-fab-${item.id}`}
                    onClick={() => setSelectedArsenalItem(item)}
                    className={`group cursor-pointer p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors ${index !== arr.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <div className="mt-1">
                      <Hammer className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <h4 className="font-bold text-sm text-gray-800 group-hover:text-black transition-colors">
                        {item.title}
                      </h4>
                      <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">
                        {item.role || item.category}
                      </div>
                      <p className="text-xs text-gray-500 italic font-serif leading-relaxed mt-1 line-clamp-2">
                        {item.details?.overview || item.problem}
                      </p>
                    </div>
                    <div className="hidden sm:flex flex-wrap gap-2 justify-end max-w-[200px]">
                      {item.tags?.slice(0, 3).map((tag: string, i: number) => (
                        <span key={i} className="text-[8px] font-mono px-2 py-0.5 border border-gray-200 text-gray-500 rounded-sm bg-white">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>"""

content = content.replace(old_fabrication_section, new_fabrication_section)

with open('src/components/ArchSection.tsx', 'w') as f:
    f.write(content)
