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