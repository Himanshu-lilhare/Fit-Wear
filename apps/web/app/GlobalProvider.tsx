"use client"

import { RecoilRoot } from "recoil";
export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<RecoilRoot>
  {children}
</RecoilRoot>
  );
}
