import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "deco-sites/fashion/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  quantity?: number;
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name, quantity }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    quantity,
  });

  return (
    <Button
      data-deco="add-to-cart"
      {...props}
      class="w-full bg-primary text-white border-none rounded-none font-normal hover:bg-primary text-lg"
    >
      Add to Cart
    </Button>
  );
}

export default AddToCartButton;
