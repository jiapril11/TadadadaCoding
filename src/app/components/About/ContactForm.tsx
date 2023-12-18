"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Banner, { BannerData } from "../Banner";
import { sendContactEmail } from "@/service/contact";

const emailFormSchema = z.object({
  from: z
    .string()
    .min(1, { message: "이메일을 입력해주세요" })
    .email({ message: "유효하지 않은 이메일 형식입니다" }),
  title: z.string().min(1, { message: "제목을 입력해주세요" }),
  message: z.string().min(1, { message: "내용을 입력해주세요" }),
});

type EmailForm = z.infer<typeof emailFormSchema>;

export default function ContactForm() {
  const [banner, setBanner] = useState<BannerData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
    mode: "onChange",
    defaultValues: {
      from: "",
      title: "",
      message: "",
    },
  });

  const onHandleSubmit: SubmitHandler<EmailForm> = (emailData) => {
    if (emailFormSchema.safeParse(emailData)) {
      sendContactEmail(emailData)
        .then(() => {
          reset();
          setBanner({
            message: "메일이 성공적으로 전송되었습니다.",
            state: "success",
          });
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
    }
  };

  const inputStyle = "w-full px-3 py-2 border border-gray-200 rounded-sm";
  const labelWrapperStyle = "flex justify-between align-center mb-2 px-1";
  const labelTextStyle = "text-sm text-gray-800 uppercase";
  const validateTextStyle = "text-red-500 text-xs";
  const validateInputStyle = (name: string) =>
    `${inputStyle} ${
      errors[name as keyof EmailForm]?.message
        ? "border-red-500 focus:outline-red-500"
        : "border-gray-200"
    }`;

  return (
    <>
      <div className="h-10">{banner && <Banner banner={banner} />}</div>
      <section className="w-full max-w-lg min-w-[360px] mx-auto mt-10 mb-24">
        <h2 className="mb-1 pr-1 text-xs font-semibold text-right uppercase text-gray-800">
          Contact Me :&#41;
        </h2>
        <div className="border-2 border-gray-800 py-6 px-4 rounded-sm">
          <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-5">
            <div>
              <div className={labelWrapperStyle}>
                <label className={labelTextStyle} htmlFor="from">
                  Your Email
                </label>
                {errors.from && (
                  <span className={validateTextStyle}>
                    {errors.from.message}
                  </span>
                )}
              </div>
              <input
                id="from"
                className={validateInputStyle("from")}
                type="text"
                placeholder="Your email address"
                {...register("from")}
              />
            </div>
            <div>
              <div className={labelWrapperStyle}>
                <label className={labelTextStyle} htmlFor="title">
                  Title
                </label>
                {errors.title && (
                  <span className={validateTextStyle}>
                    {errors.title.message}
                  </span>
                )}
              </div>
              <input
                id="title"
                className={validateInputStyle("title")}
                type="text"
                placeholder="Title of your message"
                {...register("title")}
              />
            </div>
            <div>
              <div className={labelWrapperStyle}>
                <label className={labelTextStyle} htmlFor="message">
                  Message
                </label>
                {errors.message && (
                  <span className={validateTextStyle}>
                    {errors.message.message}
                  </span>
                )}
              </div>
              <textarea
                id="message"
                className={`${validateInputStyle("message")} h-52`}
                placeholder="Type your message here."
                {...register("message")}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={!isValid}
                className="block w-full py-2 bg-gray-400 enabled:bg-black text-white rounded-sm enabled:hover:bg-gray-800"
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
