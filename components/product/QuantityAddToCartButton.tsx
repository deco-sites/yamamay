import {
  Options as UseAddToCartProps,
} from "deco-sites/yamamay/sdk/useAddToCart.ts";
import { useSignal } from "@preact/signals";
import QuantitySelector from "deco-sites/yamamay/islands/QuantitySelector.tsx";
import AddToCartButton from "deco-sites/yamamay/islands/AddToCartButton.tsx";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  text?: string;
  variant?: "secondary" | "icon" | "primary" | "tertiary" | "green";
}

function QuantityAddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    text = "Adicionar à Sacola",
    variant = "secondary",
  }: Props,
) {
  const quantity = useSignal(1);

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

export default QuantityAddToCartButton;
