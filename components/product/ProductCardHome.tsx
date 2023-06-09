import Image from "deco-sites/std/components/Image.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import WishlistIcon from "deco-sites/fashion/islands/WishlistButton.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Quickview from "deco-sites/yamamay/islands/Quickview.tsx";
import SkuSelectorAddToCartButton from "deco-sites/yamamay/islands/SkuSelectorAddToCartButton.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    // name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const { productGroupID, name } = isVariantOf ?? {};
  const [front, back] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);
  const possibilities = useVariantPossibilities(product);
  // console.log({ possibilities });
  const options = Object.entries(
    possibilities["Color"] ?? possibilities["Tamanho"] ?? {},
  );
  const hasDiscount = price !== listPrice;
  const discount = ((listPrice ?? 0) - (price ?? 0)) * 100 / (listPrice ?? 0);

  const id = `product-card-${productID}`;

  return (
    <div
      id={id}
      class="card card-compact group w-full rounded-none"
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
      <figure class="relative">
        <a href={url} aria-label="view product" class="contents">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={274}
            height={384}
            class=" w-full"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          {
            /* <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={200}
            height={279}
            class="rounded w-full hidden group-hover:block"
            sizes="(max-width: 640px) 50vw, 20vw"
          /> */
          }
        </a>
      </figure>
      <div class="py-2 gap-2">
        <h2 class="text-sm">{name}</h2>
        <div class="flex items-center gap-2">
          <span class={`${hasDiscount ? "text-primary" : ""}  text-base`}>
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
          {hasDiscount && (
            <span class="line-through text-neutral-300  text-base">
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </span>
          )}
          {hasDiscount && discount &&
            (
              <span class="text-sm">
                {Math.round(discount)}%
              </span>
            )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
