# Installation & Usage Guide

Your Too Many Tabs extension is ready to use! 🎉

## Quick Setup

1. **Build the extension** (if not already built):
   ```bash
   npm run build
   ```

2. **Open Chrome Extensions page**:
   - Go to `chrome://extensions/` or
   - Click the three dots menu → More tools → Extensions

3. **Enable Developer Mode**:
   - Toggle the switch in the top-right corner

4. **Load the extension**:
   - Click "Load unpacked"
   - Select the `dist` folder from this project
   - The extension icon will appear in your toolbar

5. **Start using it!**:
   - Right-click on any webpage
   - You'll see new options:
     - **Display Too Many Tabs** - Opens the main interface
     - **Save All Tabs** - Saves all tabs from current window
     - **Save This Tab** - Saves just the current tab

## How to Use

### 🖱️ Context Menu (Right-Click)

**On any webpage**, right-click to access:

1. **Display Too Many Tabs**
   - Opens the full interface in a new tab
   - View all your saved sessions
   - Search, restore, and manage tabs

2. **Save All Tabs to Too Many Tabs**
   - Consolidates all tabs from current window
   - Automatically closes them to free memory
   - Creates a new session

3. **Save This Tab to Too Many Tabs**
   - Saves only the current tab
   - Useful for cherry-picking important tabs
   - Closes the tab after saving

### 📱 Main Interface

When you click "Display Too Many Tabs", you get:

**Header Section:**
- Live stats (sessions count, total tabs saved)
- Search bar to find specific tabs
- Current open tabs indicator
- "Save All Tabs" button

**Session Cards:**
- Each session shows number of tabs and timestamp
- **Restore All** - Open all tabs from a session
- **Select All** - Select all tabs in a session
- **Restore Selected** - Open only selected tabs
- **Delete** - Remove entire session

**Individual Tabs:**
- Click to select/deselect (checkbox)
- Click title or "Open" to restore a single tab
- Hover to see "Delete" option
- Favicons for easy identification

### 🎨 UI Features

- **Beautiful Design**: Modern gradient cards with smooth animations
- **Dark Mode**: Automatic dark mode support
- **Responsive**: Works on all screen sizes
- **Animations**: Subtle hover effects and transitions
- **Loading States**: Visual feedback during operations

### ⚡ Keyboard Shortcuts

- Click tab to select/deselect
- Click outside to deselect all
- Use search to quickly find tabs

## Development Mode

To develop and test changes:

```bash
npm run dev
```

Then rebuild after making changes:

```bash
npm run build
```

**IMPORTANT**: After rebuilding, you must reload the extension in Chrome:
- Go to `chrome://extensions/`
- Click the reload icon on the Too Many Tabs extension

## Troubleshooting

**Context menu not appearing?**
- Make sure you right-click on a webpage (not the extension icon)
- Reload the extension if you just installed it

**Tabs not saving?**
- Check browser console for errors (F12 → Console)
- Make sure you have tabs permission enabled

**Interface not opening?**
- Click "Display Too Many Tabs" from context menu
- Check that `index.html` exists in dist folder

**Data disappeared?**
- All data is stored locally in Chrome storage
- Check chrome://settings/clearBrowserData if you cleared data
- Each rebuild creates a fresh extension

## Pro Tips

1. **Quick Save**: Use "Save All Tabs" when you have many tabs open
2. **Selective Restore**: Select specific tabs to restore only what you need
3. **Search**: Use search to quickly find specific tabs across all sessions
4. **Delete All**: Use "Delete All" button in header to start fresh
5. **Favorites**: Keep important tabs by not deleting sessions

## Features Overview

✅ **Context Menu Integration** - Easy right-click access  
✅ **Save All Tabs** - One-click consolidation  
✅ **Save Single Tab** - Cherry-pick important tabs  
✅ **Restore Options** - All, selected, or individual  
✅ **Search & Filter** - Find tabs instantly  
✅ **Multi-Select** - Restore only what you need  
✅ **Beautiful UI** - Modern, responsive design  
✅ **Dark Mode** - Automatic theme support  
✅ **Persistent Storage** - Data survives restarts  
✅ **Live Stats** - See your tab count  
✅ **Smart Timestamps** - Relative time display  

Enjoy your decluttered browser! 🚀
