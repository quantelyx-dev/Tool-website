declare module 'tz-lookup' {
  /** Returns an IANA timezone for WGS84 latitude/longitude (north/east degrees). */
  export default function tzLookup(latitude: number, longitude: number): string;
}

declare module 'astronomia/base' {
  const base: {
    J2000Century(jde: number): number;
    pmod(a: number, b: number): number;
    horner(x: number, ...coeffs: number[]): number;
  };
  export default base;
}

declare module 'astronomia/julian' {
  export class CalendarGregorian {
    constructor(year?: number, month?: number, day?: number);
    fromDate(date: Date): this;
    toJD(): number;
    toJDE(): number;
  }
}

declare module 'astronomia/moonposition' {
  export function position(jde: number): { lon: number; lat: number; range: number };
}

declare module 'astronomia/nutation' {
  export function nutation(jde: number): [number, number];
  export function meanObliquity(jde: number): number;
}

declare module 'astronomia/sidereal' {
  export function apparent(jd: number): number;
}

declare module 'astronomia/solar' {
  export function trueLongitude(T: number): { lon: number; ano: number };
}

declare module 'node-geocoder' {
  export type NodeGeocoderOpenStreetMapOptions = {
    provider: 'openstreetmap';
    osmServer?: string;
    fetch?: typeof fetch;
    headers?: Record<string, string | undefined>;
    signal?: AbortSignal;
    language?: string;
    email?: string;
    apiKey?: string;
  };

  export type NodeGeocoderOptions = NodeGeocoderOpenStreetMapOptions;

  export type GeocodeResult = {
    latitude?: number;
    longitude?: number;
    formattedAddress?: string;
  };

  export interface NodeGeocoderInstance {
    geocode(
      value: string,
      callback?: (err: Error | false, result: GeocodeResult[]) => void,
    ): Promise<GeocodeResult[]>;
  }

  function createGeocoder(options: NodeGeocoderOptions): NodeGeocoderInstance;
  export default createGeocoder;
}
