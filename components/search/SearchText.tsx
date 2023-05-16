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
    <div class="container">
      <div class="mt-2 py-2 lg:py-0">
        {/* Description*/}
        <div class="relative">
          <input
            type="checkbox"
            name="seemore"
            id="seemore"
            class="peer hidden"
          />
          <div
            class={`overflow-hidden transition-all
              max-h-[50px] peer-checked:max-h-fit peer-checked:pb-5 text-center
            `}
            id="description"
          >
            <div>
              <span
                class="text-[14px] leading-[25px] whitespace-break-spaces "
                dangerouslySetInnerHTML={{ __html: matching.text }}
              >
              </span>
            </div>
          </div>
          <div
            class={`absolute bottom-0 right-0 left-0 
             bg-[linear-gradient(transparent,#fff)] peer-checked:bg-[linear-gradient(transparent,transparent)]
            flex justify-center itens-end h-[100px] [&_span.seeless]:hidden peer-checked:[&_span.seeless]:flex [&_span.seemore]:flex peer-checked:[&_span.seemore]:hidden max-h-5 pt-2`}
          >
            <label htmlFor="seemore" class="p-4 uppercase text-xs">
              <span class="seemore">Show More</span>
              <span class="seeless">Show Less</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchText;
