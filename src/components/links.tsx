import type { ReactNode, MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToTarget } from "../motion/setup";

export function useGoto() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (hash: string) => {
    const go = () => (hash === "#inicio" ? scrollToTarget(0) : scrollToTarget(hash, -72));
    if (pathname === "/") go();
    else {
      navigate("/");
      setTimeout(go, 800);
    }
  };
}

export function HashLink({
  hash,
  children,
  className = "",
  onClick,
}: {
  hash: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const goto = useGoto();
  const handle = (e: MouseEvent) => {
    e.preventDefault();
    onClick?.();
    goto(hash);
  };
  return (
    <a href={"/" + hash} onClick={handle} className={className}>
      {children}
    </a>
  );
}
