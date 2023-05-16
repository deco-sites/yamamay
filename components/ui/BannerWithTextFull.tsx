import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href: string;
  /** @description Link label */
  label: string;
}

export interface Props {
  image: Banner;
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  title: string;
  subtitle: string;
  buttonLabel: string;
  href: string;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    href,
    label,
  } = image;

  return (
    <a
      href={href ?? "#"}
      aria-label={label}
      class="relative h-auto overflow-y-hidden w-full lg:w-1/2"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={360}
          height={600}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1055}
          height={855}
        />
        <img
          class="object-cover w-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function BannerFull(
  { image, preload, title, subtitle, buttonLabel, href }: Props,
) {
  const id = useId();

  return (
    <div
      id={id}
      class="flex flex-col-reverse relative lg:flex-row group/banner bg-[#fff7f7] my-5"
    >
      <div class="w-full lg:w-1/2 absolute bottom-0 z-10 bg-[rgba(255,247,247,.4)] lg:static flex justify-end items-center">
        <div class="flex flex-col item-center justify-center px-12 max-w-[560px]">
          <div class="flex justify-center">
            <h2 class="text-2xl lg:text-5xl font-bold text-center uppercase max-w-[300px] inline-flex text-black lg:leading-[67px]">
              {title}
            </h2>
          </div>
          <span class="text-xl text-center inline-flex text-black py-5">
            {subtitle}
          </span>
          <div class="flex justify-center mt-6">
            <a href={href} class="w-min inline-flex">
              <Button class="min-w-[250px] rounded-none text-white">
                {buttonLabel}
              </Button>
            </a>
          </div>
        </div>
      </div>
      <BannerItem image={image} lcp={preload} />
    </div>
  );
}

export default BannerFull;
