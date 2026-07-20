import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# I need to close the `div` right before `</header>`
app = app.replace("        </div>\n      </header>", "        </div>\n        </div>\n      </header>")

with open('src/App.tsx', 'w') as f:
    f.write(app)
