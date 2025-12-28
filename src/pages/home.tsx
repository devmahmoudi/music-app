import SectionHeader from "@/components/section-header"
import ArtistCard from "@/components/artist-card"
import MusicCard from "@/components/music-card"
import { Mic2, Music, TrendingUp } from "lucide-react"

export default function Home() {
  // Mock data for artists
  const artists = [
    { name: "Luna Echo", genre: "Indie Pop", followers: 245000, tracks: 24, imageColor: "bg-gradient-to-br from-pink-500 to-rose-500" },
    { name: "Midnight Drive", genre: "Synthwave", followers: 189000, tracks: 18, imageColor: "bg-gradient-to-br from-purple-500 to-indigo-500" },
    { name: "Coastal Dreams", genre: "Dream Pop", followers: 156000, tracks: 21, imageColor: "bg-gradient-to-br from-cyan-500 to-blue-500" },
    { name: "Velvet Skies", genre: "Alternative Rock", followers: 312000, tracks: 32, imageColor: "bg-gradient-to-br from-orange-500 to-red-500" },
    { name: "Solar Flare", genre: "Electronic", followers: 421000, tracks: 28, imageColor: "bg-gradient-to-br from-yellow-500 to-amber-500" },
    { name: "Urban Echoes", genre: "R&B", followers: 278000, tracks: 19, imageColor: "bg-gradient-to-br from-emerald-500 to-green-500" },
  ]

  // Mock data for music tracks
  const musicTracks = [
    { title: "Midnight City Lights", artist: "Luna Echo", duration: "3:45", plays: 1245000, likes: 98000, albumColor: "bg-gradient-to-br from-pink-400 to-rose-400" },
    { title: "Neon Dreams", artist: "Midnight Drive", duration: "4:20", plays: 890000, likes: 67000, albumColor: "bg-gradient-to-br from-purple-400 to-indigo-400" },
    { title: "Ocean Breeze", artist: "Coastal Dreams", duration: "3:15", plays: 760000, likes: 54000, albumColor: "bg-gradient-to-br from-cyan-400 to-blue-400" },
    { title: "Electric Storm", artist: "Solar Flare", duration: "3:58", plays: 1560000, likes: 112000, albumColor: "bg-gradient-to-br from-yellow-400 to-amber-400" },
    { title: "City Rain", artist: "Urban Echoes", duration: "4:05", plays: 980000, likes: 72000, albumColor: "bg-gradient-to-br from-emerald-400 to-green-400" },
    { title: "Golden Hour", artist: "Velvet Skies", duration: "5:12", plays: 1340000, likes: 89000, albumColor: "bg-gradient-to-br from-orange-400 to-red-400" },
    { title: "Starlight", artist: "Luna Echo", duration: "3:30", plays: 1120000, likes: 85000, albumColor: "bg-gradient-to-br from-pink-300 to-rose-300" },
    { title: "Desert Highway", artist: "Midnight Drive", duration: "4:45", plays: 780000, likes: 59000, albumColor: "bg-gradient-to-br from-purple-300 to-indigo-300" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
              <TrendingUp className="h-4 w-4" />
              Discover new music every day
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Your <span className="text-primary">Music</span>
              <span className="block mt-2">Journey Starts Here</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10">
              Explore thousands of artists and tracks. Find your next favorite song 
              in our curated collection of the finest music.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Artists Section */}
        <section className="mb-20">
          <SectionHeader
            title="Featured Artists"
            description="Discover emerging and established artists from around the world"
            moreLink="/artists"
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist, index) => (
              <ArtistCard key={index} {...artist} />
            ))}
          </div>
        </section>

        {/* Trending Music Section - Now in Grid Layout */}
        <section>
          <SectionHeader
            title="Trending Now"
            description="The hottest tracks our community is listening to"
            moreLink="/music"
          />
          
          {/* Changed from single column to grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {musicTracks.map((track, index) => (
              <MusicCard key={index} {...track} />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-20 pt-12 border-t">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Music className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">50K+</h3>
              <p className="text-muted-foreground">Tracks Available</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Mic2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">5K+</h3>
              <p className="text-muted-foreground">Artists</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">10M+</h3>
              <p className="text-muted-foreground">Monthly Listeners</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}