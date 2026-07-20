import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_str = """                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}"""

new_str = """                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}"""

app = app.replace(old_str, new_str)

with open('src/App.tsx', 'w') as f:
    f.write(app)
