import * as React from "react";

const Renderer = React.lazy(() => import("./internal/Renderer"));

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  scope?: () => Promise<any>;
}

function Live(props: Props, ref: any /* FIXME */) {
  const scopeResource = React.useMemo(() => wrapPromise(props.scope()), [props.scope]);

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <Renderer scopeResource={scopeResource} {...props} />
    </React.Suspense>
  );
}

export default React.forwardRef(Live);

function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}
