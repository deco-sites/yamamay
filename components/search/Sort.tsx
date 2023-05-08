import { useMemo } from "preact/hooks";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";
import { useSignal } from "@preact/signals";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  console.log(e);
  const urlSearchParams = new URLSearchParams(window.location.search);

  console.log(e.currentTarget.id);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.id);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort({ sortOptions }: Props) {
  const sort = useSort();
  const open = useSignal(false);

  return (
    <>
      <div>
        <span onClick={() => open.value = !open.value}>Ordina</span>
        <div
          class={`absolute w-screen bg-white  z-10 left-0  ${
            open.value ? "visible" : "invisible"
          }`}
        >
          <div class="container flex">
            {sortOptions.map(({ value, label }) => (
              <div>
                <input
                  type="radio"
                  name="sort"
                  id={value ?? "rel"}
                  onChange={applySort}
                  checked={value === sort}
                />
                <label for={value ?? "rel"} class="text-sm">{label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <select
        id="sort"
        name="sort"
        onInput={applySort}
        class="w-min h-[36px] px-1 rounded m-2 text-button font-button text-base-content cursor-pointer outline-none"
      >
        {sortOptions.map(({ value, label }) => (
          <option key={value} value={value} selected={value === sort}>
            <span class="text-sm">{label}</span>
          </option>
        ))}
      </select>
    </>
  );
}

export default Sort;
