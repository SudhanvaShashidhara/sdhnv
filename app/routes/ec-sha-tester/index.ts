import crypto from "crypto";
import { json } from "@remix-run/node";

import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email")?.trim();

  if (email) {
    const email_parts = email?.split("@");
    const is_gmail = /(gmail|googlemail)\.com/g.test(email_parts[1]);
    let normalized_email = "";
    if (!is_gmail) {
      return json({ error: "E Mail needs to be gmail or googlemail" });
    }
    if (is_gmail && email_parts.length > 1) {
      normalized_email = email_parts[0].replace(".", "") + "@" + email_parts[1];
      const email_hash = crypto
        .createHash("sha256")
        // updating data
        .update(normalized_email)
        // Encoding to be used
        .digest("base64url");

      return json({ email_hash });
    }
  } else {
    return json({ error: "Provide a email query parameter" });
  }
}
