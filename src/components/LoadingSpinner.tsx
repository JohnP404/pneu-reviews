import { twMerge } from "tailwind-merge";
type Props = {
    className?: string;
};
export default function LoadingSpinner({ className }: Props) {
    return (
        <div
            className={twMerge(
                "animate-spin rounded-full border-4 border-secondary border-t-primary/50 w-12 h-12",
                className
            )}
        />
    );
}
