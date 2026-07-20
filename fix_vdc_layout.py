import re

with open('src/components/VDCSection.tsx', 'r') as f:
    content = f.read()

old_grid = """            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {bimArsenal.map((item) => (<ProjectCard key={`bim-${item.id}`} 
                  item={item} 
                  isArch={false} 
                  onClick={() => setSelectedArsenalItem(item)} 
                  onShowScript={(scriptUrl: string, title: string) => {
                    setExpandedMedia({
                      src: scriptUrl,
                      isVideo: false,
                      googleDriveId: getDriveId(scriptUrl),
                      alt: `Script: ${title}`
                    });
                  }}
                  onShowVideo={(gifUrl: string, title: string) => {
                    setExpandedMedia({
                      src: gifUrl,
                      isVideo: true,
                      googleDriveId: getDriveId(gifUrl),
                      alt: `Video: ${title}`
                    });
                  }}
                />
              ))}
            </div>"""

new_grid = """            <div className="space-y-16">
              {/* Tier 1: Heavy Hitters */}
              <div>
                <h3 className="text-xl font-sans font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                  <span className="text-[#3B82F6] font-mono text-xs uppercase tracking-widest border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-2 py-0.5 rounded-sm">Tier 1</span>
                  Hero Modules
                </h3>
                <div className="grid grid-cols-1 gap-12">
                  {bimArsenal.filter((item: any) => ["BIM_09", "BIM_02"].includes(item.id)).map((item: any) => (
                    <ProjectCard key={`bim-${item.id}`} 
                      item={item} 
                      isArch={false} 
                      onClick={() => setSelectedArsenalItem(item)} 
                      onShowScript={(scriptUrl: string, title: string) => {
                        setExpandedMedia({ src: scriptUrl, isVideo: false, googleDriveId: getDriveId(scriptUrl), alt: `Script: ${title}` });
                      }}
                      onShowVideo={(gifUrl: string, title: string) => {
                        setExpandedMedia({ src: gifUrl, isVideo: true, googleDriveId: getDriveId(gifUrl), alt: `Video: ${title}` });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Tier 2: Core Data Stack */}
              <div>
                <h3 className="text-xl font-sans font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                  <span className="text-[#00f2ff] font-mono text-xs uppercase tracking-widest border border-[#00f2ff]/30 bg-[#00f2ff]/10 px-2 py-0.5 rounded-sm">Tier 2</span>
                  Core Data Stack
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {bimArsenal.filter((item: any) => ["BIM_03", "BIM_04", "BIM_06"].includes(item.id)).map((item: any) => (
                    <ProjectCard key={`bim-${item.id}`} 
                      item={item} 
                      isArch={false} 
                      onClick={() => setSelectedArsenalItem(item)} 
                      onShowScript={(scriptUrl: string, title: string) => {
                        setExpandedMedia({ src: scriptUrl, isVideo: false, googleDriveId: getDriveId(scriptUrl), alt: `Script: ${title}` });
                      }}
                      onShowVideo={(gifUrl: string, title: string) => {
                        setExpandedMedia({ src: gifUrl, isVideo: true, googleDriveId: getDriveId(gifUrl), alt: `Video: ${title}` });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Tier 3: Experimental Tools */}
              <div>
                <h3 className="text-xl font-sans font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                  <span className="text-gray-400 font-mono text-xs uppercase tracking-widest border border-gray-600/50 bg-gray-800/50 px-2 py-0.5 rounded-sm">Tier 3</span>
                  Automation Lab
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {bimArsenal.filter((item: any) => ["BIM_08", "BIM_07", "BIM_01", "BIM_05"].includes(item.id)).map((item: any) => (
                    <div 
                      key={`tier3-${item.id}`}
                      onClick={() => setSelectedArsenalItem(item)}
                      className="group cursor-pointer border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 p-5 rounded-xl transition-all duration-300 flex flex-col"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-${item.color}/10 text-${item.color}`}>
                          {item.icon}
                        </div>
                        <h4 className="font-sans font-bold text-sm text-gray-200 group-hover:text-white leading-tight">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 line-clamp-2 mt-auto">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>"""

content = content.replace(old_grid, new_grid)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(content)

