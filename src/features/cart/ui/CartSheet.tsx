"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CartContent } from "./CartContent";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 [&>button]:top-6 sm:w-100"
        aria-label="Содержимое корзины"
      >
        <CartContent onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
