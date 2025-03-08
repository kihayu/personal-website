# 🎨 Personal Website

A modern, interactive personal website built with Nuxt 3, featuring animated showcases of design and development skills.

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Bun package manager

### Installation

1. Clone the repository

```bash
git clone git@github.com:kihayu/personal-website.git
cd personal-website
```

2. Install dependencies

```bash
bun install --frozen-lockfile
```

### Development

Start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000/`

### Production

Build for production:

```bash
bun run build
```

Build Docker image:

```bash
docker build -t personal-website .
```

## 📁 Project Structure

```
├── assets/            # Static assets
│   ├── css/           # Global styles and utilities
│   ├── fonts/         # Custom fonts
│   ├── icons/         # SVG icons
│   └── images/        # Image assets
├── components/        # Vue.js components
│   ├── animations/    # Animation components
│   ├── content-info/  # Content information components
│   ├── projects/      # Project section related components
│   └── section/       # Section layout components
├── composables/       # Vue.js composables and hooks
├── constants/         # Application constants
├── layouts/           # Layout templates
├── pages/             # Application pages and routing
├── public/            # Public static files
├── server/            # Server-side code
│   └── plugins/       # Server plugins
├── store/             # Pinia state management
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
