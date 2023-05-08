import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
  behavior?: "smooth" | "auto";
  interval?: number;
}

const ATTRIBUTES = {
  "data-slider": "data-slider",
  "data-slider-item": "data-slider-item",
  'data-slide="prev"': 'data-slide="prev"',
  'data-slide="next"': 'data-slide="next"',
  "data-dot": "data-dot",
};

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6;

const intersectionX = (element: DOMRect, container: DOMRect): number => {
  const delta = container.width / 1_000;

  if (element.right < container.left - delta) {
    return 0.0;
  }

  if (element.left > container.right + delta) {
    return 0.0;
  }

  if (element.left < container.left - delta) {
    return element.right - container.left + delta;
  }

  if (element.right > container.right + delta) {
    return container.right - element.left + delta;
  }

  return element.width;
};

const setup = ({ rootId, behavior, interval }: Props) => {
  const element = document.getElementById(rootId);

  if (!rootId || !element) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { rootId },
    );

    return;
  }

  let passed = false;

  const addClass = () => {
    if (globalThis.scrollY >= 10 && !passed) {
      element.classList.add("micro");
      passed = true;
    }
    if (globalThis.scrollY < 10) {
      passed = false;
      element.classList.remove("micro");
    }
  };

  globalThis?.addEventListener("scroll", addClass);
};

function Slider({ rootId, behavior = "smooth", interval }: Props) {
  useEffect(() => setup({ rootId, behavior, interval }), [
    rootId,
    behavior,
    interval,
  ]);

  return <div data-scroll-track-js />;
}

export default Slider;
