import type { Product } from "deco-sites/std/commerce/types.ts";

const noVariations = [
  "cluster",
  "category",
  "Taglia",
];

export const useVariantPossibilities = (
  { url: productUrl, isVariantOf }: Product,
) => {
  const allProperties = (isVariantOf?.hasVariant ?? [])
    .flatMap(({ offers, additionalProperty = [], url }) =>
      additionalProperty.map(
        (property) => ({
          property,
          url,
          available: offers?.offers.some((offer) =>
            offer.availability != "https://schema.org/OutOfStock"
          ),
        }),
      )
    )
    .filter((x) => x.url)
    .sort((a, b) => a.url! < b.url! ? -1 : a.url === b.url ? 0 : 1).filter((
      { property },
    ) => !noVariations.includes(property.name ?? ""));

  const possibilities = allProperties.reduce(
    (acc, { property, url, available = false }) => {
      const { name = "", value = "" } = property;

      if (!acc[name]) {
        acc[name] = {};
      }

      if (!acc[name][value]) {
        acc[name][value] = [];
      }

      if (url) {
        // prefer current url first to easy selector implementation
        url === productUrl
          ? acc[name][value].unshift({
            available,
            url,
            id: Number(url.split("/p?skuId=")[1]),
          })
          : acc[name][value].push({
            available,
            url,
            id: Number(url.split("/p?skuId=")[1]),
          });
      }

      return acc;
    },
    {} as Record<
      string,
      Record<string, Array<{ available: boolean; url: string; id: number }>>
    >,
  );

  // console.log(possibilities);
  return possibilities;
};
