import { Music, Users } from "lucide-react"

interface ArtistCardProps {
  name: string
  genre: string
  followers: number
  tracks: number
  imageColor: string
}

export default function ArtistCard({ name, genre, followers, tracks, imageColor }: ArtistCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1">
      {/* Artist Avatar */}
      <div className="mb-4">
        <div 
          className={`h-16 w-16 rounded-full ${imageColor} flex items-center justify-center text-white text-xl font-bold`}
        >
          {name.charAt(0)}
        </div>
      </div>
      
      {/* Artist Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{genre}</p>
        </div>
        
        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{followers.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Music className="h-4 w-4 text-muted-foreground" />
            <span>{tracks} tracks</span>
          </div>
        </div>
      </div>
    </div>
  )
}