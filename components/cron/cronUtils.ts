export class CronParseError extends Error {}

interface FieldRange {
  min: number;
  max: number;
  names?: Record<string, number>;
}

// Day-of-week allows 0-7 (both 0 and 7 mean Sunday) — 7 gets normalized to 0 below.
const MINUTE_RANGE: FieldRange = { min: 0, max: 59 };
const HOUR_RANGE: FieldRange = { min: 0, max: 23 };
const DOM_RANGE: FieldRange = { min: 1, max: 31 };
const MONTH_RANGE: FieldRange = {
  min: 1,
  max: 12,
  names: { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 },
};
const DOW_RANGE: FieldRange = {
  min: 0,
  max: 7,
  names: { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 },
};

const SPECIAL_STRINGS: Record<string, string> = {
  '@yearly': '0 0 1 1 *',
  '@annually': '0 0 1 1 *',
  '@monthly': '0 0 1 * *',
  '@weekly': '0 0 * * 0',
  '@daily': '0 0 * * *',
  '@midnight': '0 0 * * *',
  '@hourly': '0 * * * *',
};

export const FIELD_LABELS = ['minute', 'hour', 'day', 'month', 'weekday'];

export const resolveExpression = (expression: string): string[] => {
  const trimmed = expression.trim();
  if (!trimmed) throw new CronParseError('Enter a cron expression.');

  const resolved = SPECIAL_STRINGS[trimmed.toLowerCase()] || trimmed;
  const fields = resolved.split(/\s+/);
  if (fields.length !== 5) {
    throw new CronParseError(`Expected 5 fields (minute hour day month weekday), got ${fields.length}.`);
  }
  return fields;
};

const resolveToken = (token: string, range: FieldRange): number => {
  const lower = token.toLowerCase();
  if (range.names && lower in range.names) return range.names[lower];
  const num = Number(token);
  if (!Number.isInteger(num)) throw new CronParseError(`"${token}" isn't a valid value for this field.`);
  return num;
};

const parseField = (field: string, range: FieldRange, isDow: boolean): Set<number> => {
  const values = new Set<number>();

  for (const part of field.split(',')) {
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    let base = part;
    let step = 1;

    if (stepMatch) {
      base = stepMatch[1];
      step = parseInt(stepMatch[2], 10);
      if (!step || step < 1) throw new CronParseError(`Invalid step in "${part}".`);
    }

    let start = range.min;
    let end = range.max;

    if (base !== '*') {
      const rangeMatch = base.match(/^([\w]+)-([\w]+)$/);
      if (rangeMatch) {
        start = resolveToken(rangeMatch[1], range);
        end = resolveToken(rangeMatch[2], range);
      } else {
        start = end = resolveToken(base, range);
      }
    }

    if (start > end) throw new CronParseError(`Invalid range "${part}".`);

    for (let v = start; v <= end; v += step) {
      if (v < range.min || v > range.max) {
        throw new CronParseError(`"${part}" is out of range (${range.min}-${range.max}).`);
      }
      values.add(isDow && v === 7 ? 0 : v);
    }
  }

  if (values.size === 0) throw new CronParseError('Empty field.');
  return values;
};

export interface ParsedCron {
  minute: Set<number>;
  hour: Set<number>;
  dayOfMonth: Set<number>;
  month: Set<number>;
  dayOfWeek: Set<number>;
  domRestricted: boolean;
  dowRestricted: boolean;
}

export const parseCron = (expression: string): ParsedCron => {
  const [minuteStr, hourStr, domStr, monthStr, dowStr] = resolveExpression(expression);

  return {
    minute: parseField(minuteStr, MINUTE_RANGE, false),
    hour: parseField(hourStr, HOUR_RANGE, false),
    dayOfMonth: parseField(domStr, DOM_RANGE, false),
    month: parseField(monthStr, MONTH_RANGE, false),
    dayOfWeek: parseField(dowStr, DOW_RANGE, true),
    domRestricted: domStr !== '*',
    dowRestricted: dowStr !== '*',
  };
};

const MAX_ITERATIONS = 2 * 366 * 24 * 60; // ~2 years of minutes, safety cap for degenerate expressions

export const getNextRuns = (parsed: ParsedCron, count: number, from: Date = new Date()): Date[] => {
  const results: Date[] = [];
  const cursor = new Date(from);
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);

  let iterations = 0;
  while (results.length < count && iterations < MAX_ITERATIONS) {
    iterations++;

    const minute = cursor.getMinutes();
    const hour = cursor.getHours();
    const dom = cursor.getDate();
    const month = cursor.getMonth() + 1;
    const dow = cursor.getDay();

    const domMatch = parsed.dayOfMonth.has(dom);
    const dowMatch = parsed.dayOfWeek.has(dow);
    // Classic cron quirk: if BOTH day-of-month and day-of-week are restricted, a day
    // matches if EITHER matches (OR). If only one (or neither) is restricted, the
    // unrestricted field is always true, so a plain AND gives the same result.
    const dayMatches = parsed.domRestricted && parsed.dowRestricted ? domMatch || dowMatch : domMatch && dowMatch;

    if (parsed.minute.has(minute) && parsed.hour.has(hour) && parsed.month.has(month) && dayMatches) {
      results.push(new Date(cursor));
    }

    cursor.setMinutes(cursor.getMinutes() + 1);
  }

  return results;
};

const DOW_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const formatList = (values: (string | number)[]): string => {
  const items = values.map(String);
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
};

const detectStep = (sortedValues: number[], max: number): number | null => {
  if (sortedValues[0] !== 0 || sortedValues.length < 2) return null;
  const step = sortedValues[1] - sortedValues[0];
  if (step <= 0) return null;
  if (sortedValues.length !== Math.floor(max / step) + 1) return null;
  for (let i = 1; i < sortedValues.length; i++) {
    if (sortedValues[i] - sortedValues[i - 1] !== step) return null;
  }
  return step;
};

const describeTime = (parsed: ParsedCron): string => {
  const minutes = [...parsed.minute].sort((a, b) => a - b);
  const hours = [...parsed.hour].sort((a, b) => a - b);
  const allMinutes = minutes.length === 60;
  const allHours = hours.length === 24;

  if (allMinutes && allHours) return 'Every minute';

  const minuteStep = !allMinutes ? detectStep(minutes, 59) : null;
  const hourStep = !allHours ? detectStep(hours, 23) : null;

  if (allHours) {
    if (minuteStep && minuteStep > 1) return `Every ${minuteStep} minutes`;
    return minutes.length === 1
      ? `At minute ${minutes[0]} past every hour`
      : `At minutes ${formatList(minutes)} past every hour`;
  }

  if (allMinutes) {
    return `Every minute during hour${hours.length > 1 ? 's' : ''} ${formatList(hours)}`;
  }

  if (minutes.length === 1 && hourStep && hourStep > 1) {
    return `Every ${hourStep} hours, at minute ${minutes[0]}`;
  }

  const times: string[] = [];
  for (const h of hours) {
    for (const m of minutes) {
      times.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return times.length <= 6 ? `At ${formatList(times)}` : `At ${times.length} specific times throughout the day`;
};

const describeDays = (parsed: ParsedCron): string => {
  const doms = [...parsed.dayOfMonth].sort((a, b) => a - b);
  const dows = [...parsed.dayOfWeek].sort((a, b) => a - b).map((d) => DOW_NAMES[d]);

  if (!parsed.domRestricted && !parsed.dowRestricted) return 'every day';
  if (parsed.domRestricted && !parsed.dowRestricted) return `on day ${formatList(doms)} of the month`;
  if (!parsed.domRestricted && parsed.dowRestricted) return `on ${formatList(dows)}`;
  return `on day ${formatList(doms)} of the month, or on ${formatList(dows)} (whichever comes first)`;
};

const describeMonths = (parsed: ParsedCron): string => {
  const months = [...parsed.month].sort((a, b) => a - b);
  if (months.length === 12) return '';
  return ` in ${formatList(months.map((m) => MONTH_NAMES[m]))}`;
};

export const describeCron = (parsed: ParsedCron): string => {
  return `${describeTime(parsed)}, ${describeDays(parsed)}${describeMonths(parsed)}.`;
};
