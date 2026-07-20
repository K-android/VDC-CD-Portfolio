import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# Make project cards look premium
old_card_classes = """      className={`group relative overflow-hidden border transition-all duration-700 cursor-pointer flex flex-col h-full ${
        isArch 
        ? "border-gray-100 bg-white hover:border-black hover:shadow-2xl hover:shadow-black/5" 
        : "border-terminal-border bg-black/40 hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,255,255,0.05)]"
      }`}"""
new_card_classes = """      className={`group relative rounded-2xl overflow-hidden border transition-all duration-700 cursor-pointer flex flex-col h-full ${
        isArch 
        ? "border-gray-200 bg-white hover:border-black hover:shadow-2xl hover:shadow-black/5" 
        : "border-white/5 bg-[#111113] hover:border-white/20 hover:shadow-2xl hover:shadow-black/50"
      }`}"""
app = app.replace(old_card_classes, new_card_classes)

# Remove scanner effect
scanner = """        {/* Engineering Scanner Effect */}
        {!isArch && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan/30 shadow-[0_0_10px_rgba(0,255,255,0.5)] opacity-0 group-hover:opacity-100 group-hover:animate-scan z-10" />
        )}"""
app = app.replace(scanner, "")

# Soften the overlay
old_overlay = """        <div className={`absolute inset-0 transition-opacity duration-700 ${isArch ? "bg-black/5 opacity-0 group-hover:opacity-100" : "bg-neon-cyan/5 opacity-0 group-hover:opacity-100"}`} />"""
new_overlay = """        <div className={`absolute inset-0 transition-opacity duration-700 bg-black/0 group-hover:bg-black/10`} />"""
app = app.replace(old_overlay, new_overlay)

# Fix fonts in the card body
old_body = """        <div className={`p-5 md:p-6 flex flex-col flex-grow border-t transition-colors duration-700 ${isArch ? "border-gray-100" : "border-terminal-border"}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className={`text-[10px] font-mono tracking-widest uppercase mb-2 ${isArch ? "text-gray-500" : "text-neon-cyan"}`}>
                {item.id} // {item.metric}
              </div>
              <h3 className={`text-xl font-bold tracking-tight mb-2 ${isArch ? "text-gray-900" : "text-white"}`}>{item.title}</h3>
            </div>"""

new_body = """        <div className={`p-5 md:p-6 flex flex-col flex-grow border-t transition-colors duration-700 ${isArch ? "border-gray-100" : "border-white/5"}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className={`text-[10px] font-sans font-bold tracking-widest uppercase mb-2 ${isArch ? "text-gray-500" : "text-[#FF2E63]"}`}>
                {item.id} — {item.metric}
              </div>
              <h3 className={`text-xl font-sans font-bold tracking-tight mb-2 ${isArch ? "text-gray-900" : "text-white"}`}>{item.title}</h3>
            </div>"""
app = app.replace(old_body, new_body)

with open('src/App.tsx', 'w') as f:
    f.write(app)
