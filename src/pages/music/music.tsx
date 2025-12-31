import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useQuery } from "@apollo/client/react"
import {
  ArrowLeft,
  Play,
  Pause,
  Heart,
  Share2,
  Download,
  Music as MusicIcon,
  Calendar,
  Clock,
  User,
  ExternalLink
} from "lucide-react"
import {
  GET_MUSIC_BY_SLUG,
  GET_ARTIST_FOR_MUSIC
} from "@/queries/music"
import type {
  MusicDetail,
  MusicsCollection,
  ArtistsCollection
} from "@/types"

export default function MusicDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Fetch music details
  const { loading: musicLoading, error: musicError, data: musicData } = 
    useQuery<MusicsCollection>(GET_MUSIC_BY_SLUG, {
      variables: { slug },
      skip: !slug,
    })

  const music = musicData?.musicsCollection?.edges[0]?.node

  // Fetch artist info
  const { data: artistData } = useQuery<ArtistsCollection>(
    GET_ARTIST_FOR_MUSIC,
    {
      variables: { artistId: music?.artist_id },
      skip: !music?.artist_id,
    }
  )

  const artist = artistData?.artistsCollection?.edges[0]?.node

  // Mock audio player
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, duration])

  // Set mock duration
  useEffect(() => {
    if (music) {
      const hash = music.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      setDuration(180 + (hash % 120)) // 3-5 minutes
    }
  }, [music])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setCurrentTime(value)
  }

  const handleDownload = () => {
    if (music?.file) {
      window.open(music.file, '_blank')
    }
  }

  if (musicLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            <MusicIcon className="h-6 w-6 animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading music...</p>
        </div>
      </div>
    )
  }

  if (musicError || !music) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive mb-4">
            <MusicIcon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Music Not Found</h3>
          <p className="text-muted-foreground mb-4">
            The music you're looking for doesn't exist or has been removed.
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
              to="/music"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Browse Music
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link
          to="/music"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Music
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Music Info */}
          <div className="lg:w-2/3">
            {/* Music Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
              {/* Album Art */}
              <div className="flex-shrink-0">
                {music.image ? (
                  <img
                    src={music.image}
                    alt={music.name}
                    className="h-48 w-48 rounded-xl object-cover shadow-lg"
                  />
                ) : (
                  <div className="h-48 w-48 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center shadow-lg">
                    <MusicIcon className="h-16 w-16 text-primary" />
                  </div>
                )}
              </div>

              {/* Music Details */}
              <div className="flex-1 min-w-0">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                  Song
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{music.name}</h1>
                
                {artist && (
                  <Link
                    to={`/artists/${artist.slug}`}
                    className="inline-flex items-center gap-2 text-lg text-muted-foreground hover:text-primary transition-colors mb-6"
                  >
                    <User className="h-5 w-5" />
                    {artist.name}
                  </Link>
                )}

                {/* Music Stats */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {music.created_at 
                        ? new Date(music.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : "Recently added"
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handlePlayPause}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-5 w-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        Play
                      </>
                    )}
                  </button>
                  
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border hover:bg-accent transition-colors">
                    <Heart className="h-5 w-5" />
                    Like
                  </button>
                  
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Download
                  </button>
                  
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border hover:bg-accent transition-colors">
                    <Share2 className="h-5 w-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-card border rounded-xl p-6 mb-8">
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-center gap-6">
                  <button className="p-3 rounded-full hover:bg-muted transition-colors">
                    <MusicIcon className="h-5 w-5" />
                  </button>
                  <button className="p-3 rounded-full hover:bg-muted transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="p-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </button>
                  <button className="p-3 rounded-full hover:bg-muted transition-colors">
                    <ArrowLeft className="h-5 w-5 rotate-180" />
                  </button>
                  <button className="p-3 rounded-full hover:bg-muted transition-colors">
                    <MusicIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Lyrics */}
            {music.lyrics && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Lyrics</h2>
                <div className="bg-card border rounded-xl p-6">
                  <pre className="whitespace-pre-wrap font-sans text-muted-foreground">
                    {music.lyrics}
                  </pre>
                </div>
              </div>
            )}

            {/* File Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">File Information</h2>
              <div className="bg-card border rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Audio File</h3>
                    {music.file ? (
                      <a
                        href={music.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open Audio File
                      </a>
                    ) : (
                      <p className="text-muted-foreground">No audio file available</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Details</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>Duration: {formatTime(duration)}</div>
                      <div>Added: {new Date(music.created_at).toLocaleDateString()}</div>
                      <div>Updated: {new Date(music.updated_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Artist Info */}
          <div className="lg:w-1/3">
            {/* Artist Card */}
            {artist && (
              <div className="sticky top-24">
                <div className="bg-card border rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Artist</h2>
                  
                  <Link
                    to={`/artists/${artist.slug}`}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    {artist.image ? (
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-xl font-bold text-primary">
                        {artist.name.charAt(0)}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{artist.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">Artist</p>
                    </div>
                    
                    <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
                  </Link>
                </div>

                {/* More from Artist (Placeholder) */}
                <div className="bg-card border rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">More from {artist.name}</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <MusicIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">Song Title {i}</div>
                          <div className="text-sm text-muted-foreground">3:45</div>
                        </div>
                        <button className="p-2 rounded-full hover:bg-muted">
                          <Play className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    to={`/artists/${artist.slug}`}
                    className="block mt-4 text-center text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    View All Songs →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}