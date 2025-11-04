# Too Many Tabs 

A modern, beautiful browser extension that consolidates all your open tabs into a single organized interface. Perfect for reducing memory usage, decluttering your browser, and managing your tab chaos!


### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/TooManyTabs.git
   cd TooManyTabs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the extension**:
   ```bash
   npm run build
   ```

4. **Load in Chrome**:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

5. **Start using**:
   - Right-click on any webpage
   - Choose your Too Many Tabs option!

### Using the Extension

1. **Right-click anywhere** → Select "Display Too Many Tabs" to open the interface
2. **Right-click** → "Save All Tabs" to consolidate open tabs
3. **In the interface** → Select tabs, restore, search, and manage

See [INSTALL.md](./INSTALL.md) for detailed instructions.

## 🛠️ Tech Stack

- **React 19** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Beautiful, responsive styling
- **Vite** - Lightning-fast build tool
- **Chrome Extensions API** - Native browser integration
- **Manifest V3** - Latest extension standard

## 📁 Project Structure

```
TooManyTabs/
├── public/
│   ├── manifest.json          # Extension manifest (V3)
│   ├── background.js          # Service worker
│   └── icons/                 # Extension icons
├── src/
│   ├── App.tsx                # Main interface component
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles
├── dist/                      # Build output (load this!)
├── INSTALL.md                 # Detailed install guide
├── FEATURES.md                # Complete feature list
└── README.md                  # This file
```

## 🎯 Use Cases

- **Tab Hoarding**: Clean up when you have 50+ tabs open
- **Memory Management**: Free up browser memory instantly
- **Project Switching**: Save tabs for different projects
- **Research**: Consolidate research tabs for later
- **Clean Start**: Save work-in-progress tabs before a fresh start

## 🔑 Permissions

- `tabs` - Read and manage browser tabs
- `storage` - Persist saved tab data locally
- `contextMenus` - Add right-click menu options

## 🎨 Screenshots

> TODO: Add later

## 🏗️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for any purpose.

## 🙏 Credits

Inspired by [OneTab](https://www.one-tab.com/) - created with ❤️ for tab hoarders everywhere.

## 🌟 Features Coming Soon only if i see good response

- [ ] Export/Import sessions (JSON)
- [ ] Custom session labels
- [ ] Keyboard shortcuts
- [ ] Tab deduplication
- [ ] Cloud sync (optional)
- [ ] Session expiration
- [ ] Statistics dashboard
- [ ] Tab groups support

---

**Made with ❤️ for people who open too many tabs**

For issues, feature requests, or contributions, please check the repository!
