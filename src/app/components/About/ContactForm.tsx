"use client";
import { useState } from "react";

export default function ContactForm() {
  const [emailData, setEmailData] = useState({
    email: "",
    title: "",
    message: "",
  });

  const handleChangeInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(emailData);
  };

  return (
    <section className="w-full max-w-lg min-w-[360px] mx-auto mt-10 mb-24">
      <h2 className="mb-1 pr-1 text-xs font-semibold text-right uppercase text-gray-800">
        Contact Me :&#41;
      </h2>
      <div className="border-2 border-gray-800 py-6 px-4 rounded-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label>
              <p className="mb-2 text-sm text-gray-800 uppercase">Your Email</p>
              <input
                className="w-full px-3 py-2 border border-gray-200 rounded-sm"
                type="text"
                name="email"
                placeholder="Your email address"
                onChange={handleChangeInput}
              />
            </label>
          </div>
          <div>
            <label>
              <p className="mb-2 text-sm text-gray-800 uppercase">Title</p>
              <input
                className="w-full px-3 py-2 border border-gray-200 rounded-sm"
                type="text"
                name="title"
                placeholder="Title of your message"
                onChange={handleChangeInput}
              />
            </label>
          </div>
          <div>
            <label>
              <p className="mb-2 text-sm text-gray-800 uppercase">Message</p>
              <textarea
                className="w-full h-40 px-3 py-2 border border-gray-200 rounded-sm"
                name="message"
                placeholder="Type your message here."
                onChange={handleChangeInput}
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="block w-full py-2 bg-black text-white rounded-sm hover:bg-gray-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
