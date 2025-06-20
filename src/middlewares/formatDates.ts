import { Request, Response, NextFunction } from "express";
import { toLocalISOString } from "../utils/date";

const DATE_KEYS = ["createdAt", "updatedAt", "deadline"];

function formatDatesDeep(obj: any, tz?: string): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => formatDatesDeep(item, tz));
  } else if (obj && typeof obj === "object") {
    const newObj: any = {};
    for (const key of Object.keys(obj)) {
      if (DATE_KEYS.includes(key) && obj[key]) {
        newObj[key] = toLocalISOString(obj[key], tz);
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        newObj[key] = formatDatesDeep(obj[key], tz);
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }
  return obj;
}

export function formatDatesMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const oldJson = res.json;
  res.json = function (data: any) {
    const tz = req.headers["x-timezone"] as string | undefined;
    const formatted = formatDatesDeep(data, tz);
    return oldJson.call(this, formatted);
  };
  next();
}
