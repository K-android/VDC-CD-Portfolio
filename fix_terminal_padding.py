import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    """<ParallaxSection id="terminal" index={visibleSections.indexOf('terminal')} setActiveSection={setActiveSection}>
          <motion.div""",
    """<ParallaxSection id="terminal" index={visibleSections.indexOf('terminal')} setActiveSection={setActiveSection}>
          <motion.div
            className="w-full pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto\""""
)
app = app.replace(
    """className="w-full"
          >""",
    """>"""
)

with open('src/App.tsx', 'w') as f:
    f.write(app)
