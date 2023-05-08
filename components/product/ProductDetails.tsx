import { useId } from "preact/hooks";
import AddToCartButton from "deco-sites/fashion/islands/AddToCartButton.tsx";
import ShippingSimulation from "deco-sites/fashion/islands/ShippingSimulation.tsx";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/components/ui/SliderJS.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import SendEventOnLoad from "deco-sites/fashion/components/SendEventOnLoad.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import ProductImageZoom from "deco-sites/fashion/islands/ProductImageZoom.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import QuantityAddToCartButton from "deco-sites/yamamay/islands/QuantityAddToCartButton.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 586;
const HEIGHT = 667;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    // name,
    // gtin,
    isVariantOf,
    // additionalProperty,
  } = product;
  const { name, additionalProperty } = isVariantOf ?? {};
  const { price, listPrice, seller, installments } = useOffer(offers);
  const hasDiscount = price !== listPrice;
  const discount = ((listPrice ?? 0) - (price ?? 0)) * 100 / (listPrice ?? 0);

  console.log(additionalProperty);

  const washingCare = additionalProperty?.find((prop) =>
    prop.name === "Washing care"
  );

  const details = additionalProperty?.filter((prop) =>
    prop.name !== "Washing care" && prop.name !== "sellerId"
  );

  return (
    <div class="sticky top-[180px] ">
      {/* Code and name */}
      <div class="mt-4 sm:mt-8 ">
        <h1>
          <span class=" text-base">{name}</span>
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-row gap-2 items-center">
          <span class="font-medium text-xl text-primary">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
          <span class="line-through text-neutral-300 text-xl">
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
          {hasDiscount && discount &&
            (
              <span class="text-base">
                {Math.round(discount)}%
              </span>
            )}
        </div>
        <span class="text-sm text-base-300">
          {installments}
        </span>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6 border-t">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="flex pt-4 flex-col gap-2 border-t">
        {seller && (
          <QuantityAddToCartButton
            skuId={productID}
            sellerId={seller}
            price={price ?? 0}
            discount={price && listPrice ? listPrice - price : 0}
            name={product.name ?? ""}
            productGroupId={product.isVariantOf?.productGroupID ?? ""}
          />
        )}
      </div>
      {/* Shipping Simulation */}
      {
        /* <div class="mt-8">
        <ShippingSimulation
          items={[{
            id: Number(product.sku),
            quantity: 1,
            seller: seller ?? "1",
          }]}
        />
      </div> */
      }
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="cursor-pointer uppercase text-sm list-none flex justify-between item-center group-open/description">
          Description
        </span>
        <div class="">
          <span class="text-sm">
            {description}
          </span>
        </div>
      </div>

      <div class="mt-4">
        <span class="text-base">
          {washingCare?.value && (
            <details class="group/description border-y">
              <summary class="cursor-pointer list-none flex justify-between h-[47px] items-center group-open/description pl-10 pr-2">
                Garment Care
                <Icon
                  id="ChevronDown"
                  width={20}
                  height={20}
                  strokeWidth={1}
                />
              </summary>
              <div
                class="[&>img]:w-[24px] [&>img]:m-[.35rem_.5rem_-.25rem_0] [&>img]:inline text-xs px-10 pt-3 pb-4"
                dangerouslySetInnerHTML={{ __html: washingCare.value }}
              >
              </div>
            </details>
          )}
        </span>
      </div>

      <div class="">
        <span class="text-base">
          {!!details?.length && (
            <details class="group/details border-y">
              <summary class="cursor-pointer list-none flex justify-between h-[47px] items-center  pl-10 pr-2">
                Details
                <Icon
                  id="ChevronDown"
                  width={20}
                  height={20}
                  strokeWidth={1}
                  class="group-open/details:rotate-180 transition-all"
                />
              </summary>
              <ul class="text-sm flex flex-col px-10 pt-3 pb-4 gap-3">
                {details.map((detail) => (
                  <li>
                    <span class="font-bold">{detail.name}</span>:{" "}
                    <span>{detail.value}</span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </span>
      </div>
      <div class="">
        <span class="text-base">
          {!!details?.length && (
            <details class="group/details border-y">
              <summary class="cursor-pointer list-none flex justify-between h-[47px] items-center  pl-10 pr-2">
                Shipping and Returns
                <Icon
                  id="ChevronDown"
                  width={20}
                  height={20}
                  strokeWidth={1}
                  class="group-open/details:rotate-180 transition-all"
                />
              </summary>
              <ul class="text-sm flex flex-col px-10 pt-3 pb-4 gap-5">
                <li class="flex">
                  <div class="min-w-[40px] flex">
                    <Icon
                      id="Truck"
                      width={29}
                      height={29}
                    />
                  </div>
                  <div class="leading-[1.5]">
                    Delivery takes place on average within 3 working days from
                    the order in Italy and in the EU and within 6 days for all
                    other destinations. For details on shipping times click
                    here.
                  </div>
                </li>
                <li class="flex">
                  <div class="min-w-[40px] flex">
                    <Icon
                      id="Return"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div class="leading-[1.5]">
                    If you are not satisfied with your purchase, you have 14
                    days from the date you received your order to return the
                    purchased products. To exercise the right of withdrawal, the
                    items must not be used or washed.
                  </div>
                </li>
              </ul>
            </details>
          )}
        </span>
      </div>

      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </div>
  );
}

function Details({
  page,
  variant,
}: { page: ProductDetailsPage; variant: Variant }) {
  const id = `product-image-gallery:${useId()}`;
  const {
    product: { image: images = [], isVariantOf, id: productID },
    breadcrumbList,
  } = page;

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <>
        {/* Breadcrumb */}
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement}
        />
        <div
          id={id}
          class="flex justify-between"
        >
          {/* Image Slider */}
          <div class="relative flex gap-[10px] items-start">
            {/* Dots */}
            <ul class="flex gap-[10px] sm:justify-start  px-4 sm:px-0 sm:flex-col sticky top-[180px]">
              {images.map((img, index) => (
                <li class="min-w-[63px] sm:min-w-[104px]">
                  <Image
                    style={{ aspectRatio: "1/1" }}
                    class="group-disabled:border-base-300 border"
                    width={104}
                    height={104}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </li>
              ))}
            </ul>

            <ul class="flex flex-col gap-[10px]">
              {images.map((img, index) => (
                <li class="carousel-item w-full max-w-[586px]">
                  <Image
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    style={{ aspectRatio: ASPECT_RATIO }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </li>
              ))}
            </ul>

            <div class="absolute top-2 right-2 bg-base-100 rounded-full">
              <WishlistButton
                variant="icon"
                productGroupID={isVariantOf?.productGroupID}
                productID={productID}
              />
            </div>
          </div>

          {/* Product Info */}
          <div class="max-w-[380px] w-full">
            <ProductInfo page={page} />
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6 ">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="container py-0 sm:py-10">
      {page ? <Details page={page} variant={variant} /> : <NotFound />}
    </div>
  );
}

export default ProductDetails;
