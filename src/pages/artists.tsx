import { useState } from "react"
import { useQuery } from "@apollo/client/react"
import { Link } from "react-router-dom"
import { 
  Users, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Music
} from "lucide-react"
import ArtistCard from "@/components/artist-card"
import { GET_ARTISTS_PAGINATED, GET_ARTISTS_COUNT } from "@/queries/artists"
import type { ArtistsCollection, ArtistsCount } from "@/types/artist"

const ITEMS_PER_PAGE = 12

export default function Artists() {
  const [searchTerm, setSearchTerm] = useState("")
  const [pageDirection, setPageDirection] = useState<"forward" | "backward">("forward")
  const [cursor, setCursor] = useState<string | null>(null)
  const [endCursor, setEndCursor] = useState<string | null>(null)
  const [startCursor, setStartCursor] = useState<string | null>(null)

  // Query for artists with pagination
  const { loading, error, data, refetch } = useQuery<ArtistsCollection>(
    GET_ARTISTS_PAGINATED,
    {
      variables: {
        first: pageDirection === "forward" ? ITEMS_PER_PAGE : null,
        after: pageDirection === "forward" ? cursor : null,
        last: pageDirection === "backward" ? ITEMS_PER_PAGE : null,
        before: pageDirection === "backward" ? cursor : null,
      },
    }
  )

  // Query for total count
  const { data: countData } = useQuery<ArtistsCount>(GET_ARTISTS_COUNT)

  const artists = data?.artistsCollection?.edges || []
  const pageInfo = data?.artistsCollection?.pageInfo
  const totalArtists = countData?.artistsCollection?.edges?.length || 0
  const currentPage = Math.floor(
    (artists.length > 0 ? parseInt(cursor || "0") : 0) / ITEMS_PER_PAGE
  ) + 1
  const totalPages = Math.ceil(totalArtists / ITEMS_PER_PAGE)

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage && pageInfo.endCursor) {
      setPageDirection("forward")
      setCursor(pageInfo.endCursor)
      setEndCursor(pageInfo.endCursor)
      setStartCursor(pageInfo.startCursor)
    }
  }

  const handlePreviousPage = () => {
    if (pageInfo?.hasPreviousPage && pageInfo.startCursor) {
      setPageDirection("backward")
      setCursor(pageInfo.startCursor)
      setEndCursor(pageInfo.endCursor)
      setStartCursor(pageInfo.startCursor)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log("Search for:", searchTerm)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            <Users className="h-6 w-6 animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading artists...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Error loading artists</h3>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
              <Users className="h-4 w-4" />
              Explore Our Artists
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Discover <span className="text-primary">Artists</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10">
              Browse through our collection of talented artists from around the world. 
              Find your new favorite musician today.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </form>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent transition-colors">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              
              <div className="text-sm text-muted-foreground">
                {totalArtists} artists total
              </div>
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        {artists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Users className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No artists found</h3>
            <p className="text-muted-foreground">Try adjusting your search or check back later.</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {artists.map(({ node: artist }) => (
                <div key={artist.id} className="group">
                  <ArtistCard artist={artist} />
                  <Link
                    to={`/artists/${artist.slug}`}
                    className="block mt-3 text-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    View Profile →
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {artists.length} of {totalArtists} artists
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={!pageInfo?.hasPreviousPage}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                
                <div className="px-4 py-2 text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={!pageInfo?.hasNextPage}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Stats */}
        <div className="mt-20 pt-12 border-t">
          <h3 className="text-2xl font-bold text-center mb-8">Artist Community</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold">{totalArtists}</h4>
              <p className="text-muted-foreground">Total Artists</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Music className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold">{totalArtists * 10}+</h4>
              <p className="text-muted-foreground">Total Tracks</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold">24/7</h4>
              <p className="text-muted-foreground">Updated Daily</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold">100+</h4>
              <p className="text-muted-foreground">Countries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}