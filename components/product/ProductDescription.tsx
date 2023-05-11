import { useSignal } from "@preact/signals";

function ProductDescription({ description }: { description?: string }) {
  const open = useSignal(false);

  if (!description) return null;

  return (
    <div class="mt-4 sm:mt-6 px-4 lg:px-0">
      <span class="cursor-pointer uppercase text-sm list-none flex justify-between item-center group-open/description">
        Description
      </span>
      <div class="">
        <span class={`text-sm ${open.value ? "" : "line-clamp-1"} `}>
          {description}
        </span>
        <button onClick={() => open.value = !open.value}>
          <span class="text-sm text-gray-300 underline">
            {open.value ? "Read less" : "Read more"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default ProductDescription;
