# 🎲 Random String Generator (React)

A simple React app that generates random strings using **React Hooks**.

## 🚀 Steps

1. **Setup**
   - Created project with `create-react-app`.
   - Fixed missing `index.html` in `public/`.
   - Removed unused imports (`logo.svg`, `App.css`).

2. **Implementation**
   - Used `useState` to store the string.
   - Used `useCallback` to memoize the generator function.
   - Used `useEffect` to log whenever the string changes.
   - Rendered a button + string output in `App.js`.

3. **Styling**
   - Added `App.css` for a clean card layout.
   - Gradient background, centered container, styled button, bold string display.

## ✅ Features
- Generates random strings on button click.
- Logs new strings in console.
- Modern UI with CSS.

## 🔮 Improvements
- Custom string length input.
- Character set options.
- Copy to clipboard.
- Password strength meter.