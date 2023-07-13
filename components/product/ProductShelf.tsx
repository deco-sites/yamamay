import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import { SendEventOnLoad } from "deco-sites/fashion/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
}

function ProductShelf({
  title,
  products,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      class="container flex flex-col pb-10 pt-3 px-0 gap-2"
    >
      <h2 class="text-center row-start-1 col-span-full">
        <span class="font-bold text-4xl">{title}</span>
      </h2>
      <div class="relative">
        <Slider class="carousel carousel-center sm:carousel-end">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item max-w-[70%] w-[70%] sm:max-w-[25%] sm:w-[25%] px-1  sm:px-3 box-border"
            >
              <ProductCard product={product} itemListName={title} />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden absolute top-1/2 left-0 -translate-y-1/2 sm:block z-10 ">
            <Slider.PrevButton class="px-3">
              <Icon size={30} id="ChevronLeft" strokeWidth={1} />
            </Slider.PrevButton>
          </div>
          <div class="hidden absolute top-1/2 right-0 -translate-y-1/2 sm:block z-10">
            <Slider.NextButton class="px-3">
              <Icon size={30} id="ChevronRight" strokeWidth={1} />
            </Slider.NextButton>
          </div>
        </>
        <SliderJS rootId={id} infinite />
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </div>
  );
}

export default ProductShelf;
