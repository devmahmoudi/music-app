export interface Artist {
  id: string
  name: string
  description: string
  image: string
  slug: string
}

export interface Artist {
  id: string
  name: string
  description: string
  image: string
  slug: string
  created_at?: string
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