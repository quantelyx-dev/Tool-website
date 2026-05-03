import NodeGeocoder from 'node-geocoder';

export type GeocodeHit = {
  latitude: number;
  longitude: number;
  displayName: string;
};

export type GeocodeFailureReason =
  | 'no_results'
  | 'bad_response'
  | 'network';

function nominatimGeocoder() {
  const ua =
    process.env.NOMINATIM_USER_AGENT ??
    'tools-app-dev-sun-moon-rising (set NOMINATIM_USER_AGENT for production)';

  return NodeGeocoder({
    provider: 'openstreetmap',
    osmServer: 'https://nominatim.openstreetmap.org',
    fetch: globalThis.fetch.bind(globalThis),
    headers: {
      'user-agent': ua,
      accept: 'application/json',
    },
    signal: AbortSignal.timeout(12_000),
  });
}

export async function geocodeWithNominatim(
  query: string,
): Promise<
  | { ok: true; hit: GeocodeHit }
  | { ok: false; reason: GeocodeFailureReason }
> {
  const trimmed = query.trim();
  try {
    const rows = await nominatimGeocoder().geocode(trimmed);
    const top = rows[0];
    const lat = top?.latitude;
    const lon = top?.longitude;
    if (
      lat === undefined ||
      lon === undefined ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lon)
    ) {
      return { ok: false, reason: 'no_results' };
    }

    return {
      ok: true,
      hit: {
        latitude: lat,
        longitude: lon,
        displayName: top.formattedAddress ?? trimmed,
      },
    };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
