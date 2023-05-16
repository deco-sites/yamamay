import Icon from "deco-sites/yamamay/components/ui/Icon.tsx";

function FindStore() {
  return (
    <div class="flex flex-col gap-6 pb-5 w-full max-w-[450px]">
      <div class="flex flex-col gap-2">
        <span class="font-normal text-3xl">
          Find your store
        </span>
        <span class="text-sm">
          Enter a zip code to find your nearest store
        </span>
      </div>
      <form class="flex flex-row items-center gap-2 font-body text-body w-full max-w-[450px] border-b border-solid border-black">
        <input
          class="py-2 flex-grow bg-transparent"
          placeholder="Enter a zip code to find your nearest store"
        />
        <button
          class="py-2 px-3 bg-transparent text-base-content rounded"
          type="button" // prevent form's default behavior
        >
          <Icon
            id="ChevronRight"
            width={20}
            height={20}
            strokeWidth={2}
          />
        </button>
      </form>
    </div>
  );
}

export default FindStore;
