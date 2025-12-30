import React from "react"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react"
import { SetContextLink } from "@apollo/client/link/context";

const supabaseGraphqlUrl = import.meta.env.VITE_SUPABASE_GRAPHQL_URL

if (!supabaseGraphqlUrl) {
  console.error("Missing VITE_SUPABASE_GRAPHQL_URL environment variable")
}

// Create an http link:
const httpLink = new HttpLink({
  uri: supabaseGraphqlUrl,
});

// Create a middleware link to set the headers
const authLink = new SetContextLink(({ headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
    },
  };
});

// Create Apollo Client instance (simplified)
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

interface SupabaseProviderProps {
  children: React.ReactNode
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export { client }