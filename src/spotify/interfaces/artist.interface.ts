export interface ArtistResponse {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    url: string;
    height: string;
    width: string;
  }[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}
