import { useMemo } from "preact/hooks";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";
import { useSignal } from "@preact/signals";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
// import Modal from "deco-sites/fashion/components/ui/Modal.tsx";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.id);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort({ sortOptions }: Props) {
  const sort = useSort();
  const open = useSignal(false);
  const mobileOpen = useSignal(false);

  return (
    <>
      <div>
        <button
          onClick={() => open.value = !open.value}
          class=" pl-7 hidden lg:flex"
        >
          Ordina{" "}
          <Icon
            id="ChevronDown"
            size={20}
            strokeWidth={1}
          />
        </button>
        <button
          onClick={() => mobileOpen.value = !mobileOpen.value}
          class="flex pl-7 lg:hidden"
        >
          Ordina{" "}
          <Icon
            id="ChevronDown"
            size={20}
            strokeWidth={1}
          />
        </button>
        <div class="hidden lg:block">
          <div
            class={`absolute w-screen bg-white py-6 z-10 left-0 shadow-md ${
              open.value ? "visible" : "invisible"
            }`}
          >
            <div class="container flex justify-between">
              {sortOptions.map(({ value, label }) => (
                <div class="flex">
                  <input
                    type="radio"
                    name="sort"
                    id={value ?? "rel"}
                    onChange={applySort}
                    checked={value === sort}
                    class="hidden peer"
                  />
                  <div class="h-7 w-7 mr-3 border flex items-center justify-center peer-checked:bg-black">
                    <Icon id="QuestionMarkCircle" size={20} strokeWidth={1} />
                  </div>
                  <label for={value ?? "rel"} class="text-base">{label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {
          /* <div class="lg:hidden">
          <Modal
            loading="lazy"
            title="Ordina"
            mode="center"
            open={open.value}
            onClose={() => {
              open.value = false;
            }}
          >
            <div class="container flex flex-col justify-between w-full py-3 py-3">
              {sortOptions.map(({ value, label }) => (
                <div class="flex">
                  <input
                    type="radio"
                    name="sort"
                    id={value ?? "rel"}
                    onChange={applySort}
                    checked={value === sort}
                    class="hidden peer"
                  />
                  <div class="h-7 w-7 mr-3 border flex items-center justify-center peer-checked:bg-black">
                    <Icon id="QuestionMarkCircle" size={20} strokeWidth={1} />
                  </div>
                  <label for={value ?? "rel"} class="text-base">{label}</label>
                </div>
              ))}
            </div>
          </Modal>
        </div> */
        }
      </div>
    </>
  );
}

export default Sort;
