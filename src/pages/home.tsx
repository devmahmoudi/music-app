import { useQuery } from "@apollo/client/react"
import SectionHeader from "@/components/section-header"
import ArtistCard from "@/components/artist-card"
import MusicCard from "@/components/music-card"
import { Mic2, Music, TrendingUp, Loader2, AlertCircle } from "lucide-react"
import { GET_FEATURED_ARTISTS } from "@/queries/artist"
import { GET_FEATURED_MUSICS } from "@/queries/music"
import { ArtistsCollection } from "@/types/artist"
import { MusicsCollection } from "@/types/music"
import Loading from "@/components/loading"
import ErrorMessage from "@/components/error-message"

export default function Home() {
  // Fetch artists from Supabase
  const { 
    loading: artistsLoading, 
    error: artistsError, 
    data: artistsData 
  } = useQuery<ArtistsCollection>(GET_FEATURED_ARTISTS)

  // Fetch music from Supabase
  const { 
    loading: musicLoading, 
    error: musicError, 
    data: musicData 
  } = useQuery<MusicsCollection>(GET_FEATURED_MUSICS)

  // Get artists from the query response
  const artists = artistsData?.artistsCollection?.edges || []
  
  // Get music from the query response
  const musics = musicData?.musicsCollection?.edges || []

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

          {artistsLoading ? (
            <Loading message="Loading artists..." />
          ) : artistsError ? (
            <ErrorMessage
              message="Error loading artists"
              details={artistsError.message}
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

        {/* Trending Music Section - Now using Supabase data */}
        <section>
          <SectionHeader
            title="Trending Now"
            description="The hottest tracks our community is listening to"
            moreLink="/music"
          />

          {musicLoading ? (
            <Loading message="Loading music..." />
          ) : musicError ? (
            <ErrorMessage
              message="Error loading music"
              details={musicError.message}
            />
          ) : musics.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Music className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No music found</p>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {musics.map(({ node: music }) => (
                <MusicCard key={music.id} music={music} />
              ))}
            </div>
          )}
        </section>

        {/* Stats Section */}
        <section className="mt-20 pt-12 border-t">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Music className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">
                {musics.length > 0 ? musics.length * 100 : "50K+"}
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
                {musics.length > 0 ? musics.length * 10000 : "10M+"}
              </h3>
              <p className="text-muted-foreground">Monthly Listeners</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}