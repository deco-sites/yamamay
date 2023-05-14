import Modals from "deco-sites/fashion/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import { useId } from "preact/hooks";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import ScrollTrackJS from "../../islands/ScrollTrackJS.tsx";

export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
  children?: Array<{
    label: string;
    href: string;
    highlight?: boolean;
    children?: Array<{
      label: string;
      href: string;
      image?: {
        src?: Image;
        alt?: string;
      };
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;

  logo: Image;
}

function Header(
  {
    alerts,
    searchbar: _searchbar,
    products,
    navItems = [],
    suggestions,
    logo,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions };
  const id = useId();

  return (
    <>
      <header style={{ height: headerHeight }} class="lg:min-h-[200px]">
        <div id={id} class="bg-base-100 fixed w-screen z-50 group">
          <Alert alerts={alerts} />
          <Navbar items={navItems} logo={logo} searchbar={searchbar} />
          <ScrollTrackJS rootId={id} />
        </div>

        <Modals
          menu={{ items: navItems }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
