import { CURRICULUM } from "../../../constants/content";
import { AppearGroup, AppearItem } from "../components/Appear";
import { Section } from "../components/Section";

/** The self-directed finance curriculum, as a plain status table. */
export const Curriculum = () => (
    <Section id="curriculum" title="Curriculum" aside={CURRICULUM.note}>
        <AppearGroup className="divide-y divide-line">
            {CURRICULUM.items.map((item) => (
                <AppearItem
                    key={item.name}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                >
                    <span className="text-sm text-ink">{item.name}</span>
                    <span className="pl-faint flex-1 text-xs sm:px-4">{item.detail}</span>
                    <span className="pl-muted text-xs">{item.status}</span>
                </AppearItem>
            ))}
        </AppearGroup>
    </Section>
);

export default Curriculum;
