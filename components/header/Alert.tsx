import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { useId } from "preact/hooks";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class=" bg-[#efefef]">
      <div class="max-w-[1336px] relative mx-auto">
        <Slider class="carousel carousel-center h-[50px] flex items-center gap-6 scrollbar-none">
          {alerts.map((alert, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <span class="text-xs flex justify-center items-center w-full h-[38px]">
                {alert}
              </span>
            </Slider.Item>
          ))}
        </Slider>

        <Slider.PrevButton class="absolute top-1/2 translate-y-[-50%] left-0">
          <Icon size={20} id="ChevronLeft" strokeWidth={1} />
        </Slider.PrevButton>

        <Slider.NextButton class="absolute top-1/2 translate-y-[-50%] right-0">
          <Icon size={20} id="ChevronRight" strokeWidth={1} />
        </Slider.NextButton>

        <SliderJS rootId={id} interval={interval && interval * 1e3} />
      </div>
    </div>
  );
}

export default Alert;
