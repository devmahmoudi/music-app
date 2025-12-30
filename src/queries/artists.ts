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