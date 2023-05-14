import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import Icon from "./Icon.tsx";

export interface Banner {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  title: string;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  itemsPerLine: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 4 */
    desktop?: 1 | 2 | 3 | 4 | 6 | 8;
  };
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "w-1/2 px-[4.5px]",
};

const DESKTOP_COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:w-1/2 px-[4.5px]",
  3: "sm:w-[33.333%] px-[4.5px]",
  4: "sm:w-[25%] px-[4.5px]",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
};

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

export default function BannnerGrid({
  title,
  itemsPerLine,
  borderRadius,
  banners = [],
}: Props) {
  const id = useId();

  return (
    <section class="container w-full mx-auto">
      {title &&
        (
          <div class="py-6 md:py-0 md:pb-[40px] flex items-center justify-center mt-6">
            <h2 class="text-2xl lg:text-4xl font-semibold uppercase max-w-[580px] text-center">
              {title}
            </h2>
          </div>
        )}
      {
        /* <div
        class={`grid gap-4 md:gap-6 ${
          MOBILE_COLUMNS[itemsPerLine.mobile ?? 2]
        } ${DESKTOP_COLUMNS[itemsPerLine.desktop ?? 4]}`}
      > */
      }
      <div id={id} class="lg:px-14 relative">
        <Slider class="carousel carousel-start lg:carousel-center  w-full col-span-full row-span-full">
          {banners.map(({ href, srcMobile, srcDesktop, alt, title }, index) => (
            <Slider.Item
              index={index}
              class={`carousel-item ${
                DESKTOP_COLUMNS[itemsPerLine.desktop ?? 3]
              } ${MOBILE_COLUMNS[itemsPerLine.mobile ?? 2]}`}
            >
              <a
                href={href}
                class={`overflow-hidden ${
                  RADIUS_MOBILE[borderRadius.mobile ?? "none"]
                } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
              >
                <Picture>
                  <Source
                    media="(max-width: 767px)"
                    src={srcMobile}
                    width={391}
                    height={412}
                  />
                  <Source
                    media="(min-width: 768px)"
                    src={srcDesktop ?? srcMobile}
                    width={391}
                    height={412}
                  />
                  <img
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 30vw"
                    src={srcMobile}
                    alt={alt}
                    decoding="async"
                    loading="lazy"
                  />
                </Picture>
                <div class="my-4">
                  <span class="uppercase text-lg font-bold underline">
                    {title}
                  </span>
                </div>
              </a>
            </Slider.Item>
          ))}
        </Slider>

        <div class="flex items-center justify-center z-10 absolute top-1/2 -translate-y-1/2 left-0">
          <Slider.PrevButton class="btn rounded-none text-black border-transparent bg-[hsla(0,0%,100%,.9)] lg:bg-transparent disabled:lg:bg-transparent lg:hover:bg-transparent lg:hover:border-transparent">
            <Icon
              class=""
              size={30}
              id="ChevronLeft"
              strokeWidth={1}
            />
          </Slider.PrevButton>
        </div>
        <div class="flex items-center justify-center z-10 absolute top-1/2 -translate-y-1/2 right-0">
          <Slider.NextButton class="btn rounded-none text-black border-transparent bg-[hsla(0,0%,100%,.9)] lg:bg-transparent disabled:lg:bg-transparent lg:hover:bg-transparent lg:hover:border-transparent">
            <Icon
              class=""
              size={30}
              id="ChevronRight"
              strokeWidth={1}
            />
          </Slider.NextButton>
        </div>

        <SliderJS rootId={id} />
      </div>
      {/* </div> */}
    </section>
  );
}
