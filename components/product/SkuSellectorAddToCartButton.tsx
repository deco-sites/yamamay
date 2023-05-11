import {
  Options as UseAddToCartProps,
} from "deco-sites/yamamay/sdk/useAddToCart.ts";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";

import { useSignal } from "@preact/signals";
import QuantitySelector from "deco-sites/yamamay/islands/QuantitySelector.tsx";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import AddToCartButton from "deco-sites/yamamay/islands/AddToCartButton.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

// import ProductVariantSelector from 'deco-sites/yamamay/Pro'

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  text?: string;
  variant?: "secondary" | "icon" | "primary" | "tertiary" | "green";
  product: Product;
}

function SkuSellectorAddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    text = "Adicionar à Sacola",
    variant = "secondary",
    product,
  }: Props,
) {
  const quantity = useSignal(1);
  const possibilities = useVariantPossibilities(product);

  return (
    <div class="flex flex-col w-full gap-4">
      <div class="hidden lg:flex">
        <QuantitySelector
          disabled={price === 0}
          quantity={quantity.value}
          onChange={(newQuantity) => {
            quantity.value = newQuantity;
          }}
        />
      </div>
      <div class="flex lg:hidden">
        <ul class="flex flex-col gap-6 divide-y">
          {Object.keys(possibilities).map((name) => (
            <li class="flex flex-col gap-2 px-4 py-2">
              <span class="text-base">{name}</span>
              <ul class="flex flex-row gap-3">
                {Object.entries(possibilities[name]).map(([value, [link]]) => (
                  <li>
                    <a
                      href={link}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Avatar
                        content={value}
                        variant={link === url ? "active" : "default"}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <AddToCartButton
        skuId={skuId}
        sellerId={sellerId}
        price={price ?? 0}
        discount={discount}
        name={name}
        productGroupId={productGroupId}
        quantity={quantity.value}
      />
    </div>
  );
}

export default SkuSellectorAddToCartButton;
