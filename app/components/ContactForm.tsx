import * as React from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";

import type { Transition } from "@remix-run/react/dist/transition";

type Props = {
  transition: Transition;
  // contactFormSubmitted: boolean;
  // actionData:
  //   | { success: boolean; message: string; email_hash?: string }
  //   | undefined;
  actionData: any;
};

export default function ContactForm({ transition, actionData }: Props) {
  const [contactFormSubmitted, setContactFormSubmitted] = React.useState(false);
  const [contactFormError, setContactFormError] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const isContactFormSubmitting =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "contact_form";

  React.useEffect(() => {
    const form = formRef.current as HTMLFormElement | undefined;
    if (!isContactFormSubmitting && form) {
      form.reset();
    }
    if (actionData?.success) {
      setContactFormSubmitted(true);
      window.dataLayer.push({
        event: "contact_form_submit",
        email_hash: actionData?.email_hash,
      });
    }
    if (actionData?.success === false) {
      setContactFormError(true);
    }
  }, [isContactFormSubmitting, actionData]);

  return (
    <div className="relative bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
      </div>
      <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
        <div className="bg-gray-50 py-16 px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
          <div className="mx-auto max-w-lg">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Get in touch
            </h2>
            <p className="mt-3 text-lg leading-6 text-gray-500">
              Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat
              massa dictumst amet. Sapien tortor lacus arcu.
            </p>
            <dl className="mt-8 text-base text-gray-500">
              <div>
                <dt className="sr-only">Postal address</dt>
                <dd>
                  <p>742 Evergreen Terrace</p>
                  <p>Springfield, OR 12345</p>
                </dd>
              </div>
              <div className="mt-6">
                <dt className="sr-only">Phone number</dt>
                <dd className="flex">
                  <PhoneIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">+1 (555) 123-4567</span>
                </dd>
              </div>
              <div className="mt-3">
                <dt className="sr-only">Email</dt>
                <dd className="flex">
                  <EnvelopeIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">support@example.com</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className={`py-16 px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12 ${
            contactFormSubmitted
              ? "grid items-center bg-green-200 p-2 rounded"
              : "bg-white"
          }`}
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            {!contactFormSubmitted ? (
              <Form
                ref={formRef}
                method="post"
                name="contact_form"
                className="grid grid-cols-1 gap-y-6"
              >
                <div>
                  <label htmlFor="full-name" className="sr-only">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    required
                    autoComplete="name"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Phone"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Message"
                    defaultValue={""}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    name="_action"
                    value="contact_form"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            ) : (
              <div className="grid items-center max-h-fit max-w-fit">
                <h1 className="text-center text-green-800">
                  Form Successfully Submitted.
                </h1>
              </div>
            )}
            {contactFormError && !contactFormSubmitted ? (
              <p className="p-2 mt-4 rounded bg-red-300 text-red-800">
                Form Submission Error: {actionData?.message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
