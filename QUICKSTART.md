# Quick Start Guide

## 📋 Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd React-App
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

Output will be in `dist/` folder

---

## 🎨 Features

### Authentication
- ✅ Login page with validation
- ✅ Sign up with password confirmation
- ✅ Password strength indicator
- ✅ Form validation and error messages
- ✅ Session persistence

### Weather App
- ✅ Search weather by city
- ✅ Recent searches tracking
- ✅ Popular cities grid
- ✅ Detailed weather metrics
- ✅ Responsive design

### Theme
- ✅ Dark/Light mode toggle
- ✅ Persisted theme preference
- ✅ Smooth transitions

---

## 📁 Project Structure

```
React-App/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── store/            # Zustand state stores
│   ├── hooks/            # Custom hooks
│   ├── data/             # Mock data
│   ├── App.tsx           # Main app
│   ├── main.tsx          # Entry point
│   └── index.css         # Tailwind styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── index.html
```

---

## 🔑 Key Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router v6** - Routing
- **Vite** - Build tool

---

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🔗 Routes

- `/` - Auth page (login/signup)
- `/auth` - Auth page
- `/weather` - Weather app (protected)

---

## 🎯 Common Tasks

### Modify Validation Rules
Edit `src/pages/AuthPage.tsx`:
```typescript
const PASSWORD_MIN_LENGTH = 8  // Change this
```

### Add New Cities
Edit `src/data/cities.ts`:
```typescript
export const MOCK_CITIES = {
  'new-city': { ... }
}
```

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { ... }
}
```

### Connect Real Weather API
Edit `src/store/weatherStore.ts`:
```typescript
const response = await fetch(`api.openweathermap.org/...`)
```

---

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Ensure types are installed
npm install --save-dev @types/react @types/react-dom
```

---

## 📚 Documentation

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [Vite](https://vitejs.dev)
- [React Router](https://reactrouter.com)

---

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

### Docker Deployment
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## ✨ Best Practices

1. ✅ Always use React hooks in functional components
2. ✅ Keep components small and focused
3. ✅ Use TypeScript for type safety
4. ✅ Centralize state with Zustand
5. ✅ Use Tailwind utilities instead of CSS files
6. ✅ Add proper error boundaries
7. ✅ Lazy load routes for performance
8. ✅ Test components thoroughly

---

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Run `npm run lint`
4. Test thoroughly
5. Submit pull request

---

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review the code comments
3. Check console for errors
4. Review the optimization report

---

**Happy coding! 🎉**
