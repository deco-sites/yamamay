import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem(
  { item, open, noItem }: { item: INavItem; open?: boolean; noItem?: boolean },
) {
  return (
    <div class={`${noItem ? "" : "collapse max-h-10px"}`}>
      {!noItem && (
        <>
          <input
            type="checkbox"
            class="peer"
            checked={open}
            onClick={() => console.log("teste")}
          />
          {!!item?.children?.length
            ? (
              <div
                class={`collapse-title peer-checked:bg-black peer-checked:text-white text-sm min-h-fit flex py-2 ${
                  item.highlight ? "text-primary font-bold" : ""
                } `}
              >
                {item.label}
              </div>
            )
            : (
              <a
                href={item.href}
                class={`collapse-title peer-checked:bg-black peer-checked:text-white text-sm min-h-fit flex py-2 ${
                  item.highlight ? "text-primary font-bold" : ""
                } `}
              >
                {item.label}
              </a>
            )}
        </>
      )}
      <div
        class={`${noItem ? "" : "collapse-content absolute"}`}
      >
        <ul>
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} />
            </li>
          ))}
          <li>
            <a class="underline text-base" href={item.href}>See all</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <>
      <ul class="grid grid-cols-2 divide-y divide-x divide-base-200 ">
        {items.map((item, index) => (
          <li>
            <div class="collapse">
              <input
                type="checkbox"
                class="peer"
                //  checked={open}
                onClick={() => console.log("teste")}
              />
              <div
                class={`collapse-title pr-4 peer-checked:bg-black peer-checked:text-white text-lg font-bold flex justify-center items-center ${
                  item.highlight ? "text-primary" : ""
                } `}
              >
                {item.label}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ul>
        {items.map((item, index) => (
          <li>
            <MenuItem item={item} open={index == 0} noItem={true} />
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
    </>
  );
}

export default Menu;
