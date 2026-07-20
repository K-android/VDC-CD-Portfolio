import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_landing = """          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center min-h-screen pt-40 pb-24">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tighter text-white leading-[1.05] mb-6">"""

new_landing = """          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center min-h-screen pt-52 md:pt-64 pb-24">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-black tracking-tighter text-white leading-[1.1] mb-6">"""

app = app.replace(old_landing, new_landing)

with open('src/App.tsx', 'w') as f:
    f.write(app)
