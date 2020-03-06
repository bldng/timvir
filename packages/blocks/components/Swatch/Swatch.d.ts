import * as React from "react";
/**
 * The underlying DOM element which is rendered by this component.
 */
declare const Component = "div";
/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentPropsWithoutRef<typeof Component> {
    /**
     * The CSS Color value of the swatch. Any CSS color definition is accepted.
     *
     * @example "#FFFFFF"
     */
    value: string;
    /**
     * Color of the text that is rendered on top of the swatch. Should be chosen
     * such that it provides enough contrast. If not provided then the normal text
     * color from the page will be inherited.
     */
    contrastValue?: string;
    /**
     * Name of the swatch.
     */
    name?: string;
    /**
     * Use this as a short reference where or how the color was derived. If it is an
     * primordial color (not derived from any color palette or other algorithm), then
     * leave it empty.
     *
     * @example "Blue 500"
     */
    ancestry?: string;
}
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<unknown>>;
export default _default;
