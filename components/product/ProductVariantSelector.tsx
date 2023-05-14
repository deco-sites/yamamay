import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product, product: { url: currentUrl } }: Props) {
  const possibilities = useVariantPossibilities(product);

  return (
    <ul class="flex flex-col gap-6 divide-y">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2 px-4 py-2">
          <span class="text-base">{name}</span>
          <ul class="flex flex-row gap-3">
            {Object.entries(possibilities[name]).map((
              [value, [{ available, url, id }]],
            ) => (
              <li>
                <a href={url}>
                  <Avatar
                    content={value}
                    variant={url === currentUrl ? "active" : "default"}
                  />
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
