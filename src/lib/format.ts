/** Currency & number formatting helpers — IDR based (Indonesian brand). */

export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactIDR(value: number): string {
  if (value >= 1_000_000) {
    const juta = value / 1_000_000;
    return `Rp ${juta % 1 === 0 ? juta.toFixed(0) : juta.toFixed(1)} jt`;
  }
  if (value >= 1_000) {
    return `Rp ${Math.round(value / 1_000)}rb`;
  }
  return `Rp ${value}`;
}

/** Whole days between two ISO date strings (min 1). Returns null if invalid/absent. */
export function rentDays(
  startDate?: string | null,
  endDate?: string | null
): number | null {
  if (!startDate || !endDate) return null;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  const diff = end.getTime() - start.getTime();
  if (diff < 0) return null;
  return Math.max(1, Math.round(diff / 86_400_000) + 1);
}

export function formatDateLabel(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function todayISO(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}
