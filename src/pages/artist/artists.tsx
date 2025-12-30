import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { Link } from "react-router-dom";
import {
  Users,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Music,
  X,
  Loader2,
} from "lucide-react";
import ArtistCard from "@/components/artist-card";
import {
  GET_ARTISTS_PAGINATED,
  GET_ARTISTS_COUNT,
  SEARCH_ARTISTS,
  SEARCH_ARTISTS_COUNT,
} from "@/queries/artists";
import type { ArtistsCollection, ArtistsCount } from "@/types/artist";

const ITEMS_PER_PAGE = 12;

export default function ArtistsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [pageDirection, setPageDirection] = useState<"forward" | "backward">(
    "forward"
  );
  const [cursor, setCursor] = useState<string | null>(null);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [startCursor, setStartCursor] = useState<string | null>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(!!searchTerm.trim());
      // Reset pagination when search changes
      setCursor(null);
      setPageDirection("forward");
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Choose which query to use based on search state
  const query = isSearching ? SEARCH_ARTISTS : GET_ARTISTS_PAGINATED;
  const countQuery = isSearching ? SEARCH_ARTISTS_COUNT : GET_ARTISTS_COUNT;

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
      };

  // Query for artists
  const { loading, error, data, refetch } = useQuery<ArtistsCollection>(query, {
    variables: queryVariables,
    skip: isSearching && !debouncedSearchTerm.trim(),
  });

  // Query for total count
  const { data: countData, loading: countLoading } = useQuery<ArtistsCount>(
    countQuery,
    {
      variables: isSearching ? { search: `%${debouncedSearchTerm}%` } : {},
      skip: isSearching && !debouncedSearchTerm.trim(),
    }
  );

  const artists = data?.artistsCollection?.edges || [];
  const pageInfo = data?.artistsCollection?.pageInfo;
  const totalArtists = countData?.artistsCollection?.edges?.length || 0;
  const currentPage =
    Math.floor(
      (artists.length > 0 ? parseInt(cursor || "0") : 0) / ITEMS_PER_PAGE
    ) + 1;
  const totalPages = Math.ceil(totalArtists / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage && pageInfo.endCursor) {
      setPageDirection("forward");
      setCursor(pageInfo.endCursor);
      setEndCursor(pageInfo.endCursor);
      setStartCursor(pageInfo.startCursor);
    }
  };

  const handlePreviousPage = () => {
    if (pageInfo?.hasPreviousPage && pageInfo.startCursor) {
      setPageDirection("backward");
      setCursor(pageInfo.startCursor);
      setEndCursor(pageInfo.endCursor);
      setStartCursor(pageInfo.startCursor);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(!!searchTerm.trim());
    // Reset pagination when manually submitting search
    setCursor(null);
    setPageDirection("forward");
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    setCursor(null);
    setPageDirection("forward");
  };

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
              Browse through our collection of talented artists from around the
              world. Find your new favorite musician today.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Input Column */}
            <div className="flex-1 w-full md:w-auto min-w-0">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search artists by name..."
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

              {/* Search Status - Fixed to not affect alignment */}
              {isSearching && (
                <div className="mt-2 h-6">
                  {" "}
                  {/* Fixed height container */}
                  <p className="text-sm text-muted-foreground">
                    Searching for "{debouncedSearchTerm.replace(/%/g, "")}"
                    {!countLoading &&
                      totalArtists > 0 &&
                      ` • Found ${totalArtists} artist${
                        totalArtists !== 1 ? "s" : ""
                      }`}
                  </p>
                </div>
              )}
            </div>

            {/* Buttons Column - Fixed alignment */}
            <div className="flex items-center gap-4 self-center md:self-start">
              <div className="text-sm text-muted-foreground whitespace-nowrap h-10 flex items-center">
                {countLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Counting...
                  </span>
                ) : isSearching ? (
                  <>
                    {totalArtists} result{totalArtists !== 1 ? "s" : ""}
                  </>
                ) : (
                  <>
                    {totalArtists} artist{totalArtists !== 1 ? "s" : ""} total
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State - Only for Artists Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 mb-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">
              {isSearching ? "Searching artists..." : "Loading artists..."}
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {isSearching
                ? "Error searching artists"
                : "Error loading artists"}
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
        ) : artists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 mb-12">
            <Users className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {isSearching ? "No artists found" : "No artists available"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {isSearching
                ? "Try a different search term or browse all artists."
                : "Check back later for new artists."}
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

            {/* Pagination - Only show if we have more than one page */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {artists.length} of {totalArtists}{" "}
                  {isSearching ? "search results" : "artists"}
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
            <h3 className="text-2xl font-bold text-center mb-8">
              Artist Community
            </h3>
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
        )}
      </div>
    </div>
  );
}
