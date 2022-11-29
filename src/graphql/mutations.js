/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPodcast = /* GraphQL */ `
  mutation CreatePodcast(
    $input: CreatePodcastInput!
    $condition: ModelPodcastConditionInput
  ) {
    createPodcast(input: $input, condition: $condition) {
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
export const updatePodcast = /* GraphQL */ `
  mutation UpdatePodcast(
    $input: UpdatePodcastInput!
    $condition: ModelPodcastConditionInput
  ) {
    updatePodcast(input: $input, condition: $condition) {
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
export const deletePodcast = /* GraphQL */ `
  mutation DeletePodcast(
    $input: DeletePodcastInput!
    $condition: ModelPodcastConditionInput
  ) {
    deletePodcast(input: $input, condition: $condition) {
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
