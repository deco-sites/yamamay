import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";
import { useSignal } from "@preact/signals";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import Button from "deco-sites/fashion/components/ui/Button.tsx";

export interface Props {
  items: INavItem[];
}

function SubMenuItem(
  { item, open, noItem }: { item: INavItem; open?: boolean; noItem?: boolean },
) {
  return (
    <div>
      {!noItem && (
        <>
          // deno-lint-ignore no-extra-boolean-cast
          {Boolean(item?.children?.length)
            ? (
              <div
                class={`peer-checked:bg-black peer-checked:text-white uppercase text-center text-sm h-20px flex py-2 ${
                  item.highlight ? "text-primary font-bold " : ""
                } `}
              >
                {item.label}
              </div>
            )
            : (
              <a
                href={item.href}
                class={`peer-checked:bg-black peer-checked:text-white uppercase text-center text-sm min-h-fit flex py-2 ${
                  item.highlight ? "text-primary font-bold " : ""
                } `}
              >
                {item.label}
              </a>
            )}
        </>
      )}
      {!!item?.children?.length && (
        <div
          class={`absolute w-full translate-x-full`}
        >
          <ul>
            {item.children?.map((node) => (
              <li>
                <SubMenuItem item={node} />
              </li>
            ))}
            <li>
              <a class="underline text-base" href={item.href}>See all</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function MenuItem(
  { item, open }: { item: INavItem; open?: boolean },
) {
  return (
    <div class={`${open ? "" : "hidden"}`}>
      {item?.children?.length > 0 && (
        <div
          class={``}
        >
          <ul>
            {item.children?.map((node) => (
              <li>
                <SubMenuItem item={node} />
              </li>
            ))}
            {
              /* <li>
            <a class="underline text-base" href={item.href}>See all</a>
          </li> */
            }
          </ul>
        </div>
      )}
    </div>
  );
}

function Menu({ items }: Props) {
  const openMenu = useSignal(items[0].href);
  const { displayMenu } = useUI();

  return (
    <div class="max-h-[calc(100vh-110px)] overflow-y-auto">
      <ul class="grid grid-cols-2 divide-y divide-x divide-base-200 ">
        <Button
          class={`btn btn-ghost bg-black rounded-none text-white absolute left-[80vw] sm:left-[32rem]`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();

            displayMenu.value = false;
          }}
        >
          <Icon id="XMark" width={30} height={30} strokeWidth={2} />
        </Button>
        {items.map((item, index) => (
          <li class="flex items-center">
            <div class="w-full">
              <input
                type="checkbox"
                class="peer hidden"
                checked={index == 0}
              />
              {item?.children?.length > 0
                ? (
                  <div
                    class={`collapse-title pr-4 ${
                      openMenu.value == item.href ? "bg-black text-white" : ""
                    } text-lg font-bold flex justify-center items-center ${
                      item.highlight ? "text-primary" : ""
                    } `}
                    onClick={() => {
                      openMenu.value = item.href;
                    }}
                  >
                    {item.label}
                  </div>
                )
                : (
                  <a
                    href={item.href}
                    class={`collapse-title pr-4 ${
                      openMenu.value == item.href ? "bg-black text-white" : ""
                    } text-lg font-bold flex justify-center items-center ${
                      item.highlight ? "text-primary" : ""
                    } `}
                    onClick={() => {
                      openMenu.value = item.href;
                    }}
                  >
                    {item.label}
                  </a>
                )}
            </div>
          </li>
        ))}
      </ul>
      <ul>
        {items.map((item, index) => (
          <li
            class={`w-full px-5 py-4 ${
              openMenu.value == item.href ? "" : "hidden"
            }`}
          >
            <MenuItem item={item} open={openMenu.value == item.href} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col px-6 bg-[#f2f2f2]">
        <li>
          <a
            class="flex items-center gap-4 py-3 px-4 "
            href="https://www.deco.cx"
          >
            <Icon id="User" width={20} height={20} strokeWidth={2} />
            <span class="text-base">My profile</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-3"
            href="https://www.deco.cx"
          >
            <Icon id="MapPin" width={20} height={20} strokeWidth={2} />
            <span class="text-base">Find your store</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-3"
            href="/wishlist"
          >
            <Icon id="Heart" width={20} height={20} strokeWidth={2} />
            <span class="text-base">Returns</span>
          </a>
        </li>

        <li>
          <a
            class="flex items-center gap-4 px-4 py-3"
            href="https://www.deco.cx"
          >
            <Icon id="Phone" width={20} height={20} strokeWidth={2} />
            <span class="text-base">Faq</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
