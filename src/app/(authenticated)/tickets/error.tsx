"use client";
import Placeholder from "@/components/Placeholder";

export default function Error({ error }: { error: Error }) {
  return <Placeholder placeholder={error.message || "something went wrong"} />;
}
