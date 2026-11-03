"use client";

import Image from "next/image";
import { useState } from "react";
import { bankLogoSrc } from "@/lib/kpr/bank-logo";
import type { Product } from "@/lib/kpr/types";

export function BankLogo({ bank }: { bank: Product["bank"] }) {
  const src = bankLogoSrc(bank);
  const [failedSrc, setFailedSrc] = useState<string>();

  return <span className="inline-flex h-11 w-28 shrink-0 items-center justify-center rounded-lg bg-white px-2 py-1.5">
    {src && src !== failedSrc ? <Image
      src={src}
      alt={bank.name}
      width={96}
      height={32}
      className="h-8 w-24 object-contain"
      onError={() => setFailedSrc(src)}
    /> : <span title={bank.name} className="truncate text-xs font-bold text-pine">{bank.mark || bank.name}</span>}
  </span>;
}
