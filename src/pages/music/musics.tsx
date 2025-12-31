import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client/react"
import {
  Music as MusicIcon,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  TrendingUp,
  Loader2,
  X
} from "lucide-react"
import MusicCard from "@/components/music-card"
import {
  GET_MUSICS_PAGINATED,
  GET_MUSICS_COUNT,
  SEARCH_MUSICS,
  SEARCH_MUSICS_COUNT
} from "@/queries/music"
import type {
  MusicsCollection,
  MusicsCount
} from "@/types/music"

const ITEMS_PER_PAGE = 12

export default function MusicsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [pageDirection, setPageDirection] = useState<"forward" | "backward">("forward")
  const [cursor, setCursor] = useState<string | null>(null)

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setIsSearching(!!searchTerm.trim())
      setCursor(null)
      setPageDirection("forward")
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Choose which query to use based on search state
  const query = isSearching ? SEARCH_MUSICS : GET_MUSICS_PAGINATED
  const countQuery = isSearching ? SEARCH_MUSICS_COUNT : GET_MUSICS_COUNT

  // Query variables
  const queryVariables = isSearching
    ? {
        search: `%${debouncedSearchTerm}%`,
        first: pageDirection === "forward" ? ITEMS_PER_PAGE : null,
        after: pageDirection === "forward" ? cursor : null,
      }
    : {
        first: pageDirection === "forward" ? ITEMS_PER_PAGE : null,
        after: pageDirection === "forward" ? cursor : null,
        last: pageDirection === "backward" ? ITEMS_PER_PAGE : null,
        before: pageDirection === "backward" ? cursor : null,
      }

  // Query for music
  const { loading, error, data, refetch } = useQuery<MusicsCollection>(
    query,
    {
      variables: queryVariables,
      skip: isSearching && !debouncedSearchTerm.trim(),
    }
  )

  // Query for total count
  const { data: countData, loading: countLoading } = useQuery<MusicsCount>(
    countQuery,
    {
      variables: isSearching ? { search: `%${debouncedSearchTerm}%` } : {},
      skip: isSearching && !debouncedSearchTerm.trim(),
    }
  )

  const musics = data?.musicsCollection?.edges || []
  const pageInfo = data?.musicsCollection?.pageInfo
  const totalMusics = countData?.musicsCollection?.edges?.length || 0
  const currentPage = Math.floor(
    (musics.length > 0 ? parseInt(cursor || "0") : 0) / ITEMS_PER_PAGE
  ) + 1
  const totalPages = Math.ceil(totalMusics / ITEMS_PER_PAGE)

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(!!searchTerm.trim())
    setCursor(null)
    setPageDirection("forward")
  }

  const clearSearch = () => {
    setSearchTerm("")
    setIsSearching(false)
    setCursor(null)
    setPageDirection("forward")
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-b from-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
              <MusicIcon className="h-4 w-4" />
              Explore All Music
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Discover <span className="text-primary">Music</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10">
              Browse through our collection of songs from talented artists worldwide. 
              Find your next favorite track.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search music by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </form>
            </div>
            
            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent transition-colors whitespace-nowrap">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                {countLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Counting...
                  </span>
                ) : isSearching ? (
                  <>{totalMusics} result{totalMusics !== 1 ? 's' : ''}</>
                ) : (
                  <>{totalMusics} track{totalMusics !== 1 ? 's' : ''} total</>
                )}
              </div>
            </div>
          </div>
          
          {/* Search Status */}
          {isSearching && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                Searching for "{debouncedSearchTerm.replace(/%/g, '')}"
                {!countLoading && totalMusics > 0 && ` • Found ${totalMusics} track${totalMusics !== 1 ? 's' : ''}`}
              </p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 mb-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">
              {isSearching ? "Searching music..." : "Loading music..."}
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive mb-4">
              <MusicIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {isSearching ? "Error searching music" : "Error loading music"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md text-center">
              {error.message}
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        ) : musics.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 mb-12">
            <MusicIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {isSearching ? "No music found" : "No music available"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {isSearching 
                ? "Try a different search term or browse all music."
                : "Check back later for new music."
              }
            </p>
            {isSearching && (
              <button
                onClick={clearSearch}
                className="px-4 py-2 rounded-lg border hover:bg-accent transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Music Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {musics.map(({ node: music }) => (
                <MusicCard key={music.id} music={music} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {musics.length} of {totalMusics}{" "}
                  {isSearching ? "search results" : "tracks"}
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
                  
                  <div className="px-4 py-2 text-sm whitespace-nowrap">
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
            )}
          </>
        )}

        {/* Stats - Only show when not searching */}
        {!isSearching && !loading && (
          <div className="mt-20 pt-12 border-t">
            <h3 className="text-2xl font-bold text-center mb-8">Music Library</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <MusicIcon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold">{totalMusics}</h4>
                <p className="text-muted-foreground">Total Tracks</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold">50+</h4>
                <p className="text-muted-foreground">Artists</p>
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
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold">10M+</h4>
                <p className="text-muted-foreground">Total Plays</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}