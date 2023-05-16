import { useComputed, useSignal } from "@preact/signals";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { useWishlist } from "deco-sites/std/packs/vtex/hooks/useWishlist.ts";
import { useUser } from "deco-sites/std/packs/vtex/hooks/useUser.ts";

interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
  size?: number;
}

function WishlistButton({
  variant = "icon",
  productGroupID,
  productID,
  size = 24,
}: Props) {
  const user = useUser();
  const item = { sku: productID, productId: productGroupID };
  const { loading, addItem, removeItem, getItem } = useWishlist();
  const listItem = useComputed(() => getItem(item));
  const fetching = useSignal(false);

  const isUserLoggedIn = Boolean(user.value?.email);
  const inWishlist = Boolean(listItem.value);

  return (
    <Button
      class={variant === "icon"
        ? "btn-circle btn-ghost group/wishlist"
        : "btn-outline"}
      loading={fetching.value}
      aria-label="Add to wishlist"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isUserLoggedIn) {
          window.alert("Please log in before adding to your wishlist");

          return;
        }

        if (loading.value) {
          return;
        }

        try {
          fetching.value = true;
          inWishlist
            ? await removeItem(listItem.value!.id)
            : await addItem(item);
        } finally {
          fetching.value = false;
        }
      }}
    >
      <Icon
        id="Heart"
        size={size}
        strokeWidth={2}
        fill={inWishlist ? "black" : "none"}
      />
      {variant === "icon"
        ? (
          <span class="absolute underline font-normal opacity-0 normal-case text-xs bg-white transition-all px-1 py-[2px] group-hover/wishlist:opacity-100 group-hover/wishlist:-translate-x-full">
            Wishlist
          </span>
        )
        : inWishlist
        ? "Remover"
        : "Favoritar"}
    </Button>
  );
}

export default WishlistButton;
