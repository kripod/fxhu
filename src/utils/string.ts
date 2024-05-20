import uFuzzy from "@leeoniya/ufuzzy";

const uf = new uFuzzy({ intraMode: 1 satisfies uFuzzy.IntraMode.SingleError });

export function fuzzySearch(haystack: readonly string[], needle: string) {
  const [haystackIndexes, , orderIndexes] = uf.search(
    haystack as string[], // TODO: Remove assertion
    needle,
  );
  return orderIndexes != null
    ? orderIndexes.map((index) => haystackIndexes[index]!)
    : haystackIndexes;
}
