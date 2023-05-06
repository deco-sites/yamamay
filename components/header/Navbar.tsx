import HeaderSearchMenu from "deco-sites/fashion/islands/HeaderSearchMenu.tsx";
import HeaderButton from "deco-sites/fashion/islands/HeaderButton.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import Searchbar from "deco-sites/fashion/components/search/Searchbar.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Button from "deco-sites/fashion/components/ui/Button.tsx";

function Navbar({ items, searchbar, logo }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo: LiveImage;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class="flex-grow inline-flex items-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex gap-1">
          <HeaderButton variant="search" />
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div>
        <div class="bg-primary text-white">
          <div class="hidden md:flex flex-row justify-between items-center w-full pl-2 pr-6 max-w-[1190px] mx-auto">
            <div class="flex-1 flex items-center justify-start gap-11">
              <Button class="text-xs btn btn-ghost font-normal gap-4">
                italy - english{" "}
                <Icon
                  id="ChevronRight"
                  width={15}
                  height={15}
                  strokeWidth={1}
                />
              </Button>
              <a
                href="/stores"
                aria-label="Find your store"
                class="inline-flex text-xs items-center gap-1"
              >
                <Icon id="MapPin" width={18} height={18} strokeWidth={1} />
                <span class="underline ">Find your store</span>
              </a>
            </div>
            <div class="flex-1 flex items-center justify-center w-44">
              <a
                href="/"
                aria-label="Store logo"
                class="block px-4 py-3 w-[180px] text-white"
              >
                <Image src={logo} width={145} height={39} />
              </a>
            </div>

            <div class="flex-1 w-44 flex items-center justify-end gap-2">
              <Searchbar {...searchbar} variant="desktop" />
              <a
                class="btn btn-square btn-ghost"
                href="/wishlist"
                aria-label="Wishlist"
              >
                <Icon
                  id="Heart"
                  width={24}
                  height={24}
                  strokeWidth={2}
                  fill="none"
                />
              </a>
              <a
                class="btn btn-square btn-ghost"
                href="/login"
                aria-label="Log in"
              >
                <Icon id="User" width={24} height={24} strokeWidth={0.4} />
              </a>

              <HeaderButton variant="cart" />
            </div>
          </div>
        </div>
        <div class="bg-white">
          <div class="flex-auto flex justify-center max-w-[1190px] mx-auto relative">
            {items.map((item) => <NavItem item={item} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
