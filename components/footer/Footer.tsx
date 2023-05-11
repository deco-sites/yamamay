import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";

import Newsletter from "./Newsletter.tsx";
import FindStore from "./FindStore.tsx";
import type { ComponentChildren } from "preact";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type HighlightedItem = {
  label: string;
  href: string;
} & IconItem;

export type Section = {
  label?: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <span class="text-sm">
      {isIcon(item)
        ? (
          <div class="border-base-100 border border-solid py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </span>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`lg:py-5 px-0  ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
  highlightedLinks: HighlightedItem[];
  endSections?: Section[];
}

function Footer(
  { sections = [], endSections = [], highlightedLinks = [] }: Props,
) {
  return (
    <footer class="w-full bg-white flex flex-col divide-y  relative z-20">
      <div>
        <FooterContainer class="bg-gray-100">
          <div class="container flex justify-between lg:divide-x px-4 lg:py-0">
            <div class="w-full lg:w-1/2">
              <Newsletter />
            </div>
            <div class="hidden lg:flex lg:w-1/2 justify-end">
              <FindStore />
            </div>
          </div>
        </FooterContainer>
        <div class="container w-full flex border-b">
          <ul class="grid grid-cols-2 divide-y divide-x lg:divide-y-0 lg:divide-x-0  lg:flex w-full justify-between">
            {highlightedLinks.map((item) => (
              <li class="py-4 ">
                <a
                  href={item.href}
                  class="uppercase lg:font-bold underline text-base items-center text-center lg:items-start lg:text-left flex gap-2 flex-col lg:flex-row"
                >
                  <Icon
                    id={item.icon}
                    width={25}
                    height={20}
                    strokeWidth={1}
                    class="text-primary"
                  />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="container w-full flex flex-col divide-y">
          <FooterContainer>
            {/* Desktop view */}
            <ul class="hidden sm:flex flex-row justify-between gap-20">
              {sections.map((section) => (
                <li>
                  <div>
                    <span class="font-bold text-base">
                      {section.label}
                    </span>

                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } pt-2 flex-wrap`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col sm:hidden sm:flex-row sm:gap-4 divide-y">
              {sections.map((section) => (
                <li>
                  <span class="">
                    <details class="group/footer-menu">
                      <summary class="list-none flex justify-between py-5">
                        <span class="w-full text-center font-bold">
                          {section.label}
                        </span>
                        <Icon
                          id="ChevronDown"
                          width={20}
                          height={20}
                          strokeWidth={2}
                        />
                      </summary>

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } gap-2 px-2 pt-2`}
                      >
                        {section.children.map((item) => (
                          <li>
                            <SectionItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </details>
                  </span>
                </li>
              ))}
            </ul>
          </FooterContainer>
        </div>
      </div>

      <div>
        <div class="container w-full">
          <FooterContainer class="flex justify-center lg:justify-between w-full">
            <ul class="flex flex-row gap-20">
              {endSections.map((section) => (
                <li>
                  <div class="flex flex-col justify-center lg:justify-start lg:flex-row items-center">
                    {section.label && (
                      <span class="font-normal uppercase text-[9px] lg:text-xs">
                        {section.label}
                      </span>
                    )}

                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } flex-wrap`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </FooterContainer>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
