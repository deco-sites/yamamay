import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import Icon from "deco-sites/yamamay/components/ui/Icon.tsx";

interface Props {
  pageInfo: ProductListingPage["pageInfo"];
  maxItems: number;
}

function pagesNumbersToDisplay(
  currentPage: number,
  totalPages: number,
  maxItems: number,
) {
  const pages = [currentPage];

  for (let i = 1; i < maxItems; i++) {
    if (pages.length === maxItems) {
      break;
    }

    if (currentPage - i > 0) {
      pages.unshift(currentPage - i);
    }

    if (currentPage + i < totalPages) {
      pages.push(currentPage + i);
    }
  }

  return pages;
}

function Pagination({ pageInfo, maxItems }: Props) {
  const totalPages = Math.ceil(pageInfo.records! / pageInfo.recordPerPage!);

  const pages = pagesNumbersToDisplay(
    pageInfo.currentPage,
    totalPages,
    maxItems,
  ).map(
    (page) => {
      const url = (pageInfo.nextPage ?? pageInfo.previousPage ?? "").replace(
        /page=\d+/,
        `page=${page}`,
      );

      return {
        page,
        url: url.toString(),
      };
    },
  );

  return (
    <div class="flex justify-center items-center text-black max-lg:gap-x-1">
      {pageInfo.previousPage && (
        <a
          aria-label="previous page link"
          rel="prev"
          href={pageInfo.previousPage ?? "#"}
          class="flex items-center gap-1.5 text-[13px] mr-2 pb-1"
        >
          <Icon
            id="TriangleDown"
            class="rotate-90 translate-y-0.5"
            width={8}
            height={8}
            strokeWidth={2}
          />
          Anterior
        </a>
      )}
      {pages.map((page) => (
        <a
          aria-label={`page ${page}`}
          href={page.url}
          data-current={pageInfo.currentPage === page.page}
          class="grid place-items-center h-[32px] w-[39px] border border-transparent data-[current=true]:bg-black data-[current=true]:text-white pb-0.5 font-bold text-sm"
        >
          {page.page}
        </a>
      ))}
      {pageInfo.nextPage && (
        <a
          aria-label="next page link"
          rel="next"
          href={pageInfo.nextPage ?? "#"}
          class="flex items-center gap-1.5 text-[13px] ml-2 pb-1"
        >
          Próximo{" "}
          <Icon
            id="TriangleDown"
            class="-rotate-90 translate-y-0.5"
            width={8}
            height={8}
            strokeWidth={2}
          />
        </a>
      )}
      {totalPages && (
        <a
          aria-label={`page ${totalPages}`}
          href={`?page={${totalPages}}`}
          class="grid place-items-center h-[30px] w-[30px] border border-transparent pb-0.5 font-bold text-sm"
        >
          {totalPages}
        </a>
      )}
    </div>
  );
}

export default Pagination;
