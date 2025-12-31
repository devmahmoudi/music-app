import { gql } from "@apollo/client"

// Get paginated music
export const GET_MUSICS_PAGINATED = gql`
  query GetMusicsPaginated($first: Int, $after: Cursor, $last: Int, $before: Cursor) {
    musicsCollection(
      first: $first,
      after: $after,
      last: $last,
      before: $before,
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

// Get music count
export const GET_MUSICS_COUNT = gql`
  query GetMusicsCount {
    musicsCollection {
      edges {
        node {
          id
        }
      }
    }
  }
`

// Search music
export const SEARCH_MUSICS = gql`
  query SearchMusics($search: String!, $first: Int, $after: Cursor) {
    musicsCollection(
      first: $first,
      after: $after,
      filter: { name: { ilike: $search } }
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

// Search music count
export const SEARCH_MUSICS_COUNT = gql`
  query SearchMusicsCount($search: String!) {
    musicsCollection(filter: { name: { ilike: $search } }) {
      edges {
        node {
          id
        }
      }
    }
  }
`

// Get single music by slug with artist info
export const GET_MUSIC_BY_SLUG = gql`
  query GetMusicBySlug($slug: String!) {
    musicsCollection(filter: { slug: { eq: $slug } }, first: 1) {
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
      }
    }
  }
`

// Get music by ID
export const GET_MUSIC_BY_ID = gql`
  query GetMusicById($id: BigInt!) {
    musicsCollection(filter: { id: { eq: $id } }, first: 1) {
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
      }
    }
  }
`

// Get artist info for music
export const GET_ARTIST_FOR_MUSIC = gql`
  query GetArtistForMusic($artistId: BigInt!) {
    artistsCollection(filter: { id: { eq: $artistId } }, first: 1) {
      edges {
        node {
          id
          name
          slug
          image
        }
      }
    }
  }
`

// Get featured music (latest 8 tracks)
export const GET_FEATURED_MUSICS = gql`
  query GetFeaturedMusics {
    musicsCollection(
      first: 8,
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