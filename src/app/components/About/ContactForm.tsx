"use client";
import { useState } from "react";
import Banner, { BannerData } from "../Banner";
import { sendContactEmail } from "@/service/contact";

type Form = {
  from: string;
  title: string;
  message: string;
};
const DEFAULT_FORM = {
  from: "",
  title: "",
  message: "",
};

export default function ContactForm() {
  const [emailData, setEmailData] = useState<Form>(DEFAULT_FORM);

  const [banner, setBanner] = useState<BannerData | null>(null);

  const handleChangeInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEmailData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail(emailData)
      .then(() => {
        setBanner({
          message: "메일이 성공적으로 전송되었습니다.",
          state: "success",
        });
        setEmailData(DEFAULT_FORM);
      })
      .catch((error) => {
        setBanner({
          message: "메일 전송이 실패되었습니다. 다시 시도해주세요.",
          state: "error",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setBanner(null);
        }, 3000);
      });
  };

  const inputStyle = "w-full px-3 py-2 border border-gray-200 rounded-sm";
  const labelTextStyle = "mb-2 text-sm text-gray-800 uppercase";

  return (
    <>
      <div className="h-10">{banner && <Banner banner={banner} />}</div>
      <section className="w-full max-w-lg min-w-[360px] mx-auto mt-10 mb-24">
        <h2 className="mb-1 pr-1 text-xs font-semibold text-right uppercase text-gray-800">
          Contact Me :&#41;
        </h2>
        <div className="border-2 border-gray-800 py-6 px-4 rounded-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label>
                <p className={labelTextStyle}>Your Email</p>
                <input
                  className={inputStyle}
                  type="text"
                  name="from"
                  value={emailData.from}
                  placeholder="Your email address"
                  onChange={handleChangeInput}
                />
              </label>
            </div>
            <div>
              <label>
                <p className={labelTextStyle}>Title</p>
                <input
                  className={inputStyle}
                  type="text"
                  name="title"
                  value={emailData.title}
                  placeholder="Title of your message"
                  onChange={handleChangeInput}
                />
              </label>
            </div>
            <div>
              <label>
                <p className={labelTextStyle}>Message</p>
                <textarea
                  className={`${inputStyle} h-52`}
                  name="message"
                  value={emailData.message}
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
    </>
  );
}
