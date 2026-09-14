import { CURRICULUM } from "../../../constants/content";
import { AppearGroup, AppearItem } from "../components/Appear";
import { Section } from "../components/Section";

/** The self-directed finance curriculum, as a plain status table. */
export const Curriculum = () => (
    <Section id="curriculum" title="Curriculum" aside={CURRICULUM.note}>
        <AppearGroup className="divide-y divide-line">
            {CURRICULUM.items.map((item) => (
                <AppearItem key={item.name} className="py-3">
                    <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm text-ink">{item.name}</span>
                        <span className="pl-muted shrink-0 text-xs">{item.status}</span>
                    </div>
                    <p className="pl-faint mt-1 text-xs">{item.detail}</p>
                </AppearItem>
            ))}
        </AppearGroup>
    </Section>
);

export default Curriculum;
