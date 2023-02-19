import crypto from "crypto";
import { Link, useActionData, useTransition } from "@remix-run/react";
import { json } from "@remix-run/node";

import ContactForm from "../../components/ContactForm";

import type { ActionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "sdhnv - Contact Form",
    description: "Contact Us",
  };
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const email = String(values.email);
  if (!email) {
    return json({
      success: false,
      message: "E Mail Field is missing.",
    });
  }
  const email_parts = email.trim().split("@");
  const is_gmail = /(gmail|googlemail)\.com/g.test(email_parts[1]);
  let normalized_email = "";
  if (!is_gmail) {
    // Save data to DB
    return json({
      success: false,
      message: "E Mail needs to be gmail or googlemail",
    });
  }
  if (is_gmail && email_parts.length > 1) {
    // Save data to DB
    normalized_email = email_parts[0].replace(".", "") + "@" + email_parts[1];
    const email_hash = crypto
      .createHash("sha256")
      // updating data
      .update(normalized_email)
      // Encoding to be used
      .digest("base64url");

    return json({
      success: true,
      message: "Form Successfully Submitted.",
      email_hash,
    });
  }
}
export default function ContactPage() {
  const transition = useTransition();
  const actionData = useActionData<typeof action>();

  return (
    <div className="p-5">
      <h1 className="text-4xl text-center">SDHNV</h1>
      <hr />
      <Link to="/">Home Page</Link>
      <hr />
      <ContactForm transition={transition} actionData={actionData} />
    </div>
  );
}
