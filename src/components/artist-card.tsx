import { Music, Users } from "lucide-react"
import { Artist } from "@/types/artist"

interface ArtistCardProps {
  artist: Artist
}

// Helper function to get color based on artist name
function getArtistColor(name: string) {
  const colors = [
    "bg-gradient-to-br from-pink-500 to-rose-500",
    "bg-gradient-to-br from-purple-500 to-indigo-500",
    "bg-gradient-to-br from-cyan-500 to-blue-500",
    "bg-gradient-to-br from-orange-500 to-red-500",
    "bg-gradient-to-br from-yellow-500 to-amber-500",
    "bg-gradient-to-br from-emerald-500 to-green-500",
  ]
  
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

// Helper function to get mock stats for now (you can replace with real data later)
function getMockStats(name: string) {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return {
    followers: 100000 + (hash % 10) * 50000,
    tracks: 10 + (hash % 20)
  }
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { followers, tracks } = getMockStats(artist.name)
  const imageColor = getArtistColor(artist.name)

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1">
      {/* Artist Avatar */}
      <div className="mb-4">
        {artist.image ? (
          <img 
            src={artist.image} 
            alt={artist.name}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div 
            className={`h-16 w-16 rounded-full ${imageColor} flex items-center justify-center text-white text-xl font-bold`}
          >
            {artist.name.charAt(0)}
          </div>
        )}
      </div>
      
      {/* Artist Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg">{artist.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {artist.description || "Music artist"}
          </p>
        </div>
        
        {/* Stats - You can replace with real stats when available */}
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