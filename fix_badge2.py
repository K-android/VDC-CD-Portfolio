import re

with open('src/components/ArchSection.tsx', 'r') as f:
    app = f.read()

if 'Award' not in app:
    app = app.replace('from \'lucide-react\';', ', Award } from \'lucide-react\';')

old_str = """                      <h4 className="font-bold text-sm text-gray-800 group-hover:text-black transition-colors">
                        {item.title}
                      </h4>"""

new_str = """                      <h4 className="font-bold text-sm text-gray-800 group-hover:text-black transition-colors flex items-center gap-2">
                        {item.title}
                        {item.title === "Recycled Bus Pavilion" && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 text-yellow-600 rounded-full border border-yellow-500/20">
                            <Award className="w-3 h-3" />
                            <span className="text-[8px] font-mono tracking-widest font-bold uppercase">Award</span>
                          </div>
                        )}
                      </h4>"""

app = app.replace(old_str, new_str)

with open('src/components/ArchSection.tsx', 'w') as f:
    f.write(app)
