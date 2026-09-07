import { getDesignSystem } from "../designs/registry";
import { useDesign } from "./DesignProvider";

/**
 * Indirection that lets the active design system swap without rebuilding the
 * router. The route tree stays static and only the rendered components change,
 * so navigation state and history survive a design switch.
 */
export const DesignLayout = () => {
    const { design } = useDesign();
    const { Layout } = getDesignSystem(design);
    return <Layout />;
};

/** Renders the active design's component for a named public route. */
export const DesignRoute = ({ name }) => {
    const { design } = useDesign();
    const { routes } = getDesignSystem(design);
    const Component = routes[name];
    return <Component />;
};
