import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_stack = """const SoftwareStack = ({ isArch }: { isArch: boolean }) => {
  const archTools = [
    { name: "Rhino / Grasshopper", category: "Computational" },
    { name: "Autodesk Revit", category: "BIM" },
    { name: "D5 Render / Enscape", category: "Visualization" },
    { name: "Adobe Creative Suite", category: "Design" },
    { name: "Midjourney / Stable Diffusion", category: "AI Imagery" },
    { name: "Physical Prototyping", category: "Fabrication" },
  ];

  const bimTools = [
    { name: "Autodesk Revit", category: "Modeling" },
    { name: "Navisworks Manage", category: "Coordination" },
    { name: "Dynamo / Python", category: "Automation" },
    { name: "Excel / SQL", category: "Data" },
    { name: "Rhino / Grasshopper", category: "Computational" },
    { name: "ISO 19650 Standards", category: "Management" },
  ];

  const tools = isArch ? archTools : bimTools;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      key={isArch ? 'arch' : 'bim'}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-wrap justify-center lg:justify-start gap-3"
    >
      {tools.map((tool, idx) => (
        <motion.div 
          key={`${isArch ? 'arch' : 'bim'}-${tool.name}-${idx}`}
          variants={item}
          className={`px-3 py-1 border text-[10px] font-mono transition-all duration-700 ${
            isArch 
            ? "border-gray-100 bg-gray-50 text-gray-500" 
            : "border-white/5 bg-terminal-border/20 text-neon-cyan"
          }`}
        >
          {tool.name} <span className="opacity-30 ml-1">[{tool.category}]</span>
        </motion.div>
      ))}
    </motion.div>
  );
};"""

new_stack = """const SoftwareStack = ({ isArch }: { isArch: boolean }) => {
  const archTools = [
    { name: "Rhino / Grasshopper", category: "Computational", icon: Activity },
    { name: "Autodesk Revit", category: "BIM", icon: Layers },
    { name: "D5 Render / Enscape", category: "Visualization", icon: MonitorPlay },
    { name: "Adobe Creative Suite", category: "Design", icon: Component },
    { name: "Midjourney / Stable Diffusion", category: "AI Imagery", icon: Globe },
    { name: "Physical Prototyping", category: "Fabrication", icon: Hammer },
  ];

  const bimTools = [
    { name: "Autodesk Revit", category: "Modeling", icon: Layers },
    { name: "Navisworks Manage", category: "Coordination", icon: GitMerge },
    { name: "Dynamo / Python", category: "Automation", icon: Workflow },
    { name: "Excel / SQL", category: "Data", icon: Database },
    { name: "Rhino / Grasshopper", category: "Computational", icon: Activity },
    { name: "ISO 19650 Standards", category: "Management", icon: ShieldCheck },
  ];

  const tools = isArch ? archTools : bimTools;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      key={isArch ? 'arch' : 'bim'}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-wrap justify-center lg:justify-start gap-2.5"
    >
      {tools.map((tool, idx) => {
        const Icon = tool.icon;
        return (
          <motion.div 
            key={`${isArch ? 'arch' : 'bim'}-${tool.name}-${idx}`}
            variants={item}
            className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-mono tracking-wider transition-all duration-300 cursor-default ${
              isArch 
              ? "bg-gray-50/50 border-gray-200 text-gray-600 hover:border-black hover:text-black hover:bg-white"
              : "bg-[#0a0a0c]/80 border-white/5 text-zinc-500 hover:border-white/20 hover:text-white"
            }`}
          >
            {Icon && (
              <Icon className={`w-3.5 h-3.5 transition-colors duration-300 ${
                isArch ? "text-gray-400 group-hover:text-black" : "text-blue-400/70 group-hover:text-[#6366F1]"
              }`} />
            )}
            <span>{tool.name}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
};"""

app = app.replace(old_stack, new_stack)

with open('src/App.tsx', 'w') as f:
    f.write(app)
