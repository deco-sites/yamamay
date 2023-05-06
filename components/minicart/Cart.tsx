import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";

import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

const CHECKOUT_URL = "https://yamamay.vtexcommercestable.com.br/checkout";

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading, mapItemsToAnalyticsItems } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;
  const subtotal = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col  items-center h-full gap-6">
        <span class="font-medium text-base text-[#c8c8c8] max-w-[260px] text-center">
          There is (still) nothing here. What would you like to buy today?
        </span>
      </div>
    );
  }

  const total = (subtotal?.value ?? 0) + (discounts?.value ?? 0);

  return (
    <div class="flex flex-col justify-between flex-1">
      {/* Cart Items */}
      <ul
        role="list"
        class="lg:mt-6 flex-grow overflow-y-auto flex flex-col gap-6 border-b px-3 lg:px-6 max-h-[calc(100vh_-_360px)] divide-y divide-base-300"
      >
        {cart.value.items.map((_, index) => (
          <li>
            <CartItem index={index} key={index} />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer>
        {/* subtotal */}
        {subtotal?.value && (
          <div class="flex flex-col justify-end items-end gap-2 mx-4">
            <div class="flex items-center w-full">
              <span class="inline-flex w-full max-w-[70%] justify-end text-lg">
                Subtotal
              </span>
              <span class="font-bold text-lg inline-flex justify-end w-full max-w-[30%]">
                {formatPrice(subtotal.value / 100, currencyCode!, locale)}
              </span>
            </div>
          </div>
        )}
        {/* Subtotal */}
        <div class=" flex flex-col gap-4">
          {discounts?.value && (
            <div class="flex justify-between items-center px-4">
              <span class="inline-flex text-lg max-w-[70%] w-full  justify-end">
                Discount
              </span>
              <span class="inline-flex font-bold text-lg w-full  justify-end max-w-[30%]">
                {formatPrice(discounts.value / 100, currencyCode!, locale)}
              </span>
            </div>
          )}
        </div>
        {/* Total */}
        {total && (
          <div class="pb-5 flex flex-col justify-end items-end gap-2 mx-4">
            <div class="flex items-center w-full">
              <span class="inline-flex w-full max-w-[70%] justify-end text-lg">
                Total
              </span>
              <span class="font-bold text-lg inline-flex justify-end w-full max-w-[30%]">
                {formatPrice(total / 100, currencyCode!, locale)}
              </span>
            </div>
          </div>
        )}
        <div class="">
          <Button
            class="w-full text-black bg-transparent hover:bg-black hover:text-white rounded-none text-lg font-bold normal-case"
            onClick={() => {
              displayCart.value = false;
            }}
          >
            Continue Shopping
          </Button>
          <a
            class="inline-block w-full"
            target="_blank"
            href={`${CHECKOUT_URL}?orderFormId=${cart.value!.orderFormId}`}
          >
            <Button
              data-deco="buy-button"
              class="w-full text-primary bg-transparent hover:bg-black rounded-none text-lg normal-case"
              disabled={loading.value || cart.value.items.length === 0}
              onClick={() => {
                window.DECO_SITES_STD.sendAnalyticsEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: subtotal?.value
                      ? (subtotal?.value - (discounts?.value ?? 0)) / 100
                      : 0,
                    coupon: cart.value?.marketingData?.coupon ?? undefined,

                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });
              }}
            >
              Go To Checkout
            </Button>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Cart;
