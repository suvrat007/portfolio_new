import { useState } from "react";

import { SITE } from "../constants/site";
import { useInterval } from "./useInterval";

const TICK_MS = 1_000;

const formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: SITE.timezone,
});

/** Live local time, shown in the header the way a studio site would. */
export const useClock = () => {
    const [time, setTime] = useState(() => formatter.format(new Date()));
    useInterval(() => setTime(formatter.format(new Date())), TICK_MS);
    return time;
};
