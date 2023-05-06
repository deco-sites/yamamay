import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image } = item;

  return (
    <li class="group flex items-center w-full max-w-[160px] hover:bg-black">
      <a href={href} class="px-4 py-3 w-full flex justify-center">
        <span class="group-hover:underline font-bold group-hover:text-white">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="absolute flex group-hover:z-10 bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen translate-x-[-50%]"
            style={{ top: "100%", left: "50%" }}
          >
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="py-3">
                  <a class="hover:underline text-sm" href={node.href}>
                    <span>{node.label}</span>
                  </a>

                  {
                    /* <ul class="flex gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <span class="text-xs">{leaf.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul> */
                  }
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
