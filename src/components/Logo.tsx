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
      {mark && (
        <img
          src={size === "sm" ? "/img/logo-mark-sm.webp" : "/img/logo-mark.webp"}
          alt=""
          width={size === "sm" ? 125 : 405}
          height={size === "sm" ? 160 : 520}
          className={`w-auto ${size === "sm" ? "h-11 lg:h-12" : "h-14"}`}
        />
      )}
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
