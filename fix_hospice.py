import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# Let's remove the second gallery block completely for ARCH_05 so it's not duplicated
old_gal = """                {/* Full-width Technical Gallery */}
                {selectedArsenalItem.details?.images && selectedArsenalItem.details.images.length > 0 && ("""

new_gal = """                {/* Full-width Technical Gallery */}
                {selectedArsenalItem.id !== "ARCH_05" && selectedArsenalItem.details?.images && selectedArsenalItem.details.images.length > 0 && ("""

app = app.replace(old_gal, new_gal)

with open('src/App.tsx', 'w') as f:
    f.write(app)
