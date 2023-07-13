import Modal from "deco-sites/fashion/components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import type { Product } from "deco-sites/std/commerce/types.ts";
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
import { SendEventOnLoad } from "deco-sites/fashion/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import ProductImageZoom from "deco-sites/fashion/islands/ProductImageZoom.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import QuantityAddToCartButton from "deco-sites/yamamay/islands/QuantityAddToCartButton.tsx";
import ProductDescription from "deco-sites/yamamay/islands/ProductDescription.tsx";

const WIDTH = 586;
const HEIGHT = 667;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductInfo({ product }: { product: Product }) {
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

  const washingCare = additionalProperty?.find((prop) =>
    prop.name === "Washing care"
  );

  const details = additionalProperty?.filter((prop) =>
    prop.name !== "Washing care" && prop.name !== "sellerId"
  );

  return (
    <div class="top-[180px] ">
      {/* Code and name */}
      <div class=" bottom-0 bg-white right-0 left-0 lg:static  border-t lg:border-0">
        <div class="px-4">
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
        </div>
        <div class="flex lg:flex-col w-full">
          {/* Sku Selector */}
          <div class="mt-4 sm:mt-6 border-t">
            {/* <ProductSelector product={product} /> */}
          </div>

          {/* Add to Cart and Favorites button */}
          <div class="flex w-full pt-4 flex-col gap-2 border-t">
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
        </div>
      </div>
    </div>
  );
}

function QuickView({ product }: { product: Product }) {
  const open = useSignal(false);
  const id = useId();

  const { image: images = [], isVariantOf, id: productID } = product;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Button
        aria-label="Quick buy"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();

          open.value = true;
        }}
        class="group/quickview btn-ghost"
      >
        <Icon
          id="ShoppingCart"
          width={24}
          height={24}
        />
        <span class="absolute underline font-normal opacity-0 normal-case text-[13px] bg-white transition-all px-1 py-[2px] group-hover/quickview:opacity-100 group-hover/quickview:translate-x-full whitespace-nowrap">
          Quick buy
        </span>
      </Button>
      <Modal
        open={open.value}
        onClose={(e) => {
          e.stopPropagation();
          e.preventDefault();

          open.value = false;
        }}
        mode="center"
      >
        <div class="relative h-[80vh]">
          <Button
            class={`btn btn-ghost min-h-[25px] h-[25px] absolute right-0 top-0 `}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              open.value = false;
            }}
          >
            <Icon id="XMark" width={15} height={15} strokeWidth={2} />
          </Button>
          <div
            id={id}
            class="flex flex-col lg:flex-row justify-between gap-6"
          >
            {/* Image Slider */}
            <div class="relative flex gap-[10px] items-start">
              <Slider class="carousel carousel-center sm:carousel-end max-w-[600px]">
                {images.map((img, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-full max-w-[600px]"
                  >
                    <Image
                      class="w-full min-h-[80vh]"
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
                  </Slider.Item>
                ))}
              </Slider>
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

              <div class="absolute top-2 right-2 rounded-full">
                <WishlistButton
                  variant="icon"
                  productGroupID={isVariantOf?.productGroupID}
                  productID={productID}
                  size={30}
                />
              </div>
            </div>

            {/* Product Info */}

            <div class="max-w-[380px] w-full mr-6">
              <ProductInfo product={product} />
            </div>
          </div>
          <SliderJS rootId={id}></SliderJS>
        </div>
      </Modal>
    </div>
  );
}

export default QuickView;
