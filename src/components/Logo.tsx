import { Lotus } from "./ui";

export function Logo({
  mark = true,
  className = "",
  size = "md",
}: {
  mark?: boolean;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {mark && <Lotus base={false} sw={1.6} className={size === "sm" ? "h-7 w-auto" : "h-9 w-auto"} />}
      <span className="flex flex-col leading-none">
        <span className="block overflow-hidden pb-[3px]">
          <span
            className={`logo-word block font-display font-medium uppercase tracking-[.3em] ${
              size === "sm" ? "text-[1.05rem]" : "text-[1.3rem]"
            }`}
          >
            Nailza Costa
          </span>
        </span>
        <span className="logo-role mt-1.5 text-[.58rem] font-medium uppercase tracking-[.46em] opacity-80">
          Psicologia
        </span>
      </span>
    </span>
  );
}
