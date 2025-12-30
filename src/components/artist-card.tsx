import { Music, Users } from "lucide-react";
import { Artist } from "@/types/artist";
import { Link } from "react-router-dom";

interface ArtistCardProps {
  artist: Artist;
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
  ];

  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

// Helper function to get mock stats for now (you can replace with real data later)
function getMockStats(name: string) {
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    followers: 100000 + (hash % 10) * 50000,
    tracks: 10 + (hash % 20),
  };
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { followers, tracks } = getMockStats(artist.name);
  const imageColor = getArtistColor(artist.name);

  return (
    <Link to={`/artists/${artist.slug}`} className="group block">
      {" "}
      {/* Wrap in Link */}
      <div className="relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1 h-full">
        {/* Artist Avatar */}
        <div className="mb-4 flex justify-center">
          {artist.image ? (
            <img
              src={artist.image}
              alt={artist.name}
              className="h-24 w-24 rounded-full object-cover border-4 border-background"
            />
          ) : (
            <div
              className={`h-24 w-24 rounded-full ${imageColor} flex items-center justify-center text-white text-2xl font-bold border-4 border-background`}
            >
              {artist.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Artist Info */}
        <div className="space-y-3 text-center">
          <div>
            <h3 className="font-semibold text-lg mb-1">{artist.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 h-10">
              {artist.description || "Music artist"}
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-4 text-sm pt-2">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {(followers / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Music className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{tracks}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
