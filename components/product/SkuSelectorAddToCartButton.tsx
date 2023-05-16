import {
  Options as UseAddToCartProps,
} from "deco-sites/yamamay/sdk/useAddToCart.ts";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";

import { useSignal } from "@preact/signals";
import QuantitySelector from "deco-sites/yamamay/islands/QuantitySelector.tsx";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import AddToCartButton from "deco-sites/yamamay/islands/AddToCartButton.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";

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

function SkuSelectorAddToCartButton(
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
  const selectedSku = useSignal(Number(product.sku));
  const possibilities = useVariantPossibilities(product);

  //
  return (
    <div class="flex flex-col w-full gap-4">
      {
        /* <div class="hidden lg:flex">
        <QuantitySelector
          disabled={price === 0}
          quantity={quantity.value}
          onChange={(newQuantity) => {
            quantity.value = newQuantity;
          }}
        />
      </div> */
      }
      <div class="flex flex-col">
        <div class="flex ">
          <ul class="flex relative w-full border divide-x">
            {Object.keys(possibilities).filter((name) =>
              name !== "Personalization"
            ).map((name) => (
              <li class="flex w-full flex-col ">
                <input
                  type="radio"
                  name="variation"
                  id={`${name}-${product.productID}`}
                  class="peer hidden"
                />
                <label
                  htmlFor={`${name}-${product.productID}`}
                  class="w-full px-2 py-2 flex justify-between"
                >
                  <span class="text-xs">{name}</span>
                  <Icon
                    id="ChevronDown"
                    width={20}
                    height={20}
                    strokeWidth={1}
                  />
                </label>
                <ul class="absolute -translate-y-full left-0 right-0 border w-full flex flex-row gap-3 bg-white p-2 invisible transition-all peer-checked:visible">
                  {Object.entries(possibilities[name]).map((
                    [value, [{ available, url, id }]],
                  ) => (
                    <li>
                      <button
                        onClick={() => {
                          // console.log(id);
                          selectedSku.value = id;
                        }}
                      >
                        <Avatar
                          content={value}
                          variant={selectedSku.value === id
                            ? "active"
                            : "default"}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <AddToCartButton
          skuId={String(selectedSku.value)}
          sellerId={sellerId}
          price={price ?? 0}
          discount={discount}
          name={name}
          productGroupId={productGroupId}
          quantity={quantity.value}
        />
      </div>
    </div>
  );
}

export default SkuSelectorAddToCartButton;
