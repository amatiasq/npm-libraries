const list = window.location.search
  .substr(1)
  .split('&')
  .map(x => x.split('='));

const params = new Map<string, string>(list as any);

export function getParam(name: string, def: string): string;
export function getParam(name: string, def: number): number;
export function getParam(name: string, def: string | number): string | number {
  if (!params.has(name)) return def;

  const value = params.get(name);
  if (typeof def === 'number') return parseFloat(value);

  return value;
}

export function getParams<T>(
  map: ParametersMap<T>,
  { log = false } = {},
): ParametersMap<T> {
  const result = {};

  Object.keys(map).forEach(key => {
    result[key] = getParam(key, map[key]);
  });

  if (log) {
    logParams(map, result as ParametersMap<T>);
  }

  return result as ParametersMap<T>;
}

function logParams<T>(defaults: ParametersMap<T>, actual: ParametersMap<T>) {
  const entries = Object.keys(defaults)
    .map(x => `  - ${x} = ${actual[x]} (default: ${defaults[x]})`)
    .join('\n');

  console.log(
    `You can use URL parameters in this page. Avalable options with current values:\n${entries}`,
  );
}

type ParametersMap<T> = { [P in keyof T]: T[P] };
