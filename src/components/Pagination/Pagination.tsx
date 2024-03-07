// import { HiOutlineChevronLeft, HiOutlineChevronRight } from "solid-icons/hi";
import { Icon } from "solid-heroicons";
import { chevronLeft, chevronRight } from "solid-heroicons/solid";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import type {
  FlowbitePaginationButtonTheme,
  PaginationButtonProps,
} from "./PaginationButton";
import { PaginationButton, PaginationNavigation } from "./PaginationButton";
import { range } from "./helpers";
import {
  Component,
  ComponentProps,
  JSX,
  splitProps,
  mergeProps,
  Show,
} from "solid-js";

export interface FlowbitePaginationTheme {
  base: string;
  layout: FlowbitePaginationLayoutTheme;
  pages: FlowbitePaginationPagesTheme;
}

export interface FlowbitePaginationRootTheme {
  base: string;
}

export interface FlowbitePaginationLayoutTheme {
  table: {
    base: string;
    span: string;
  };
}

export interface FlowbitePaginationPagesTheme {
  base: string;
  showIcon: string;
  previous: FlowbitePaginationNavigationTheme;
  next: FlowbitePaginationNavigationTheme;
  selector: FlowbitePaginationButtonTheme;
}

export interface FlowbitePaginationNavigationTheme {
  base: string;
  icon: string;
}

enum Layout {
  "navigation",
  "pagination",
  "table",
}

export interface PaginationProps extends ComponentProps<"nav"> {
  currentPage: number;
  layout?: Layout;
  nextLabel?: string;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  renderPaginationButton?: (props: PaginationButtonProps) => JSX.Element;
  showIcons?: boolean;
  theme?: DeepPartial<FlowbitePaginationTheme>;
  totalPages: number;
}

const PaginationComponent: Component<PaginationProps> = (
  p: PaginationProps
) => {
  const merged = mergeProps(
    {
      layout: Layout.pagination,
      nextLabel: "Next",
      previousLabel: "Previous",
      renderPaginationButton: (props: PaginationButtonProps) => (
        <PaginationButton {...props} />
      ),
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, [
    "class",
    "currentPage",
    "layout",
    "nextLabel",
    "onPageChange",
    "previousLabel",
    "renderPaginationButton",
    "showIcons",
    "theme",
    "totalPages",
  ]);

  const theme = mergeDeep(getTheme().pagination, local.theme ?? {});

  const lastPage = Math.min(
    Math.max(local.currentPage + 2, 5),
    local.totalPages
  );
  const firstPage = Math.max(1, lastPage - 4);

  const goToNextPage = (): void => {
    local.onPageChange(Math.min(local.currentPage + 1, local.totalPages));
  };

  const goToPreviousPage = (): void => {
    local.onPageChange(Math.max(local.currentPage - 1, 1));
  };

  return (
    <nav class={twMerge(theme.base, local.class)} {...props}>
      <Show when={local.layout === Layout.table}>
        <div class={theme.layout.table.base}>
          Showing <span class={theme.layout.table.span}>{firstPage}</span>{" "}
          to&nbsp;
          <span class={theme.layout.table.span}>{lastPage}</span> of&nbsp;
          <span class={theme.layout.table.span}>{local.totalPages}</span>{" "}
          Entries
        </div>
      </Show>
      <ul class={theme.pages.base}>
        <li>
          <PaginationNavigation
            class={twMerge(
              theme.pages.previous.base,
              local.showIcons && theme.pages.showIcon
            )}
            onClick={goToPreviousPage}
            disabled={local.currentPage === 1}
          >
            <Show when={local.showIcons}>
              <Icon path={chevronLeft} class={theme.pages.previous.icon} />
              {/* <HiChevronLeft aria-hidden class={theme.pages.previous.icon} /> */}
            </Show>
            {local.previousLabel}
          </PaginationNavigation>
        </li>
        <Show when={local.layout === Layout.pagination}>
          {range(firstPage, lastPage).map((page: number) => (
            <li
              aria-current={page === local.currentPage ? "page" : undefined}
              // key={page}
            >
              <Show when={local.renderPaginationButton}>
                {local.renderPaginationButton({
                  class: twMerge(
                    theme.pages.selector.base,
                    local.currentPage === page && theme.pages.selector.active
                  ),
                  active: page === local.currentPage,
                  onClick: () => local.onPageChange(page),
                  children: page,
                })}
              </Show>
            </li>
          ))}
        </Show>
        <li>
          <PaginationNavigation
            class={twMerge(
              theme.pages.next.base,
              local.showIcons && theme.pages.showIcon
            )}
            onClick={goToNextPage}
            disabled={local.currentPage === local.totalPages}
          >
            {local.nextLabel}
            <Show when={local.showIcons}>
              {/* <HiChevronRight aria-hidden class={theme.pages.next.icon} /> */}
              <Icon path={chevronRight} class={theme.pages.previous.icon} />
            </Show>
          </PaginationNavigation>
        </li>
      </ul>
    </nav>
  );
};

// PaginationComponent.displayName = 'Pagination';

export const Pagination = Object.assign(PaginationComponent, {
  Button: PaginationButton,
});
