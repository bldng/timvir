/**
 * This is documentation for the Code component.
 */
import { Language } from "prism-react-renderer";
import * as React from "react";
/**
 * The underlying DOM element which is rendered by this component.
 */
declare const Component = "pre";
/**
 * TODO: Document Me!
 */
interface Props extends React.ComponentPropsWithoutRef<typeof Component> {
    /**
     * The code that should be highlighted.
     */
    children: string;
    /**
     * Language in which the code is.
     *
     * @default "markup"
     */
    language?: Language;
}
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<unknown>>;
export default _default;
