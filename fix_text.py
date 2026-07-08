import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# About text
content = content.replace('className={`text-xs ${isArch ? "text-gray-600" : "text-gray-400"}`}', 'className={`text-sm leading-relaxed ${isArch ? "text-gray-600" : "text-gray-400"}`}')

# Cert text
content = content.replace('className={`text-xs ${isArch ? "text-black font-bold" : "text-neon-cyan"}`}', 'className={`text-sm ${isArch ? "text-black font-bold" : "text-neon-cyan"}`}')
content = content.replace('className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider"', 'className="text-xs text-gray-500 mt-1 uppercase tracking-wider"')
content = content.replace('className="text-[10px] text-gray-400 mt-2 leading-relaxed"', 'className="text-xs text-gray-400 mt-2 leading-relaxed"')

# Contact icons
content = content.replace('className={`flex items-center gap-2 hover:underline transition-colors duration-700 text-xs ${isArch ? "text-gray-700" : "text-gray-300 hover:text-neon-cyan"}`}', 'className={`flex items-center gap-2 hover:underline transition-colors duration-700 text-sm ${isArch ? "text-gray-700" : "text-gray-300 hover:text-neon-cyan"}`}')
content = content.replace('className={`flex items-center gap-2 transition-colors duration-700 text-xs ${isArch ? "text-gray-700" : "text-gray-300"}`}', 'className={`flex items-center gap-2 transition-colors duration-700 text-sm ${isArch ? "text-gray-700" : "text-gray-300"}`}')
content = content.replace('<Mail className="w-4 h-4"', '<Mail className="w-5 h-5"')
content = content.replace('<Phone className="w-4 h-4"', '<Phone className="w-5 h-5"')
content = content.replace('<Linkedin className="w-4 h-4"', '<Linkedin className="w-5 h-5"')

# Skills Matrix grid items
content = content.replace('className={`text-[10px] font-bold ${isArch ? "text-black" : "text-gray-200"}`}', 'className={`text-xs font-bold ${isArch ? "text-black" : "text-gray-200"}`}')
content = content.replace('className={`text-[9px] ${isArch ? "text-gray-500" : "text-gray-500"}`}', 'className={`text-[11px] leading-tight ${isArch ? "text-gray-500" : "text-gray-400"}`}')

# Icons in skills matrix
content = content.replace('<Layers className={`w-4 h-4', '<Layers className={`w-5 h-5')
content = content.replace('<Terminal className={`w-4 h-4', '<Terminal className={`w-5 h-5')
content = content.replace('<Hexagon className={`w-4 h-4', '<Hexagon className={`w-5 h-5')
content = content.replace('<Database className={`w-4 h-4', '<Database className={`w-5 h-5')
content = content.replace('<Camera className={`w-4 h-4', '<Camera className={`w-5 h-5')
content = content.replace('<Code className={`w-4 h-4', '<Code className={`w-5 h-5')

# Languages and achievements
content = content.replace('className={`text-[10px] flex flex-wrap gap-x-4 gap-y-1 ${isArch ? "text-gray-600" : "text-gray-400"}`}', 'className={`text-sm flex flex-wrap gap-x-4 gap-y-2 ${isArch ? "text-gray-600" : "text-gray-400"}`}')
content = content.replace('className={`text-[10px] space-y-1 ${isArch ? "text-gray-600" : "text-gray-400"}`}', 'className={`text-sm space-y-2 ${isArch ? "text-gray-600" : "text-gray-400"}`}')

with open('src/App.tsx', 'w') as f:
    f.write(content)
