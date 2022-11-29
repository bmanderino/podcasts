/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPodcast = /* GraphQL */ `
  query GetPodcast($id: ID!) {
    getPodcast(id: $id) {
      id
      title
      feed
      urlString
      description
      createdAt
      updatedAt
    }
  }
`;
export const listPodcasts = /* GraphQL */ `
  query ListPodcasts(
    $filter: ModelPodcastFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPodcasts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        feed
        urlString
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
