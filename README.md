🎙 Voice Sticky Notes

A voice-first sticky notes web app that lets you speak your thoughts and automatically converts them into organized, searchable, draggable notes — with folders, keyboard shortcuts, and smart voice commands.

Built using pure HTML, CSS, and JavaScript. No backend. No APIs. Fully open-source.

✨ Features
🗣 Voice-powered notes

Real-time speech-to-text (Chrome Web Speech API)

Continuous dictation with auto-restart

Smart command detection

📝 Smart editing

Auto bullet formatting

Voice command: “next point”

Undo / Redo (voice + keyboard)

Select all / Copy / Paste (voice + keyboard)

🗂 Folder system

Create folders

Notes automatically saved to active folder

Empty folders persist after refresh

Folder filtering

🧲 Sticky notes board

Drag & drop notes

Expand on click

Delete individual notes

Monochrome modern UI

🔍 Search

Instant text search across visible notes

⌨ Keyboard shortcuts
Shortcut	Action
Ctrl + Z	Undo
Ctrl + S	Save note
Ctrl + C	Copy
Ctrl + V	Paste
💾 Offline storage

Notes and folders stored in localStorage

Works offline (except speech recognition)

🧠 Voice Commands
Say	Action
post	Save note
clear note	Clear editor
undo / redo	Undo / Redo
delete note	Delete selected note
select all	Select all text
copy	Copy
paste	Paste
next point	New bullet point
🏗 Tech Stack

HTML5

CSS3 (custom monochrome UI)

Vanilla JavaScript (ES modules)

Web Speech API

LocalStorage

No frameworks. No backend.

📁 Project Structure
.
├── index.html
├── main.css
└── js/
    ├── app.js
    ├── speech.js
    ├── commands.js
    ├── storage.js
    └── folders.js

🚀 Getting Started
1. Clone the repo
git clone https://github.com/yourusername/voice-sticky-notes.git

2. Open locally

Use VS Code Live Server or open index.html directly:

npx live-server


Chrome is recommended for best speech support.

🌐 Deploy to GitHub Pages

Push to GitHub

Go to Settings → Pages

Select branch: main

Folder: /root

Save

Your app will be live at:

https://yourusername.github.io/voice-sticky-notes/

⚠ Limitations

Speech recognition requires internet

Works best on Chrome

Browser-dependent accuracy

LocalStorage size limits (~5MB)

🛣 Future Ideas

Offline Whisper (WASM)

Folder sidebar

Drag notes between folders

IndexedDB storage

Note export (Markdown / TXT)

PWA install support

Dark / light toggle

Cloud sync

🤝 Contributing

Pull requests are welcome!

If you add features, keep the project:

Framework-free

Client-only

Privacy-first

📜 License

MIT License — free to use, modify, and distribute.

🙌 Credits

Built with ❤️ using the Web Speech API and vanilla JavaScript.
