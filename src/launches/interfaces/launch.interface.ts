export interface ILaunch {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: 'half' | 'quarter' | 'year' | 'month' | 'day' | 'hour';
  static_fire_date_utc?: string;
  static_fire_date_unix?: number;
  tdb?: boolean;
  net?: boolean;
  window: number | null;
  rocket: {
    flickr_images: string[];
    name: string;
    wikipedia: string;
    description: string;
  };
  success?: boolean;
  failures: {
    time: number;
    altitude: number;
    reason: string;
  }[];
  upcoming: boolean;
  details: string | null;
  fairings: {
    reused?: boolean;
    recovery_attempt?: boolean;
    recovered?: boolean;
    ships: string[];
  };
  crew: {
    crew: {
      name: string;
      agency: string;
      image: string;
      wikipedia: string;
      launches: string[];
      status: string;
      id: string;
    };
    role: string | null;
  }[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string | null;
  cores: {
    core: string | null;
    flight: number | null;
    gridfins?: boolean;
    legs?: boolean;
    reused?: boolean;
    landing_attempt?: boolean;
    landing_success?: boolean;
    landing_type: string | null;
    landpad: string | null;
  }[];
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    reddit: {
      campaign: string | null;
      launch: string | null;
      media: string | null;
      recovery: string | null;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string;
}
