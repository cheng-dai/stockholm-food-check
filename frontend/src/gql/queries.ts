import { gql } from "@apollo/client";

export const GET_ESTABLISHMENTS = gql`
  query GetEstablishments {
    establishments {
      id
      name
      address
      latitude
      longitude
    }
  }
`;

export const GET_ESTABLISHMENT = gql`
  query GetEstablishment($id: Int!) {
    establishment(id: $id) {
      id
      name
      address
      latitude
      longitude
    }
  }
`;

export const GET_ESTABLISHMENTS_BY_SEARCH_TERM = gql`
  query GetEstablishmentsBySearchTerm($searchTerm: String!) {
    establishmentsBySearchTerm(searchTerm: $searchTerm) {
      id
      name
      address
      latitude
      longitude
    }
  }
`;
