import { redirect } from "next/navigation";

/** Match the original app's URL structure — the list lives at /gov-grant/recommend. */
export default function RootPage() {
  redirect("/gov-grant/recommend");
}
