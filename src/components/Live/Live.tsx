import * as React from "react";

const Renderer = React.lazy(() => import("./internal/Renderer"));

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  scope?: () => Promise<any>
}

function Live(props: Props, ref: any /* FIXME */) {
  return (
    <React.Suspense fallback={<div>loading</div>}>
      <Renderer {...props} />
    </React.Suspense>
  );
}

export default React.forwardRef(Live);
