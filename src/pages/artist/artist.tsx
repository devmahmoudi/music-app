import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useQuery } from "@apollo/client/react"
import {
  ArrowLeft,
  Calendar,
  Music,
  Play,
  Pause,
  Heart,
  Share2,
  Users,
  Album,
  Clock
} from "lucide-react"
import AudioPlayer from "@/components/audio-player" // Add audio player
import {
  ArtistMusicsResponse,
  GET_ARTIST_BY_SLUG,
  GET_ARTIST_MUSICS // Updated query name
} from "@/queries/artist"
import type {
  ArtistDetailResponse,
   // Updated type
} from "@/types/artist"

const MUSICS_PER_PAGE = 10

export default function Artist() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)
  const [pageDirection, setPageDirection] = useState<"forward" | "backward">("forward")
  const [cursor, setCursor] = useState<string | null>(null)
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null)
  const [currentMusicTitle, setCurrentMusicTitle] = useState<string | null>(null)

  // Fetch artist details
  const { loading: artistLoading, error: artistError, data: artistData } = 
    useQuery<ArtistDetailResponse>(GET_ARTIST_BY_SLUG, {
      variables: { slug },
      skip: !slug,
    })

  // Fetch artist's music (using musics table)
  const { loading: musicsLoading, data: musicsData } = 
    useQuery<ArtistMusicsResponse>(GET_ARTIST_MUSICS, {
      variables: {
        artistId: artistData?.artistsCollection?.edges[0]?.node.id || "",
        first: pageDirection === "forward" ? MUSICS_PER_PAGE : null,
        after: pageDirection === "forward" ? cursor : null,
        last: pageDirection === "backward" ? MUSICS_PER_PAGE : null,
        before: pageDirection === "backward" ? cursor : null,
      },
      skip: !artistData?.artistsCollection?.edges[0]?.node.id,
    })

  const artist = artistData?.artistsCollection?.edges[0]?.node
  const musics = musicsData?.musicsCollection?.edges || []
  const pageInfo = musicsData?.musicsCollection?.pageInfo

  // Handle play track with real audio
  const handlePlayTrack = (musicId: string, audioUrl: string, title: string) => {
    if (playingTrack === musicId) {
      setPlayingTrack(null)
      setCurrentAudioUrl(null)
      setCurrentMusicTitle(null)
    } else {
      setPlayingTrack(musicId)
      setCurrentAudioUrl(audioUrl)
      setCurrentMusicTitle(title)
    }
  }

  // Handle play all
  const handlePlayAll = () => {
    if (musics.length > 0) {
      const firstMusic = musics[0].node
      setPlayingTrack(firstMusic.id)
      setCurrentAudioUrl(firstMusic.file)
      setCurrentMusicTitle(firstMusic.name)
    }
  }

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage && pageInfo.endCursor) {
      setPageDirection("forward")
      setCursor(pageInfo.endCursor)
    }
  }

  const handlePreviousPage = () => {
    if (pageInfo?.hasPreviousPage && pageInfo.startCursor) {
      setPageDirection("backward")
      setCursor(pageInfo.startCursor)
    }
  }

  // Format duration (mock - you might want to add duration field to musics table)
  const formatDuration = () => {
    // Since we don't have duration in musics table, return a mock value
    return "3:45"
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (artistLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            <Music className="h-6 w-6 animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading artist...</p>
        </div>
      </div>
    )
  }

  if (artistError || !artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive mb-4">
            <Music className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Artist Not Found</h3>
          <p className="text-muted-foreground mb-4">
            The artist you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border hover:bg-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4 inline mr-2" />
              Go Back
            </button>
            <Link
              to="/artists"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Browse Artists
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Artist Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              to="/artists"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Artists
            </Link>
          </div>

          {/* Artist Info */}
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Artist Image */}
            <div className="flex-shrink-0">
              {artist.image ? (
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="h-48 w-48 rounded-full object-cover border-8 border-background shadow-lg"
                />
              ) : (
                <div className="h-48 w-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-4xl font-bold text-primary border-8 border-background shadow-lg">
                  {artist.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Artist Details */}
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{artist.name}</h1>

              {artist.description && (
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
                  {artist.description}
                </p>
              )}

              {/* Artist Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Music className="h-4 w-4" />
                  <span>{musics.length} tracks</span>
                </div>
                
                {artist.created_at && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {formatDate(artist.created_at)}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handlePlayAll}
                  disabled={musics.length === 0}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="h-5 w-5" />
                  Play All
                </button>
                
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border hover:bg-accent transition-colors">
                  <Heart className="h-5 w-5" />
                  Follow
                </button>
                
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border hover:bg-accent transition-colors">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player - Only show when a track is playing */}
      {currentAudioUrl && currentMusicTitle && (
        <div className="sticky top-0 z-50 bg-card border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <AudioPlayer
              audioUrl={currentAudioUrl}
              title={currentMusicTitle}
              artist={artist.name}
              coverImage={artist.image || undefined}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Music Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Music</h2>
            {musics.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {musics.length} track{musics.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {musicsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Music className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading music...</p>
              </div>
            </div>
          ) : musics.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border rounded-xl">
              <Album className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Music Yet</h3>
              <p className="text-muted-foreground">This artist hasn't released any music yet.</p>
            </div>
          ) : (
            <>
              {/* Music List */}
              <div className="rounded-xl border overflow-hidden mb-8">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/30 text-sm text-muted-foreground font-medium">
                  <div className="col-span-1"></div>
                  <div className="col-span-6">Title</div>
                  <div className="col-span-3">Released</div>
                  <div className="col-span-1">Duration</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Music Items */}
                {musics.map(({ node: music }, index) => (
                  <div
                    key={music.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-accent/30 transition-colors group"
                  >
                    <div className="col-span-1 flex items-center justify-center">
                      <span className="text-muted-foreground w-6 text-center">
                        {index + 1}
                      </span>
                    </div>
                    
                    <div className="col-span-6 flex items-center gap-3">
                      <button
                        onClick={() => handlePlayTrack(music.id, music.file, music.name)}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90"
                      >
                        {playingTrack === music.id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>
                      
                      <div className="min-w-0">
                        <Link
                          to={`/music/${music.slug}`}
                          className="font-medium truncate hover:text-primary transition-colors"
                        >
                          {music.name}
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          {artist.name}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-3 flex items-center">
                      <span className="text-muted-foreground">
                        {music.created_at 
                          ? new Date(music.created_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : "—"
                        }
                      </span>
                    </div>
                    
                    <div className="col-span-1 flex items-center">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration()}
                      </span>
                    </div>
                    
                    <div className="col-span-1 flex items-center justify-end">
                      <button className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-muted transition-opacity">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination for Music */}
              {pageInfo && (pageInfo.hasNextPage || pageInfo.hasPreviousPage) && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={!pageInfo.hasPreviousPage}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </button>
                  
                  <button
                    onClick={handleNextPage}
                    disabled={!pageInfo.hasNextPage}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About {artist.name}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Biography</h3>
              <p className="text-muted-foreground">
                {artist.description || "No biography available for this artist."}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg border text-center">
                  <div className="text-2xl font-bold">{musics.length}</div>
                  <div className="text-sm text-muted-foreground">Tracks</div>
                </div>
                <div className="p-4 rounded-lg border text-center">
                  <div className="text-2xl font-bold">
                    {musics.length * 1000}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Plays</div>
                </div>
                <div className="p-4 rounded-lg border text-center">
                  <div className="text-2xl font-bold">
                    {musics.length * 500}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Likes</div>
                </div>
                <div className="p-4 rounded-lg border text-center">
                  <div className="text-2xl font-bold">
                    {artist.created_at ? formatDate(artist.created_at) : "—"}
                  </div>
                  <div className="text-sm text-muted-foreground">Joined</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}