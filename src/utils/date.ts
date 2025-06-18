import { toZonedTime, format } from "date-fns-tz";

const DEFAULT_TZ = "America/Argentina/Buenos_Aires";

export function toLocalISOString(date: Date | string, tz: string = DEFAULT_TZ) {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date) : date;
  return format(toZonedTime(d, tz), "yyyy-MM-dd'T'HH:mm:ssXXX", {
    timeZone: tz,
  });
}
