import { Music } from "@/types/music"
import { gql } from "@apollo/client"

export const GET_FEATURED_ARTISTS = gql`
  query GetFeaturedArtists {
    artistsCollection(last: 6) {
      edges {
        node {
          id
          name
          description
          image
          slug
        }
      }
    }
  }
`

export const GET_ARTISTS_PAGINATED = gql`
  query GetArtistsPaginated($first: Int, $after: Cursor, $last: Int, $before: Cursor) {
    artistsCollection(
      first: $first,
      after: $after,
      last: $last,
      before: $before,
      orderBy: { name: AscNullsLast }
    ) {
      edges {
        node {
          id
          name
          description
          image
          slug
          created_at
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

export const GET_ARTISTS_COUNT = gql`
  query GetArtistsCount {
    artistsCollection {
      edges {
        node {
          id
        }
      }
    }
  }
`

export const SEARCH_ARTISTS = gql`
  query SearchArtists($search: String!, $first: Int, $after: Cursor) {
    artistsCollection(
      first: $first,
      after: $after,
      filter: { name: { ilike: $search } }
    ) {
      edges {
        node {
          id
          name
          description
          image
          slug
          created_at
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

export const SEARCH_ARTISTS_COUNT = gql`
  query SearchArtistsCount($search: String!) {
    artistsCollection(filter: { name: { ilike: $search } }) {
      edges {
        node {
          id
        }
      }
    }
  }
`

export const GET_ARTIST_BY_SLUG = gql`
  query GetArtistBySlug($slug: String!) {
    artistsCollection(filter: { slug: { eq: $slug } }, first: 1) {
      edges {
        node {
          id
          name
          description
          image
          slug
          created_at
          updated_at
          # Note: Add these fields back after you add them to your database
          # location
          # genre
          # website
          # social_links
        }
      }
    }
  }
`

export const GET_ARTIST_TRACKS = gql`
  query GetArtistTracks($artistId: BigInt!, $first: Int, $after: Cursor) {
    tracksCollection(
      filter: { artist_id: { eq: $artistId } }
      first: $first
      after: $after
      orderBy: [{ release_date: DescNullsLast }]
    ) {
      edges {
        node {
          id
          title
          duration
          album
          release_date
          plays
          likes
          audio_url
          cover_image
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// ... existing queries ...

// Query to get artist's music (using musics table)
export const GET_ARTIST_MUSICS = gql`
  query GetArtistMusics($artistId: BigInt!, $first: Int, $after: Cursor) {
    musicsCollection(
      filter: { artist_id: { eq: $artistId } }
      first: $first
      after: $after
      orderBy: [{ created_at: DescNullsLast }]
    ) {
      edges {
        node {
          id
          name
          slug
          lyrics
          image
          file
          artist_id
          created_at
          updated_at
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// Update the response type
export interface ArtistMusicsResponse {
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