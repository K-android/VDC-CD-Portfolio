import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# We need to replace the entire WorkflowFlowchart component.
# It starts at `const WorkflowFlowchart = ({`
# And ends at `      </div>\n    </div>\n  );\n};\n`

start_idx = content.find("const WorkflowFlowchart = ({")
end_str = "    </div>\n  );\n};\n"
end_idx = content.find(end_str, start_idx) + len(end_str)

if start_idx == -1 or end_idx == -1:
    print("Could not find WorkflowFlowchart")
    exit(1)

new_flowchart = """const WorkflowFlowchart = ({ 
  projectId, 
  steps, 
  isArch,
  color 
}: { 
  projectId: string; 
  steps: string[]; 
  activeSimStep?: number; 
  isSimRunning?: boolean; 
  isArch: boolean;
  color: string;
}) => {
  const data = getFlowchartData(projectId, steps);

  return (
    <div className={`font-mono text-xs rounded-lg p-4 md:p-6 transition-all duration-700 ${
      isArch 
        ? "bg-gray-50/50 border border-gray-150 text-gray-800" 
        : "bg-[#04070a] border border-terminal-border/20 text-gray-400"
    }`}>
      {/* Mobile/Vertical View */}
      <div className="flex flex-col items-center gap-2 lg:hidden w-full">
        {/* Start Node */}
        <div className="flex flex-col items-center w-full max-w-sm">
          <div 
            className={`px-4 py-3 rounded-xl border text-center shadow-sm w-full ${
              isArch
                ? "border-black text-black font-semibold bg-white"
                : "border-emerald-500/85 text-emerald-400 bg-emerald-950/15"
            }`}
          >
            <div className="text-[8px] opacity-75 uppercase tracking-widest font-bold">START</div>
            <div className="text-[11px] font-bold mt-1">{data.start.title}</div>
            <div className="text-[9.5px] opacity-80 font-normal leading-relaxed mt-0.5">{data.start.subtitle}</div>
          </div>
          <FlowArrow isArch={isArch} horizontal={false} />
        </div>

        {/* Nodes */}
        {data.nodes.map((node, i) => (
          <React.Fragment key={`node-${i}`}>
            <div
              className={`border rounded-xl p-3.5 transition-all duration-500 relative overflow-hidden w-full max-w-sm ${
                isArch
                  ? "border-black bg-white text-black"
                  : "border-terminal-border/30 bg-[#080b0e] text-gray-300"
              }`}
            >
              <div className="flex justify-between items-start gap-1 mb-1.5">
                <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                  isArch 
                    ? "bg-black text-white" 
                    : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                }`}>
                  PHASE 0{i + 1}
                </span>
                
                {node.metric && (
                  <span className={`text-[8px] font-bold ${
                    isArch ? "text-stone-500" : "text-neon-orange"
                  }`}>
                    {node.metric}
                  </span>
                )}
              </div>
              <div className="flex gap-2 items-start">
                <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
                  isArch
                    ? "border-black text-black bg-white"
                    : "border-terminal-border/40 text-gray-400 bg-black/40"
                }`}>
                  <Cpu className="w-3 h-3" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className={`text-[11px] font-bold tracking-tight ${
                    isArch ? "text-black" : "text-gray-100"
                  }`}>
                    {node.title}
                  </h4>
                  <p className={`text-[10px] leading-relaxed mt-1 font-normal ${
                    isArch ? "text-gray-600" : "text-gray-400"
                  }`}>
                    {node.subtitle}
                  </p>
                </div>
              </div>
            </div>
            <FlowArrow isArch={isArch} horizontal={false} />
          </React.Fragment>
        ))}

        {/* End Node */}
        <div 
          className={`px-4 py-3 rounded-xl border text-center w-full max-w-sm ${
            isArch
              ? "border-black bg-white text-black font-semibold shadow"
              : "border-emerald-500/60 bg-emerald-950/30 text-emerald-300"
          }`}
        >
          <div className="text-[8px] opacity-75 uppercase tracking-widest font-bold">DISPATCH</div>
          <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1.5 mt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{data.end.title}</span>
          </div>
          <div className="text-[9.5px] opacity-80 font-normal leading-relaxed mt-1">{data.end.desc || data.end.subtitle}</div>
        </div>
      </div>

      {/* Desktop View - 2 Rows of 3 elements */}
      <div className="hidden lg:flex flex-col gap-6 w-full">
        {/* Row 1: Start -> Phase 1 -> Phase 2 */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {/* Start Node */}
          <div className="relative">
            <div 
              className={`h-full min-h-[110px] flex flex-col justify-center p-4 rounded-xl border text-center shadow transition-all duration-700 ${
                isArch
                  ? "border-black text-black font-semibold bg-white"
                  : "border-emerald-500/60 bg-emerald-950/10 text-emerald-300"
              }`}
            >
              <div className="text-[8px] opacity-75 uppercase tracking-widest font-bold mb-1">START</div>
              <div className="text-[11px] font-bold text-emerald-400 tracking-tight">{data.start.title}</div>
              <div className="text-[10px] opacity-90 font-normal mt-1 leading-relaxed">{data.start.subtitle}</div>
            </div>
            
            {/* Connector Arrow pointing right */}
            <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 flex items-center justify-center">
              <ChevronRight className={`w-4 h-4 shadow-sm bg-[#04070a] border rounded-full p-0.5 ${
                isArch ? "text-black border-stone-300 bg-white" : "text-neon-cyan border-terminal-border/20 bg-black"
              }`} />
            </div>
          </div>

          {/* Phase 01 */}
          <div className="relative">
            <div className={`h-full min-h-[110px] border rounded-xl p-4 transition-all duration-500 flex flex-col justify-between ${
              isArch ? "border-black bg-white text-black" : "border-terminal-border/30 bg-[#080b0e] text-gray-300"
            }`}>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                    isArch ? "bg-black text-white" : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                  }`}>PHASE 01</span>
                  {data.nodes[0]?.metric && (
                    <span className={`text-[8px] font-mono font-bold uppercase ${isArch ? "text-stone-500" : "text-neon-orange"}`}>
                      {data.nodes[0].metric}
                    </span>
                  )}
                </div>
                <h4 className={`text-[11px] font-bold tracking-tight ${isArch ? "text-black font-sans" : "text-white font-mono"}`}>
                  {data.nodes[0]?.title}
                </h4>
                <p className={`text-[10px] leading-relaxed mt-1 font-normal ${isArch ? "text-stone-600" : "text-gray-400"}`}>
                  {data.nodes[0]?.subtitle}
                </p>
              </div>
            </div>
            
            {/* Connector Arrow pointing right */}
            <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 flex items-center justify-center">
              <ChevronRight className={`w-4 h-4 shadow-sm bg-[#04070a] border rounded-full p-0.5 ${
                isArch ? "text-black border-stone-300 bg-white" : "text-neon-cyan border-terminal-border/20 bg-black"
              }`} />
            </div>
          </div>

          {/* Phase 02 */}
          <div>
            <div className={`h-full min-h-[110px] border rounded-xl p-4 transition-all duration-500 flex flex-col justify-between ${
              isArch ? "border-black bg-white text-black" : "border-terminal-border/30 bg-[#080b0e] text-gray-300"
            }`}>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                    isArch ? "bg-black text-white" : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                  }`}>PHASE 02</span>
                  {data.nodes[1]?.metric && (
                    <span className={`text-[8px] font-mono font-bold uppercase ${isArch ? "text-stone-500" : "text-neon-orange"}`}>
                      {data.nodes[1].metric}
                    </span>
                  )}
                </div>
                <h4 className={`text-[11px] font-bold tracking-tight ${isArch ? "text-black font-sans" : "text-white font-mono"}`}>
                  {data.nodes[1]?.title}
                </h4>
                <p className={`text-[10px] leading-relaxed mt-1 font-normal ${isArch ? "text-stone-600" : "text-gray-400"}`}>
                  {data.nodes[1]?.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Downward Connection Line */}
        <div className="flex justify-between items-center px-6 -my-2.5">
          <div className="h-[1px] flex-1 border-t border-dashed border-terminal-border/20 mr-4 opacity-50"></div>
          <div className="flex items-center gap-2 font-mono text-[9px] opacity-50 px-3 py-1 rounded bg-black/40 border border-terminal-border/10 text-neon-cyan uppercase">
            <span>CONTINUE PROCESSING</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
          <div className="h-[1px] flex-1 border-t border-dashed border-terminal-border/20 ml-4 opacity-50"></div>
        </div>

        {/* Row 2: Phase 3 -> Phase 4 -> Dispatch / End */}
        <div className="grid grid-cols-3 gap-4 w-full">
          
          {/* Phase 03 */}
          <div className="relative">
            <div className={`h-full min-h-[110px] border rounded-xl p-4 transition-all duration-500 flex flex-col justify-between ${
              isArch ? "border-black bg-white text-black" : "border-terminal-border/30 bg-[#080b0e] text-gray-300"
            }`}>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                    isArch ? "bg-black text-white" : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                  }`}>PHASE 03</span>
                  {data.nodes[2]?.metric && (
                    <span className={`text-[8px] font-mono font-bold uppercase ${isArch ? "text-stone-500" : "text-neon-orange"}`}>
                      {data.nodes[2].metric}
                    </span>
                  )}
                </div>
                <h4 className={`text-[11px] font-bold tracking-tight ${isArch ? "text-black font-sans" : "text-white font-mono"}`}>
                  {data.nodes[2]?.title}
                </h4>
                <p className={`text-[10px] leading-relaxed mt-1 font-normal ${isArch ? "text-stone-600" : "text-gray-400"}`}>
                  {data.nodes[2]?.subtitle}
                </p>
              </div>
            </div>
            
            {/* Connector Arrow pointing right */}
            <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 flex items-center justify-center">
              <ChevronRight className={`w-4 h-4 shadow-sm bg-[#04070a] border rounded-full p-0.5 ${
                isArch ? "text-black border-stone-300 bg-white" : "text-neon-cyan border-terminal-border/20 bg-black"
              }`} />
            </div>
          </div>

          {/* Phase 04 */}
          <div className="relative">
            <div className={`h-full min-h-[110px] border rounded-xl p-4 transition-all duration-500 flex flex-col justify-between ${
              isArch ? "border-black bg-white text-black" : "border-terminal-border/30 bg-[#080b0e] text-gray-300"
            }`}>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                    isArch ? "bg-black text-white" : "bg-terminal-border/10 text-neon-cyan border border-terminal-border/20"
                  }`}>PHASE 04</span>
                  {data.nodes[3]?.metric && (
                    <span className={`text-[8px] font-mono font-bold uppercase ${isArch ? "text-stone-500" : "text-neon-orange"}`}>
                      {data.nodes[3].metric}
                    </span>
                  )}
                </div>
                <h4 className={`text-[11px] font-bold tracking-tight ${isArch ? "text-black font-sans" : "text-white font-mono"}`}>
                  {data.nodes[3]?.title}
                </h4>
                <p className={`text-[10px] leading-relaxed mt-1 font-normal ${isArch ? "text-stone-600" : "text-gray-400"}`}>
                  {data.nodes[3]?.subtitle}
                </p>
              </div>
            </div>
            
            {/* Connector Arrow pointing right */}
            <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 flex items-center justify-center">
              <ChevronRight className={`w-4 h-4 shadow-sm bg-[#04070a] border rounded-full p-0.5 ${
                isArch ? "text-black border-stone-300 bg-white" : "text-neon-cyan border-terminal-border/20 bg-black"
              }`} />
            </div>
          </div>

          {/* Dispatch End Node */}
          <div>
            <div 
              className={`h-full min-h-[110px] flex flex-col justify-between p-4 rounded-xl border transition-all duration-500 ${
                isArch
                  ? "border-black bg-white text-black font-semibold shadow"
                  : "border-emerald-500/60 bg-emerald-950/20 text-emerald-300"
              }`}
            >
              <div>
                <div className="text-[8px] opacity-75 uppercase tracking-widest font-bold mb-1.5">FINAL DISPATCH</div>
                <div className="text-[12px] font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-tight">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{data.end.title}</span>
                </div>
                <p className={`text-[10px] leading-relaxed mt-1.5 font-normal opacity-90 ${isArch ? "text-stone-600" : "text-stone-400"}`}>
                  {data.end.desc || data.end.subtitle}
                </p>
              </div>
              <div className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900 border-dashed w-max mt-2">
                TRANSIT: LOGIC VERIFIED
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
"""

new_content = content[:start_idx] + new_flowchart + content[end_idx:]

with open('src/App.tsx', 'w') as f:
    f.write(new_content)
