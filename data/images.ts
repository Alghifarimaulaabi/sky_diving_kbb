/** Central photo registry — cinematic underwater photography.
 *  Local AI-generated assets in /public/images/photos (replaceable). */

const P = (f: string) => `/images/photos/${f}`;

export const PHOTOS = {
  hero: P("hero.png"),
  heroAlt: "Scuba diver drifting in deep blue water with sun rays from the surface",
  pool: P("pool.png"),
  reef1: P("reef1.png"),
  reef2: P("reef2.png"),
  buddy: P("buddy.png"),
  community1: P("community1.png"),
  community2: P("community2.png"),
  deepwall: P("deepwall.png"),
  nightdive: P("nightdive.png"),
  cleanup: P("cleanup.png"),
  turtle: P("turtle.png"),
  wreck: P("wreck.png"),
  surface: P("surface.png"),
} as const;

/** Photo sets used by cards. */
export const COURSE_PHOTOS = {
  beginner: [PHOTOS.pool, PHOTOS.reef1, PHOTOS.surface],
  advanced: [PHOTOS.deepwall, PHOTOS.wreck, PHOTOS.nightdive, PHOTOS.reef2],
};

export const EVENT_PHOTOS = [
  PHOTOS.reef1,
  PHOTOS.turtle,
  PHOTOS.pool,
  PHOTOS.deepwall,
  PHOTOS.cleanup,
];

export const COMMUNITY_PHOTOS = [
  PHOTOS.community1,
  PHOTOS.community2,
  PHOTOS.cleanup,
  PHOTOS.turtle,
];
