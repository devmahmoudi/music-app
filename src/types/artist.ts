export interface Artist {
  id: string
  name: string
  description: string
  image: string
  slug: string
  created_at?: string
}

export interface ArtistDetail extends Artist {
  location?: string
  genre?: string
  website?: string
  social_links?: string
  updated_at?: string
}

export interface ArtistsCollection {
  artistsCollection: {
    edges: Array<{
      node: Artist
      cursor: string
    }>
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string | null
      endCursor: string | null
    }
  }
}

export interface ArtistsCount {
  artistsCollection: {
    edges: Array<{
      node: {
        id: string
      }
    }>
  }
}

export interface ArtistDetailResponse {
  artistsCollection: {
    edges: Array<{
      node: ArtistDetail
    }>
  }
}

export interface Track {
  id: string
  title: string
  duration: number
  album: string
  release_date: string
  plays: number
  likes: number
  audio_url: string
  cover_image: string
}

export interface ArtistTracksResponse {
  tracksCollection: {
    edges: Array<{
      node: Track
      cursor: string
    }>
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string | null
      endCursor: string | null
    }
  }
}