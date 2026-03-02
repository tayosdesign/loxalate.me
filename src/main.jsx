import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './restaurant-map-v3.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

4. Click **"Commit changes"** → **"Commit changes"**

---

**Step 4 — Move your `.jsx` file into the `src/` folder**

Your main file is currently sitting at the top level. It needs to move into `src/`.

1. Click on **`restaurant-map-v3.jsx`** in your repo to open it
2. Click the **pencil icon** (✏️) top right to edit it
3. At the top you'll see the filename in an editable box — click it
4. Press **Backspace** to delete the current name, then type: `src/restaurant-map-v3.jsx`
5. GitHub will move it into the `src/` folder automatically
6. Scroll down, click **"Commit changes"** → **"Commit changes"**

---

**After all 4 steps your repo should look like this:**
```
loxalate.me/
├── index.html
├── package.json
└── src/
    ├── main.jsx
    └── restaurant-map-v3.jsx
