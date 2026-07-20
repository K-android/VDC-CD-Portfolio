import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# Add Workflow, GitMerge to import if not present
if 'Workflow,' not in app:
    app = app.replace('  Code\n} from "lucide-react";', '  Code,\n  Workflow,\n  GitMerge\n} from "lucide-react";')

old_tags = """        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag, idx) => {
              const isProfessional = tag === "Professional Experience" || tag === "IMK Internship" || tag === "Freelance";
              const isCompetition = tag === "Competition";
              return (
                <span key={`${item.id}-${tag}-${idx}`} className={`text-[8px] md:text-[9px] font-mono px-2 py-0.5 border transition-colors duration-700 ${
                  isArch 
                    ? isProfessional ? "bg-black text-white border-black font-bold" 
                      : isCompetition ? "bg-amber-100 text-amber-800 border-amber-400 font-bold"
                      : "border-gray-100 text-gray-400" 
                    : isProfessional ? "bg-neon-cyan/20 text-neon-cyan border-white/10 font-bold" 
                      : isCompetition ? "bg-amber-500/20 text-amber-400 border-amber-500/50 font-bold"
                      : "border-white/10 text-gray-500 group-hover:text-[#6366F1]/70 group-hover:border-white/10"
                }`}>
                  {tag}
                </span>
              );
            })}
          </div>"""

new_tags = """        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag, idx) => {
              const isProfessional = tag === "Professional Experience" || tag === "IMK Internship" || tag === "Freelance";
              const isCompetition = tag === "Competition";
              
              let TagIcon = null;
              const tagLower = tag.toLowerCase();
              if (tagLower.includes('revit')) TagIcon = Layers;
              else if (tagLower.includes('navisworks')) TagIcon = GitMerge;
              else if (tagLower.includes('dynamo') || tagLower.includes('python')) TagIcon = Workflow;
              else if (tagLower.includes('excel') || tagLower.includes('sql') || tagLower.includes('json')) TagIcon = Database;
              else if (tagLower.includes('rhino') || tagLower.includes('grasshopper')) TagIcon = Activity;
              else if (tagLower.includes('iso')) TagIcon = ShieldCheck;
              else if (tagLower.includes('api') || tagLower.includes('c#')) TagIcon = Code2;

              if (isProfessional || isCompetition) {
                 return (
                  <span key={`${item.id}-${tag}-${idx}`} className={`text-[8px] md:text-[9px] font-mono px-2 py-0.5 border transition-colors duration-700 ${
                    isArch 
                      ? isProfessional ? "bg-black text-white border-black font-bold" 
                        : isCompetition ? "bg-amber-100 text-amber-800 border-amber-400 font-bold"
                        : "border-gray-100 text-gray-400" 
                      : isProfessional ? "bg-neon-cyan/20 text-neon-cyan border-white/10 font-bold" 
                        : isCompetition ? "bg-amber-500/20 text-amber-400 border-amber-500/50 font-bold"
                        : "border-white/10 text-gray-500 group-hover:text-[#6366F1]/70 group-hover:border-white/10"
                  }`}>
                    {tag}
                  </span>
                 );
              }
              
              return (
                <div key={`${item.id}-${tag}-${idx}`} 
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-mono tracking-wider transition-all duration-300 ${
                    isArch 
                      ? "bg-gray-50/50 border-gray-200 text-gray-600 hover:border-black hover:text-black hover:bg-white"
                      : "bg-[#0a0a0c]/80 border-white/5 text-zinc-500 group-hover:border-white/20 group-hover:text-white"
                  }`}
                >
                  {TagIcon && (
                    <TagIcon className={`w-3 h-3 transition-colors duration-300 ${
                      isArch ? "text-gray-400 group-hover:text-black" : "text-blue-400/70 group-hover:text-[#6366F1]"
                    }`} />
                  )}
                  {tag}
                </div>
              );
            })}
          </div>"""

app = app.replace(old_tags, new_tags)

with open('src/App.tsx', 'w') as f:
    f.write(app)
