# Elf Name Generator

A specialized fantasy name generator focused on creating authentic elf names for D&D, fantasy stories, and role-playing games.

## Features

- **Multiple Elf Types**: Wood Elves, Dark Elves, Half-Elves, High Elves, Moon Elves, Sun Elves, Wild Elves, Sea Elves, Snow Elves, Shadow Elves
- **AI-Powered Generation**: Using advanced AI to create authentic fantasy names
- **Background Stories**: Optional character background generation
- **Pronunciation Guide**: Phonetic pronunciation for each name
- **Name Meanings**: Etymology and meaning for each generated name
- **Multiple Styles**: Traditional, Modern, Melodic, Mystical, Noble, Nature-inspired

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd elf-name-generator
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_PROXY_URL=your_openai_proxy_url
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Build and Deploy

```bash
npm run build
npm start
```

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Sonner**: Toast notifications

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key for name generation
- `OPENAI_PROXY_URL`: OpenAI API proxy URL (optional)

## License

This project is private and proprietary.