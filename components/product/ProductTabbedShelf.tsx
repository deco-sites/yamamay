import ProductCardHome from "deco-sites/fashion/components/product/ProductCardHome.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import SendEventOnLoad from "deco-sites/fashion/components/SendEventOnLoad.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  title: string;
  products: Product[][] | null;
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
      class="relative grid grid-cols-[48px_1fr_48px] grid-rows-[1fr_48px_1fr] py-10 px-0 sm:px-5"
    >
      <Slider class="carousel carousel-center sm:carousel-end col-span-full row-start-1 row-end-5">
        {products?.map((product, index) => (
          <Slider.Item
            index={index}
            class="carousel-item max-w=[225px] w-[225px] sm:w-[225px] first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0 px-1"
          >
            <ProductCardHome product={product} itemListName={title} />
          </Slider.Item>
        ))}
      </Slider>

      <div class="flex items-center justify-center z-10 absolute top-1/2 -translate-y-1/2 left-0">
        <Slider.PrevButton class="btn rounded-none text-black border-transparent bg-[hsla(0,0%,100%,.9)]  disabled:lg:opacity-50 lg:hover:bg-transparent lg:hover:border-transparent">
          <Icon
            class=""
            size={30}
            id="ChevronLeft"
            strokeWidth={1}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 absolute top-1/2 -translate-y-1/2 right-0">
        <Slider.NextButton class="btn rounded-none text-black border-transparent bg-[hsla(0,0%,100%,.9)] disabled:lg:opacity-50 lg:hover:bg-transparent lg:hover:border-transparent">
          <Icon
            class=""
            size={30}
            id="ChevronRight"
            strokeWidth={1}
          />
        </Slider.NextButton>
      </div>
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
    <div class="max-w-[1316px] mx-auto flex flex-col py-10 px-0 sm:px-5 gap-[32px]">
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
            class="hidden peer"
            checked={index === 0}
          />
        ))}

        <ul class="flex w-full sm:justify-center peer-[&:nth-of-type(1):checked]:[&_.tab:nth-of-type(1)]:text-black peer-[&:nth-of-type(2):checked]:[&_.tab:nth-of-type(2)]:text-black peer-[&:nth-of-type(1):checked]:[&_.tab:nth-of-type(1)]:border-black peer-[&:nth-of-type(2):checked]:[&_.tab:nth-of-type(2)]:border-black">
          {shelfTitles?.map((shelfTitle, index) => (
            <li class="tab p-[10px] border-b border-default  h-fit ">
              <label
                for={`tab${index}`}
                class="px-2 lg:px-[24px] text-base lg:text-xl whitespace-nowrap"
              >
                {shelfTitle}
              </label>
            </li>
          ))}
        </ul>

        {products?.map((shelf, index) => (
          <div class="hidden peer-[&:nth-of-type(1):checked]:[&:nth-of-type(1)]:flex peer-[&:nth-of-type(2):checked]:[&:nth-of-type(2)]:flex">
            <ProductShelf products={shelf} title={shelfTitles[index]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabbedShelf;
