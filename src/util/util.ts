import { FinancingApproved } from "../api/Financing.Client";

export function setsMatch<T>(arr1: T[], arr2: T[]) {
    const unionSize = new Set([...arr1, ...arr2]).size;
    return unionSize === arr1.length && unionSize === arr2.length;
}

export function sortByExpiration(a: FinancingApproved, b: FinancingApproved) {
    if (a.expiration === undefined) {
        return -1;
    } else if (b.expiration === undefined) {
        return 1;
    } else {
        return b.expiration.valueOf() - a.expiration.valueOf();
    }
}

export const trackIsRunningGeneric = (setIsRunning: (status: boolean) => void) =>
    <TParam extends unknown[], TReturn>(fn: (...param: TParam) => Promise<TReturn>) =>
        (...param: Parameters<typeof fn>) => {
            setIsRunning(true);
            try {
                return fn(...param);
            } finally {
                setIsRunning(false);
            }
        }