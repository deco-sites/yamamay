import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  highlight?: boolean;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image, highlight } = item;

  return (
    <li class="group/navitem flex items-center w-full max-w-[160px] hover:bg-black">
      <a href={href} class="px-4 py-3 w-full flex justify-center">
        <span
          class={`group-hover/navitem:underline font-bold group-hover/navitem:text-white ${
            highlight ? "text-primary" : ""
          }`}
        >
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="absolute flex group-hover:z-10 bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen translate-x-[-50%]"
            style={{ top: "100%", left: "50%" }}
          >
            <ul class="flex items-start justify-center gap-6 relative">
              {children.map((node) => (
                <li class="py-3 group/submenu leading-none">
                  <a
                    class={`hover:underline text-sm ${
                      node.highlight ? "text-primary font-bold" : ""
                    }`}
                    href={node.href}
                  >
                    <span>{node.label}</span>
                  </a>
                  {node.children?.length >= 0 && (
                    <div class="invisible bg-white w-screen left-1/2 -translate-x-1/2 absolute group-hover/submenu:visible">
                      <ul
                        class={`grid gap-1 my-4 container ${
                          node.children?.[0].image?.src
                            ? "grid-cols-5"
                            : "grid-cols-[repeat(2,.2fr)]"
                        } `}
                      >
                        {node.children?.map((leaf) => (
                          <li>
                            <a class="hover:underline" href={leaf.href}>
                              <span class="text-sm">{leaf.label}</span>
                              {leaf.image?.src && (
                                <Image
                                  src={leaf.image?.src}
                                  alt={leaf.image?.alt}
                                  width={200}
                                  height={128}
                                />
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
