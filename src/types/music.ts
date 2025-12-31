export interface Music {
  id: string
  name: string
  slug: string
  lyrics: string | null
  image: string | null
  file: string
  artist_id: string
  created_at: string
  updated_at: string
}

export interface MusicDetail extends Music {
  artist?: {
    id: string
    name: string
    slug: string
    image: string | null
  }
}

export interface MusicsCollection {
  musicsCollection: {
    edges: Array<{
      node: Music
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

export interface MusicsCount {
  musicsCollection: {
    edges: Array<{
      node: {
        id: string
      }
    }>
  }
}