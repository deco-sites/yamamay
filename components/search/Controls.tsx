import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Filters from "deco-sites/fashion/components/search/Filters.tsx";
import Sort from "deco-sites/fashion/components/search/Sort.tsx";
import Modal from "deco-sites/fashion/components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);
  const filterOpen = useSignal(false);

  return (
    <div class="flex flex-col justify-between mb-4 p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px]">
      <div class="flex flex-row items-center justify-between border-b border-base-200  sm:border-none divide-x">
        <Button
          class={displayFilter ? "btn-ghost" : "btn-ghost sm:hidden"}
          onClick={() => {
            open.value = true;
          }}
        >
          Filter
          <Icon
            id="ChevronDown"
            size={20}
            strokeWidth={1}
          />
        </Button>
        {filters.length > 0 && (
          <div class="hidden sm:block w-min">
            <button
              onClick={() => {
                filterOpen.value = !filterOpen.value;
              }}
              class="whitespace-nowrap flex pr-7"
            >
              Filter by
              <Icon
                id="ChevronDown"
                size={20}
                strokeWidth={1}
              />
            </button>
            <div
              class={`absolute w-screen bg-white py-6 z-30 left-0 shadow-md ${
                filterOpen.value ? "visible" : "invisible"
              }`}
            >
              <div class="container">
                <Filters filters={filters} />
              </div>
            </div>
          </div>
        )}
        {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
      </div>

      <Modal
        loading="lazy"
        title="Filtra"
        mode="center"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal>
    </div>
  );
}

export default SearchControls;
