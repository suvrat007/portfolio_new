import { motion } from "framer-motion";

import { fadeUp, STAGGER } from "../../constants/motion";
import { SECTIONS } from "../../constants/site";
import { useContent } from "../../hooks/useContent";
import { EmptyState } from "../../components/ui/EmptyState";
import { RevealGroup } from "../../components/ui/Reveal";
import { Section } from "../../components/ui/Section";
import { AdminStackActions, AdminTechAction } from "../admin/AdminStackActions";

const pad = (index) => String(index + 1).padStart(2, "0");

const StackGroup = ({ group, index }) => (
    <motion.div
        variants={fadeUp}
        className="grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-8"
    >
        <div className="flex items-baseline gap-4 md:col-span-4">
            <span className="u-label u-numeric text-faint">{pad(index)}</span>
            <h3 className="u-label text-ink">{group.category}</h3>
            <AdminStackActions category={group.category} />
        </div>

        <div className="flex flex-wrap items-start gap-x-6 gap-y-3 md:col-span-8">
            {group.techs.map((tech) => (
                <span
                    key={tech.id}
                    className="group/tech flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-ink"
                >
                    {tech.image ? (
                        <img
                            src={tech.image}
                            alt=""
                            width={16}
                            height={16}
                            loading="lazy"
                            className="size-4 object-contain opacity-70 transition-opacity duration-300 group-hover/tech:opacity-100"
                            onError={(event) => {
                                event.currentTarget.style.display = "none";
                            }}
                        />
                    ) : null}
                    {tech.name}
                    <AdminTechAction category={group.category} techName={tech.name} />
                </span>
            ))}

            {group.techs.length === 0 ? (
                <span className="u-label text-faint">Nothing listed yet</span>
            ) : null}
        </div>
    </motion.div>
);

export const Toolkit = () => {
    const { stack } = useContent();

    const total = stack.reduce((count, group) => count + group.techs.length, 0);

    return (
        <Section
            id={SECTIONS.toolkit.id}
            index={SECTIONS.toolkit.index}
            label={SECTIONS.toolkit.label}
            aside={total > 0 ? `${total} entries` : undefined}
        >
            {stack.length === 0 ? (
                <EmptyState
                    title="Toolkit is empty"
                    description="Categories added through the admin panel appear here."
                />
            ) : (
                <RevealGroup className="border-b border-line" stagger={STAGGER.tight}>
                    {stack.map((group, index) => (
                        <StackGroup key={group.id} group={group} index={index} />
                    ))}
                </RevealGroup>
            )}
        </Section>
    );
};

export default Toolkit;
