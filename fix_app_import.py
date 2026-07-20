import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# Make sure Box is imported from lucide-react if not already
if "Box," not in app and "{ Box " not in app and " Box }" not in app:
    app = re.sub(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"];', r'import {\1, Box} from "lucide-react";', app)

with open('src/App.tsx', 'w') as f:
    f.write(app)
