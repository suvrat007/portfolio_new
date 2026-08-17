import { useEffect } from "react";

import { SITE } from "../constants/site";

const setMeta = (selector, attribute, value) => {
    const element = document.head.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
};

/**
 * Per-route document title and description. A dependency-free stand-in for a
 * head manager — this site has three routes, not thirty.
 */
export const usePageMeta = ({ title, description }) => {
    useEffect(() => {
        const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.role}`;
        const resolvedDescription = description ?? SITE.description;

        document.title = fullTitle;
        setMeta('meta[name="description"]', "content", resolvedDescription);
        setMeta('meta[property="og:title"]', "content", fullTitle);
        setMeta('meta[property="og:description"]', "content", resolvedDescription);
        setMeta('meta[name="twitter:title"]', "content", fullTitle);
        setMeta('meta[name="twitter:description"]', "content", resolvedDescription);
    }, [title, description]);
};
