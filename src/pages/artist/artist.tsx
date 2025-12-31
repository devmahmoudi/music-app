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
  Album
} from "lucide-react"
import {
  GET_ARTIST_BY_SLUG,
  GET_ARTIST_TRACKS
} from "@/queries/artist"
import type {
  ArtistDetailResponse,
  ArtistTracksResponse
} from "@/types/artist"

const TRACKS_PER_PAGE = 10

export default function Artist() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)
  const [pageDirection, setPageDirection] = useState<"forward" | "backward">("forward")
  const [cursor, setCursor] = useState<string | null>(null)

  // Fetch artist details
  const { loading: artistLoading, error: artistError, data: artistData } = 
    useQuery<ArtistDetailResponse>(GET_ARTIST_BY_SLUG, {
      variables: { slug },
      skip: !slug,
    })

  // Fetch artist tracks
  const { loading: tracksLoading, data: tracksData } = 
    useQuery<ArtistTracksResponse>(GET_ARTIST_TRACKS, {
      variables: {
        artistId: artistData?.artistsCollection?.edges[0]?.node.id || "",
        first: pageDirection === "forward" ? TRACKS_PER_PAGE : null,
        after: pageDirection === "forward" ? cursor : null,
        last: pageDirection === "backward" ? TRACKS_PER_PAGE : null,
        before: pageDirection === "backward" ? cursor : null,
      },
      skip: !artistData?.artistsCollection?.edges[0]?.node.id,
    })

  const artist = artistData?.artistsCollection?.edges[0]?.node
  const tracks = tracksData?.tracksCollection?.edges || []
  const pageInfo = tracksData?.tracksCollection?.pageInfo

  const handlePlayTrack = (trackId: string) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId)
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

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
              
              {/* Genre removed since it's not in your database yet */}
              {/* {artist.genre && (
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {artist.genre}
                </div>
              )} */}

              {artist.description && (
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
                  {artist.description}
                </p>
              )}

              {/* Artist Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                {/* Location removed since it's not in your database yet */}
                {/* {artist.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{artist.location}</span>
                  </div>
                )} */}
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Music className="h-4 w-4" />
                  <span>{tracks.length} tracks</span>
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
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
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
                
                {/* Website removed since it's not in your database yet */}
                {/* {artist.website && (
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                    Website
                  </a>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tracks Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Tracks</h2>
            {tracks.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {tracks.length} track{tracks.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {tracksLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Music className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading tracks...</p>
              </div>
            </div>
          ) : tracks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border rounded-xl">
              <Album className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Tracks Yet</h3>
              <p className="text-muted-foreground">This artist hasn't released any tracks yet.</p>
            </div>
          ) : (
            <>
              {/* Tracks List */}
              <div className="rounded-xl border overflow-hidden mb-8">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/30 text-sm text-muted-foreground font-medium">
                  <div className="col-span-1"></div>
                  <div className="col-span-5">Title</div>
                  <div className="col-span-3">Album</div>
                  <div className="col-span-1">Duration</div>
                  <div className="col-span-2 text-right">Plays</div>
                </div>

                {/* Tracks */}
                {tracks.map(({ node: track }, index) => (
                  <div
                    key={track.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-accent/30 transition-colors group"
                  >
                    <div className="col-span-1 flex items-center justify-center">
                      <span className="text-muted-foreground w-6 text-center">
                        {index + 1}
                      </span>
                    </div>
                    
                    <div className="col-span-5 flex items-center gap-3">
                      <button
                        onClick={() => handlePlayTrack(track.id)}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90"
                      >
                        {playingTrack === track.id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>
                      
                      <div className="min-w-0">
                        <div className="font-medium truncate">{track.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {artist.name}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-3 flex items-center gap-3">
                      {track.cover_image ? (
                        <img
                          src={track.cover_image}
                          alt={track.album}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <Album className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                      <div className="truncate">{track.album || "Single"}</div>
                    </div>
                    
                    <div className="col-span-1 flex items-center">
                      <span className="text-muted-foreground">
                        {formatDuration(track.duration)}
                      </span>
                    </div>
                    
                    <div className="col-span-2 flex items-center justify-end gap-4">
                      <div className="text-right">
                        <div className="font-medium">{track.plays.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">plays</div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-muted transition-opacity">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination for Tracks */}
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
                  <div className="text-2xl font-bold">{tracks.length}</div>
                  <div className="text-sm text-muted-foreground">Tracks</div>
                </div>
                <div className="p-4 rounded-lg border text-center">
                  <div className="text-2xl font-bold">
                    {tracks.reduce((acc, { node: track }) => acc + track.plays, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Plays</div>
                </div>
                <div className="p-4 rounded-lg border text-center">
                  <div className="text-2xl font-bold">
                    {tracks.reduce((acc, { node: track }) => acc + track.likes, 0).toLocaleString()}
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

        {/* Similar Artists */}
        {/* <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Similar Artists</h2>
            <Link
              to="/artists"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View All Artists →
            </Link>
          </div>
          <div className="p-8 border rounded-xl text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Similar artists feature coming soon. Check back later!
            </p>
          </div>
        </section> */}
      </div>
    </div>
  )
}