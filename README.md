# 🏥 Panadol Platform Client

[![CI/CD Pipeline](https://github.com/mhdirfanpn/panadol-platform-client/actions/workflows/ci.yml/badge.svg)](https://github.com/mhdirfanpn/panadol-platform-client/actions/workflows/ci.yml)
[![Code Quality](https://github.com/mhdirfanpn/panadol-platform-client/actions/workflows/code-quality.yml/badge.svg)](https://github.com/mhdirfanpn/panadol-platform-client/actions/workflows/code-quality.yml)

A modern medical appointment booking system frontend built with React, TypeScript, and Material-UI.

## 🚀 Features

- **User Management** - Create, view, update, and manage users
- **Doctor Management** - Onboard and manage doctors with specializations
- **Dashboard** - Real-time statistics and analytics
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Type-Safe** - Built with TypeScript for better developer experience

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Material-UI 7.3.6** - Component library
- **React Router 7.10.1** - Client-side routing
- **Axios 1.13.2** - HTTP client
- **Vite 7.2.4** - Build tool
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mhdirfanpn/panadol-platform-client.git

# Navigate to project directory
cd panadol-platform-client

# Install dependencies
npm install
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## 🧪 Testing

```bash
# Run tests in watch mode
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

**Test Coverage:** 32 tests across 5 test files

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed testing documentation.

## 🔍 Code Quality

```bash
# Run ESLint
npm run lint

# Type check
npx tsc --noEmit
```

## 📁 Project Structure

```
panadol-platform-client/
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── src/
│   ├── components/         # React components
│   │   ├── common/        # Reusable components
│   │   ├── doctors/       # Doctor-related components
│   │   └── users/         # User-related components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   ├── context/           # React context (Theme)
│   ├── test/              # Test setup
│   └── App.tsx            # Main app component
├── public/                # Static assets
├── docs/                  # Documentation (gitignored)
├── TESTING_GUIDE.md       # Testing documentation
└── README.md              # This file
```

## 🎨 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Generate coverage report |

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Muhammed Irfan** - [mhdirfanpn](https://github.com/mhdirfanpn)

## 🙏 Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- Vite for the blazing fast build tool

