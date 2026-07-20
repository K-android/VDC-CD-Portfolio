with open('src/index.css', 'r') as f:
    css = f.read()

css = css.replace('--color-neon-cyan: #00f2ff;', '--color-neon-cyan: #FF2E63;')
css = css.replace('rgba(0,242,255,0.2)', 'rgba(255,46,99,0.2)')
css = css.replace('--color-terminal-bg: #0a0a0a;', '--color-terminal-bg: #0b0b0e;')
css = css.replace('--color-terminal-border: #1a1a1a;', '--color-terminal-border: #1c1c24;')

with open('src/index.css', 'w') as f:
    f.write(css)
