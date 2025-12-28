import { Play, Clock, Heart } from "lucide-react"

interface MusicCardProps {
  title: string
  artist: string
  duration: string
  plays: number
  likes: number
  albumColor: string
}

export default function MusicCard({ title, artist, duration, plays, likes, albumColor }: MusicCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-4 transition-all hover:bg-accent/50 hover:shadow-md">
      {/* Album Art with Play Button */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <div className={`aspect-square ${albumColor} flex items-center justify-center`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Track Info */}
      <div className="space-y-2">
        <div>
          <h3 className="font-semibold truncate">{title}</h3>
          <p className="text-sm text-muted-foreground truncate">{artist}</p>
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Play className="h-3 w-3" />
              <span>{(plays / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>{(likes / 1000).toFixed(1)}K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}