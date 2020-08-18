import { css } from "linaria";
import theme from "prism-react-renderer/themes/github";
import * as React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { Exhibit } from "../../Exhibit";
import { Swatch } from "../../Swatch";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  scope?: unknown;
  scopeResource?: { read(): any };
}

function Renderer(props: Props, ref: any /* FIXME */) {
  const { scopeResource, scope: _, ...rest } = props;

  const scope = scopeResource.read();

  return (
    <Root ref={ref} {...rest}>
      <LiveProvider
        theme={theme}
        code={`<Swatch value="#ff5511" contrastValue="white" />`}
        scope={{ ...scope, Swatch }}
      >
        <Exhibit
          bleed={8}
          className={css`
            margin-bottom: 12px;
          `}
        >
          <LivePreview />
        </Exhibit>

        <LiveEditor
          className={css`
            margin: -8px;
            & textarea:focus {
              outline: none;
            }
          `}
        />

        <LiveError />
      </LiveProvider>
    </Root>
  );
}

export default React.forwardRef(Renderer);
