
# 🎵 Music App

A modern, beautiful web application for discovering artists and music, built with React, TypeScript, and Vite. Explore trending tracks, featured artists, and enjoy a seamless, responsive experience with dark mode and fast navigation.

🌐 **Live Demo:** [devmahmoudi-music-app.vercel.app](https://devmahmoudi-music-app.vercel.app)

---

## ✨ Features

- **Discover Artists:** Browse a curated collection of emerging and established artists from around the world.
- **Trending Music:** Explore the hottest tracks and find your next favorite song.
- **Responsive Design:** Looks great on all devices, from mobile to desktop.
- **Dark Mode:** Enjoy a beautiful dark theme with smooth transitions.
- **Client-side Routing:** Fast navigation powered by React Router.
- **Audio Player:** Play music with a modern, accessible audio player.
- **Search & Pagination:** Quickly find artists and tracks with search and paginated lists.
- **Performance Optimized:** Built with Vite for instant loading and fast refresh.
- **Accessible & Customizable:** Designed with accessibility and easy customization in mind.

---

## 🛠️ Tech Stack

- **React** & **TypeScript** – Robust, type-safe UI development
- **Vite** – Lightning-fast build tool and dev server
- **Apollo Client** – GraphQL data fetching
- **Supabase** – Backend as a Service (GraphQL API)
- **Tailwind CSS** – Utility-first, responsive styling
- **shadcn/ui** – Beautiful, accessible UI components
- **Lucide Icons** – Modern icon set

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/music-app.git
cd music-app
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_GRAPHQL_URL=your_supabase_graphql_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

---

## 📂 Project Structure

```
src/
	components/      # Reusable UI components (cards, navbar, audio player, etc.)
	pages/           # Page components (Home, Artists, Music, About, etc.)
	queries/         # GraphQL queries for artists and music
	providers/       # Context providers (Supabase, Theme)
	types/           # TypeScript types
	lib/             # Utility functions
public/            # Static assets
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the app.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

<p align="center">
	<b>Enjoy your music journey! 🎶</b>
</p>
