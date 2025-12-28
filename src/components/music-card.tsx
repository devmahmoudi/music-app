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
    <div className="group relative overflow-hidden rounded-xl border bg-card p-4 transition-all hover:bg-accent/50">
      <div className="flex items-start gap-4">
        {/* Album Art */}
        <div className={`h-14 w-14 rounded-lg ${albumColor} flex items-center justify-center`}>
          <Play className="h-6 w-6 text-white/80" />
        </div>
        
        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{title}</h3>
          <p className="text-sm text-muted-foreground truncate">{artist}</p>
          
          {/* Stats */}
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Play className="h-3 w-3" />
              <span>{plays.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>{likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Play Button */}
        <button className="opacity-0 group-hover:opacity-100 p-2 rounded-full bg-primary text-primary-foreground transition-opacity">
          <Play className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}