export interface DomainApiResponse {
  domains: {
    id: number;
    name: string;
    feeds?: { id: number }[];
  }[];
}
