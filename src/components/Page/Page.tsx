import { MDXProvider, MDXProviderComponents } from "@mdx-js/react";
import { css, cx } from "linaria";
import Link from "next/link";
import React from "react";
import { configure, GlobalHotKeys } from "react-hotkeys";
import { useImmer } from "use-immer";
import * as mdxComponentsBase from "./components";
import { Sidebar } from "./internal";
import { grid, fullWidth } from "./layout";
import { theme } from "./theme";
import { Node } from "./types";
import { NavigationFooter } from "../NavigationFooter";

configure({
  ignoreTags: ["select"],
});

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentProps<typeof Root> {
  location: { asPath: string; push: (path: string) => void };
  toc: readonly Node[];
  Link: typeof Link;

  /**
   * Overrides the built-in MDX component implementations.
   *
   * Timvir only provides styling for Markdown components, no interactivity or customization.
   * This is done to keep the core small. For example, code blocks do not provide syntax
   * highlighting. If you want to enable syntax highlighting in code blocks, use the
   * '<Code>' component from '@timvir/blocks'.
   */
  mdxComponents?: MDXProviderComponents;

  /**
   * Search Configuration. When provided, then the Search menu will appear in the sidebar.
   */
  search?: {
    /**
     * The label that is used in th sidebar for the search menu.
     *
     * @default "Quick Search"
     */
    label?: React.ReactNode;

    /**
     * The Search component. It is always rendered in the DOM tree. When the search menu
     * is activated, then the 'open' prop is set to true.
     */
    Component: React.ComponentType<{ open: boolean }>;
  };
}

function Page(
  { location, toc, Link, className, search, mdxComponents, children, ...props }: Props,
  ref: any /* FIXME */
) {
  const [state, mutate] = useImmer({
    search: {
      open: false,
    },
  });

  const keyMap = {
    SEARCH: "command+p",
    ESC: "escape",
  };

  const handlers = {
    SEARCH: (ev) => {
      ev.preventDefault();
      mutate((draft) => {
        draft.search.open = !draft.search.open;
      });
    },
    ESC: () => {
      mutate((draft) => {
        draft.search.open = false;
      });
    },
  };

  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />

      <Root
        ref={ref}
        {...props}
        className={cx(
          className,
          theme,
          css`
            min-height: 100vh;

            display: grid;
            grid-template-columns: [l] 0 [m] 1fr [r];

            @media (min-width: 60rem) {
              grid-template-columns: [l] 300px [m] 1fr [r];
            }
          `
        )}
      >
        <div
          className={css`
            background: var(--c-p-0);
            border-right: 1px solid rgba(43, 188, 138, 0.1);
            grid-column: l / m;
          `}
        >
          <Sidebar
            location={location}
            toc={toc}
            Link={Link}
            search={{
              open: () => {
                mutate((draft) => {
                  draft.search.open = true;
                });
              },
              ...search,
            }}
          />
        </div>

        <div
          className={css`
            display: flex;
            flex-direction: column;
            grid-column: m / r;
          `}
        >
          <div className={grid}>
            <MDXProvider components={{ ...mdxComponentsBase, ...mdxComponents }}>{children}</MDXProvider>
          </div>

          {(() => {
            function flatten(n: Node, parents: Node[]): Array<{ parents: Node[]; label: string; path: string }> {
              let ret: Array<{ parents: Node[]; label: string; path: string }> = [];

              if (n.path) {
                ret.push({ parents, label: n.label, path: n.path });
              }

              if (n.children) {
                ret = [...ret, ...n.children.flatMap((c) => flatten(c, [...parents, n]))];
              }

              return ret;
            }

            const items = toc.flatMap((n) => flatten(n, []));

            const index = items.findIndex((v) => v.path === location.asPath.replace(/#.*/, ""));
            if (index === -1) {
              return null;
            }

            function toLink(index: number) {
              const item = items[index];
              if (item === undefined) {
                return undefined;
              } else {
                return {
                  href: item.path,
                  label: item.label,
                  context: item.parents.map((x) => x.label).join(" / "),
                };
              }
            }

            return (
              <div
                className={css`
                  margin-top: auto;
                  padding-top: 80px;
                `}
              >
                <NavigationFooter Link={Link} prev={toLink(index - 1)} next={toLink(index + 1)} />
              </div>
            );
          })()}
        </div>
      </Root>

      {search && <search.Component {...state.search} />}
    </>
  );
}

export default React.forwardRef(Page);
