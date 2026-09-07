import { SECTIONS } from "../../../constants/site";
import { useContent } from "../../../hooks/useContent";
import { AdminStackActions, AdminTechAction } from "../../../shared/admin/AdminStackActions";
import { AppearGroup, AppearItem } from "../components/Appear";
import { Section } from "../components/Section";

/** Toolkit as flat chips, grouped by category. */
export const Skills = () => {
    const { stack } = useContent();

    if (stack.length === 0) return null;

    return (
        <Section id={SECTIONS.toolkit.id} title="Skills">
            <AppearGroup className="flex flex-col gap-6">
                {stack.map((group) => (
                    <AppearItem key={group.id}>
                        <div className="mb-3 flex items-center gap-2">
                            <h3 className="pl-faint text-xs uppercase tracking-widest">
                                {group.category}
                            </h3>
                            <AdminStackActions category={group.category} />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {group.techs.map((tech) => (
                                <span key={tech.id} className="pl-pill group/tech text-sm">
                                    {tech.image ? (
                                        <img
                                            src={tech.image}
                                            alt=""
                                            width={16}
                                            height={16}
                                            loading="lazy"
                                            className="size-4 object-contain"
                                            onError={(event) => {
                                                event.currentTarget.style.display = "none";
                                            }}
                                        />
                                    ) : null}
                                    {tech.name}
                                    <AdminTechAction
                                        category={group.category}
                                        techName={tech.name}
                                    />
                                </span>
                            ))}
                        </div>
                    </AppearItem>
                ))}
            </AppearGroup>
        </Section>
    );
};

export default Skills;
