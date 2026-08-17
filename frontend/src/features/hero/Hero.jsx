import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { HERO } from "../../constants/content";
import { DURATION, EASE, STAGGER } from "../../constants/motion";
import { SECTIONS, SITE } from "../../constants/site";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/cn";
import { Arrow, Button } from "../../components/ui/Button";
import { MaskedLines } from "../../components/ui/MaskedLines";
import { Marquee } from "../../components/ui/Marquee";
import { StatusDot } from "../../components/ui/Tag";

const MARQUEE_ITEMS = [
    "Financial Statement Analysis",
    "Intrinsic Valuation",
    "Portfolio Theory",
    "Options Pricing",
    "Data Pipelines",
    "Real-time Analytics",
    "Production Systems",
];

/** The accent word is set in the serif italic; everything else stays grotesk. */
const renderHeadlineLine = (line) =>
    line === HERO.accentWord ? <span className="u-serif">{line}</span> : line;

export const Hero = () => {
    const containerRef = useRef(null);
    const reduceMotion = usePrefersReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // The headline drifts up slightly faster than the page, a small depth cue.
    const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
    const fadeOut = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

    return (
        <section ref={containerRef} className="relative pt-10 md:pt-16">
            <div className="u-container">
                {/* Availability */}
                <motion.div
                    className="flex items-center justify-between gap-6 pb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: DURATION.slow, delay: 0.1 }}
                >
                    <div className="flex items-center gap-3">
                        <StatusDot status="live" />
                        <span className="u-label text-ink">{HERO.eyebrow}</span>
                    </div>
                    <span className="u-label hidden text-faint md:inline">
                        {SITE.location}
                    </span>
                </motion.div>

                <div className="u-hairline" />

                {/* Headline */}
                <motion.div
                    style={reduceMotion ? undefined : { y: headlineY, opacity: fadeOut }}
                    className="py-10 md:py-16"
                >
                    <MaskedLines
                        as="h1"
                        lines={HERO.headline.map(renderHeadlineLine)}
                        className="u-display"
                        stagger={STAGGER.loose}
                    />
                </motion.div>

                <div className="u-hairline" />

                {/* Statement */}
                <div className="grid gap-10 py-10 md:grid-cols-12 md:gap-8 md:py-14">
                    {/* Portrait: small, deliberately not the focus. */}
                    <motion.div
                        className="md:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: DURATION.slow, delay: 0.5, ease: EASE.out }}
                    >
                        <div className="relative w-28 overflow-hidden bg-sunken md:w-full">
                            <img
                                src={SITE.portraitUrl}
                                alt={SITE.name}
                                width={320}
                                height={400}
                                loading="eager"
                                fetchPriority="high"
                                className={cn(
                                    "aspect-[4/5] w-full object-cover",
                                    "grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                    "hover:grayscale-0",
                                )}
                                onError={(event) => {
                                    event.currentTarget.style.display = "none";
                                }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="md:col-span-6 md:col-start-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: DURATION.slow, delay: 0.6, ease: EASE.out }}
                    >
                        <p className="u-lede u-pretty max-w-xl text-ink">{HERO.lede}</p>

                        <div className="mt-10 flex flex-wrap items-center gap-3">
                            <Button
                                as="a"
                                href={SITE.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {HERO.primaryCta.label}
                                <Arrow />
                            </Button>
                            <Button
                                as="a"
                                href={`#${SECTIONS.work.id}`}
                                variant="outline"
                                magnetic={false}
                            >
                                {HERO.secondaryCta.label}
                                <Arrow direction="right" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Meta column: the small print that anchors the claim. */}
                    <motion.dl
                        className="flex flex-col gap-5 md:col-span-3 md:col-start-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: DURATION.slow, delay: 0.75 }}
                    >
                        {HERO.meta.map((entry) => (
                            <div
                                key={entry.label}
                                className="flex items-baseline justify-between gap-4 border-b border-line pb-3"
                            >
                                <dt className="u-label text-faint">{entry.label}</dt>
                                <dd className="u-label text-ink">{entry.value}</dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>
            </div>

            {/* Capability ticker */}
            <div className="border-y border-line py-4">
                <Marquee items={MARQUEE_ITEMS} />
            </div>
        </section>
    );
};

export default Hero;
