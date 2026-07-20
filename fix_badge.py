import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_str = """        <div className={`absolute inset-0 transition-opacity duration-700 bg-black/0 group-hover:bg-black/10`} />
        
        {item.scriptUrl && ("""

new_str = """        <div className={`absolute inset-0 transition-opacity duration-700 bg-black/0 group-hover:bg-black/10`} />
        
        {(item.title === "Net-Zero Worker Housing" || item.title === "Recycled Bus Pavilion") && (
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-full border border-yellow-500/30 text-yellow-500 shadow-lg group-hover:border-yellow-400 group-hover:bg-black transition-all duration-500">
            <Award className="w-4 h-4" />
            <span className="text-[9px] font-mono tracking-widest font-bold uppercase">Award Winning</span>
          </div>
        )}

        {item.scriptUrl && ("""

app = app.replace(old_str, new_str)

with open('src/App.tsx', 'w') as f:
    f.write(app)
