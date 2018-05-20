export function sortObjectKeys<T extends { [key: string]: string }>(
  obj: T,
  sortFn?: (a: string, b: string) => number,
): T {
  // tslint:disable-next-line:no-object-literal-type-assertion
  const result = {} as T;

  Object.keys(obj)
    .sort(sortFn)
    .forEach(key => (result[key] = obj[key]));

  return result;
}
