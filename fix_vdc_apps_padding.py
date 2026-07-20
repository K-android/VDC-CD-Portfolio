import re

with open('src/components/VDCSection.tsx', 'r') as f:
    app = f.read()

app = app.replace(
    """<div id="vdc-apps" className="pt-16 border-t border-white/10 scroll-mt-24">""",
    """<div id="vdc-apps" className="pt-32 mt-24 border-t border-white/10 scroll-mt-24">"""
)

with open('src/components/VDCSection.tsx', 'w') as f:
    f.write(app)
