export interface Artist {
  id: string
  name: string
  description: string
  image: string
  slug: string
}

export interface ArtistsCollection {
  artistsCollection: {
    edges: Array<{
      node: Artist
    }>
  }
}