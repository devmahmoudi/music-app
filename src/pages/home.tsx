import { useQuery } from "@apollo/client/react";
import SectionHeader from "@/components/section-header";
import ArtistCard from "@/components/artist-card";
import MusicCard from "@/components/music-card";
import { Mic2, Music, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import { GET_FEATURED_ARTISTS } from "@/queries/artists";
import { ArtistsCollection } from "@/types/artist";
import Loading from "@/components/loading";
import ErrorMessage from "@/components/error-message";

export default function Home() {
  // Fetch artists from Supabase
  const { loading, error, data } =
    useQuery<ArtistsCollection>(GET_FEATURED_ARTISTS);

  // Mock data for music tracks (keep for now)
  const musicTracks = [
    {
      title: "Midnight City Lights",
      artist: "Luna Echo",
      duration: "3:45",
      plays: 1245000,
      likes: 98000,
      albumColor: "bg-gradient-to-br from-pink-400 to-rose-400",
    },
    {
      title: "Neon Dreams",
      artist: "Midnight Drive",
      duration: "4:20",
      plays: 890000,
      likes: 67000,
      albumColor: "bg-gradient-to-br from-purple-400 to-indigo-400",
    },
    {
      title: "Ocean Breeze",
      artist: "Coastal Dreams",
      duration: "3:15",
      plays: 760000,
      likes: 54000,
      albumColor: "bg-gradient-to-br from-cyan-400 to-blue-400",
    },
    {
      title: "Electric Storm",
      artist: "Solar Flare",
      duration: "3:58",
      plays: 1560000,
      likes: 112000,
      albumColor: "bg-gradient-to-br from-yellow-400 to-amber-400",
    },
    {
      title: "City Rain",
      artist: "Urban Echoes",
      duration: "4:05",
      plays: 980000,
      likes: 72000,
      albumColor: "bg-gradient-to-br from-emerald-400 to-green-400",
    },
    {
      title: "Golden Hour",
      artist: "Velvet Skies",
      duration: "5:12",
      plays: 1340000,
      likes: 89000,
      albumColor: "bg-gradient-to-br from-orange-400 to-red-400",
    },
    {
      title: "Starlight",
      artist: "Luna Echo",
      duration: "3:30",
      plays: 1120000,
      likes: 85000,
      albumColor: "bg-gradient-to-br from-pink-300 to-rose-300",
    },
    {
      title: "Desert Highway",
      artist: "Midnight Drive",
      duration: "4:45",
      plays: 780000,
      likes: 59000,
      albumColor: "bg-gradient-to-br from-purple-300 to-indigo-300",
    },
  ];

  // Get artists from the query response
  const artists = data?.artistsCollection?.edges || [];

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
              Explore thousands of artists and tracks. Find your next favorite
              song in our curated collection of the finest music.
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

          {loading ? (
            <Loading message="Loading artists..." />
          ) : error ? (
            <ErrorMessage
              message="Error loading artists"
              details={error.message}
            />
          ) : artists.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Music className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No artists found</p>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.map(({ node: artist }) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </section>

        {/* Trending Music Section */}
        <section>
          <SectionHeader
            title="Trending Now"
            description="The hottest tracks our community is listening to"
            moreLink="/music"
          />

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
              <h3 className="text-2xl font-bold">
                {artists.length > 0 ? artists.length * 1000 : "50K+"}
              </h3>
              <p className="text-muted-foreground">Tracks Available</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Mic2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">
                {artists.length > 0 ? artists.length : "5K+"}
              </h3>
              <p className="text-muted-foreground">Artists</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">
                {artists.length > 0 ? artists.length * 10000 : "10M+"}
              </h3>
              <p className="text-muted-foreground">Monthly Listeners</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
