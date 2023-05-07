import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import SendEventOnLoad from "deco-sites/fashion/components/SendEventOnLoad.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[][] | null>;
  itemsPerPage?: number;
  shelfTitles: string[];
}

function ProductShelf({
  products,
  title,
}: { products: Product[]; title: string }) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      class="container grid grid-cols-[48px_1fr_48px] grid-rows-[48px_1fr_48px_1fr] py-10 px-0 sm:px-5"
    >
      <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
        {products?.map((product, index) => (
          <Slider.Item
            index={index}
            class="carousel-item w-[270px] sm:w-[292px] first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
          >
            <ProductCard product={product} itemListName={title} />
          </Slider.Item>
        ))}
      </Slider>

      <>
        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
          <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
            <Icon size={20} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
            <Icon size={20} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>
      </>
      <SliderJS rootId={id} />
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

function TabbedShelf({
  title,
  products,
  shelfTitles,
}: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="flex flex-col py-10 px-0 sm:px-5 gap-[32px]">
      <h2 class="text-center">
        <span class="uppercase">{title}</span>
      </h2>

      <div class="">
        {
          /* <input type="radio" id="tab2" name="css-tabs" class="hidden" />
        <input type="radio" id="tab3" name="css-tabs" class="hidden" />
        <input type="radio" id="tab4" name="css-tabs" class="hidden" /> */
        }

        {shelfTitles?.map((_, index) => (
          <input
            type="radio"
            id={`tab${index}`}
            name="css-tabs"
            class="hidden"
            checked={index === 0}
          />
        ))}

        <ul class="flex w-full sm:justify-center overflow-x-auto">
          {shelfTitles?.map((shelfTitle, index) => (
            <li class="tab p-[10px] border-b-[4px] border-default">
              <label for={`tab${index}`} class="px-[24px] whitespace-nowrap">
                {shelfTitle}
              </label>
            </li>
          ))}
        </ul>

        {products?.map((shelf, index) => (
          <div class="">
            <ProductShelf products={shelf} title={shelfTitles[index]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabbedShelf;
