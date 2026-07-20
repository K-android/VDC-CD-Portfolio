import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

if " Box," not in app and " Box " not in app:
    app = app.replace('} from "lucide-react";', '  Box,\n} from "lucide-react";')

with open('src/App.tsx', 'w') as f:
    f.write(app)
