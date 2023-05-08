import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface Text {
  /** @description RegExp to enable this text on the current URL. Use /feminino/* to display this text on feminino category  */
  matcher: string;
  /** @description text to be rendered  */
  text: string;
}

export interface Props {
  page?: LoaderReturnType<ProductListingPage | null>;
  texts?: Text[];
}
function SearchText({ page, texts = [] }: Props) {
  if (!page || page.breadcrumb.itemListElement.length === 0) {
    return null;
  }

  const { item: canonical } = page
    .breadcrumb
    .itemListElement
    .reduce((curr, acc) => curr.position > acc.position ? curr : acc);

  const matching = texts.find(({ matcher }) =>
    new RegExp(matcher).test(canonical)
  );

  if (!matching) {
    return null;
  }

  return (
    <div class="bg-gray-100">
      <div class="py-0 sm:py-10">
        {/* Description*/}
        <div class="relative">
          <input type="checkbox" name="seemore" id="seemore" class="peer" />
          <div
            class={`pt-4 sm:pt-6 overflow-hidden transition-all
              max-h-[200px] peer-checked:max-h-fit
            `}
            id="description"
          >
            <div>
              <span
                class="text-[14px] leading-[25px] whitespace-break-spaces"
                dangerouslySetInnerHTML={{ __html: matching.text }}
              >
              </span>
            </div>
          </div>
          <div
            class={`absolute bottom-0 right-0 left-0 
             bg-[linear-gradient(transparent,#fff)] peer-checked:bg-transparent
            flex justify-center itens-end h-[100px] [& span.seemore]:hidden peer-checked:[& span.seemore]:flex`}
          >
            <label htmlFor="seemore">
              <button class="bg-base-200 p-2 leading-none text-primary h-min">
                <span class="seemore">See More</span>
                <span class="seeless">See Less</span>
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchText;
