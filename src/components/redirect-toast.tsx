"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/actions/cookie";

export default function RedirectToast() {
  const pathname = usePathname();

  useEffect(() => {
    const showCookieToast = async () => {
      const cookieKey = "toast";
      const message = await getCookieByKey(cookieKey);

      if (message) {
        toast.success(message);
        await deleteCookieByKey(cookieKey);
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
}
