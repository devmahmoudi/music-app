import { Play, Clock, Music as MusicIcon } from "lucide-react"
import { Link } from "react-router-dom"
import type { Music } from "@/types/music"

interface MusicCardProps {
  music: Music
}

// Helper function to get color based on music name
function getMusicColor(name: string) {
  const colors = [
    "bg-gradient-to-br from-blue-500 to-cyan-500",
    "bg-gradient-to-br from-purple-500 to-pink-500",
    "bg-gradient-to-br from-green-500 to-emerald-500",
    "bg-gradient-to-br from-orange-500 to-red-500",
    "bg-gradient-to-br from-yellow-500 to-amber-500",
    "bg-gradient-to-br from-indigo-500 to-blue-500",
  ]
  
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

// Format duration (placeholder - you might want to store actual duration in database)
function getMockDuration(name: string) {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const minutes = 2 + (hash % 4)
  const seconds = hash % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function MusicCard({ music }: MusicCardProps) {
  const imageColor = getMusicColor(music.name)
  const duration = getMockDuration(music.name)

  return (
    <Link to={`/music/${music.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border bg-card p-4 transition-all hover:shadow-lg hover:-translate-y-1 h-full">
        {/* Album Art */}
        <div className="relative mb-4 overflow-hidden rounded-lg aspect-square">
          {music.image ? (
            <img
              src={music.image}
              alt={music.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className={`w-full h-full ${imageColor} flex items-center justify-center`}>
              <MusicIcon className="h-12 w-12 text-white/80" />
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Play className="h-6 w-6 text-black" />
            </div>
          </div>
        </div>
        
        {/* Music Info */}
        <div className="space-y-2">
          <h3 className="font-semibold truncate" title={music.name}>
            {music.name}
          </h3>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{duration}</span>
            </div>
            
            <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              {music.created_at 
                ? new Date(music.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : "New"
              }
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}