import { format, register } from "timeago.js";

type LocaleFunc = (
  number: number,
  index: number,
  totalSec?: number,
) => [string, string];

const localeFunc: LocaleFunc = (number, index, totalSec?) => {
  const r: [string, string][] = [
    ["just now", "right now"],
    ["%s seconds ago", "in %s seconds"],
    ["1 minute ago", "in 1 minute"],
    ["%s minutes ago", "in %s minutes"],
    ["1 hour ago", "in 1 hour"],
    ["%s hours ago", "in %s hours"],
    ["1 day ago", "in 1 day"],
    ["%s days ago", "in %s days"],
    ["1 week ago", "in 1 week"],
    ["%s weeks ago", "in %s weeks"],
    ["1 month ago", "in 1 month"],
    ["%s months ago", "in %s months"],
    ["1 year ago", "in 1 year"],
    ["%s years ago", "in %s years"],
  ];
  return r[index] ?? ["", ""];
};

register("es", localeFunc);

export function formatTimeAgo(date: Date | string | number): string {
  return format(date, "en");
}
