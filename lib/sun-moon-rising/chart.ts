import base from 'astronomia/base';
import { CalendarGregorian } from 'astronomia/julian';
import * as moonposition from 'astronomia/moonposition';
import * as nutation from 'astronomia/nutation';
import * as sidereal from 'astronomia/sidereal';
import * as solar from 'astronomia/solar';
import type { DateTime } from 'luxon';

export const TROPICAL_SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
] as const;

export type TropicalSign = (typeof TROPICAL_SIGNS)[number];

const TAU = 2 * Math.PI;

export function normalizeLongitudeRad(rad: number): number {
  let x = rad % TAU;
  if (x < 0) x += TAU;
  return x;
}

export function tropicalLongitudeRadToSign(lonRad: number): TropicalSign {
  const idx = Math.floor(normalizeLongitudeRad(lonRad) / (TAU / 12));
  return TROPICAL_SIGNS[idx]!;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

/** Swiss Ephemeris `VERY_SMALL` — swehouse.c */
const VERY_SMALL = 1e-15;

function sweDegnorm(deg: number): number {
  let x = deg % 360;
  if (x < 0) x += 360;
  return x;
}

/**
 * Asc2 from Swiss Ephemeris swehouse.c — ecliptic/longitude where a great circle
 * (here the horizon) cuts the ecliptic; angles in degrees.
 */
function ascendantAsc2Deg(
  xDeg: number,
  latitudeDegNorth: number,
  sineEps: number,
  cosEps: number,
): number {
  let ass =
    -Math.tan((latitudeDegNorth * Math.PI) / 180) * sineEps +
    cosEps * Math.cos((xDeg * Math.PI) / 180);
  if (Math.abs(ass) < VERY_SMALL) ass = 0;
  let sinx = Math.sin((xDeg * Math.PI) / 180);
  if (Math.abs(sinx) < VERY_SMALL) sinx = 0;
  if (sinx === 0) {
    ass = ass < 0 ? -VERY_SMALL : VERY_SMALL;
  } else if (ass === 0) {
    ass = sinx < 0 ? -90 : 90;
  } else {
    ass = (Math.atan(sinx / ass) * 180) / Math.PI;
  }
  if (ass < 0) ass += 180;
  return ass;
}

/**
 * Asc1 quadrant wrapper — Swiss Ephemeris swehouse.c.
 * For the ascendant, Swiss calls `Asc1(swe_degnorm(ARMCDeg + 90), lat, sin ε, cos ε)`.
 */
function ascendantAsc1Deg(
  x1Deg: number,
  latitudeDegNorth: number,
  sineEps: number,
  cosEps: number,
): number {
  const x1 = sweDegnorm(x1Deg);
  const n = Math.trunc(x1 / 90 + 1);
  const f = latitudeDegNorth;

  if (Math.abs(90 - f) < VERY_SMALL) return 180;
  if (Math.abs(90 + f) < VERY_SMALL) return 0;

  let ass: number;
  if (n === 1) ass = ascendantAsc2Deg(x1, f, sineEps, cosEps);
  else if (n === 2)
    ass = 180 - ascendantAsc2Deg(180 - x1, -f, sineEps, cosEps);
  else if (n === 3)
    ass = 180 + ascendantAsc2Deg(x1 - 180, -f, sineEps, cosEps);
  else ass = 360 - ascendantAsc2Deg(360 - x1, f, sineEps, cosEps);

  let out = sweDegnorm(ass);
  if (Math.abs(out - 90) < VERY_SMALL) out = 90;
  if (Math.abs(out - 180) < VERY_SMALL) out = 180;
  if (Math.abs(out - 270) < VERY_SMALL) out = 270;
  if (Math.abs(out - 360) < VERY_SMALL) out = 0;
  return out;
}

/** Julian UT and dynamical time from an instant interpreted as UTC by astronomia's CalendarGregorian. */
export function julianDaysFromUtc(dtUtc: DateTime): { jdUt: number; jde: number } {
  const js = dtUtc.toUTC().toJSDate();
  const utCal = new CalendarGregorian().fromDate(js);
  const jdUt = utCal.toJD();
  const dynCal = new CalendarGregorian().fromDate(js);
  const jde = dynCal.toJDE();
  return { jdUt, jde };
}

/**
 * Tropical ascendant from RAMC (local sidereal angle), true obliquity, and latitude.
 * Ports Swiss Ephemeris swehouse.c `Asc1(swe_degnorm(ARMCDeg + 90), φ, sin ε, cos ε)`.
 */
export function ascendantEclipticLongitudeRad(
  ramcRad: number,
  obliquityRad: number,
  latitudeNorthRad: number,
): number {
  const ramcDeg = sweDegnorm(radToDeg(ramcRad));
  const latDeg = radToDeg(latitudeNorthRad);
  const sineEps = Math.sin(obliquityRad);
  const cosEps = Math.cos(obliquityRad);
  const ascDeg = ascendantAsc1Deg(
    sweDegnorm(ramcDeg + 90),
    latDeg,
    sineEps,
    cosEps,
  );
  return normalizeLongitudeRad((ascDeg * Math.PI) / 180);
}

export type ChartAngles = {
  jdUt: number;
  jde: number;
  sunLongitudeDeg: number;
  moonLongitudeDeg: number;
  ascendantLongitudeDeg: number;
  sunSign: TropicalSign;
  moonSign: TropicalSign;
  risingSign: TropicalSign;
};

export function computeSunMoonRisingChart(input: {
  birthUtc: DateTime;
  latitudeDegNorth: number;
  longitudeDegEast: number;
}): ChartAngles {
  const { jdUt, jde } = julianDaysFromUtc(input.birthUtc);

  const T = base.J2000Century(jde);
  const sunLonRad = solar.trueLongitude(T).lon;
  const moonLonRad = moonposition.position(jde).lon;

  const gstSeconds = sidereal.apparent(jdUt);
  const gstRad = (gstSeconds / 86_400) * TAU;
  const lonEastRad = (input.longitudeDegEast * Math.PI) / 180;
  const ramcRad = gstRad + lonEastRad;

  const [, deltaEpsilon] = nutation.nutation(jde);
  const obliquityRad = nutation.meanObliquity(jde) + deltaEpsilon;
  const phiRad = (input.latitudeDegNorth * Math.PI) / 180;

  const ascLonRad = ascendantEclipticLongitudeRad(
    ramcRad,
    obliquityRad,
    phiRad,
  );

  return {
    jdUt,
    jde,
    sunLongitudeDeg: radToDeg(normalizeLongitudeRad(sunLonRad)),
    moonLongitudeDeg: radToDeg(normalizeLongitudeRad(moonLonRad)),
    ascendantLongitudeDeg: radToDeg(ascLonRad),
    sunSign: tropicalLongitudeRadToSign(sunLonRad),
    moonSign: tropicalLongitudeRadToSign(moonLonRad),
    risingSign: tropicalLongitudeRadToSign(ascLonRad),
  };
}
