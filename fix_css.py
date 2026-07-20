with open('src/index.css', 'r') as f:
    css = f.read()

# Make sure standard imports come after tailwindcss but actually before any other CSS.
# In Tailwind v4, @import "tailwindcss" must be first, but URL imports can be next.
# Oh, it said @import rules must precede all rules.
import_statement = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');"
css = css.replace(import_statement, "")
css = import_statement + "\n" + css

with open('src/index.css', 'w') as f:
    f.write(css)
