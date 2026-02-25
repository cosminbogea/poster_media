"use client";

import { CSSProperties, FormEvent, useEffect, useState } from "react";
import { useTheme } from "@/components/theme-context";

function FormField({
  placeholder,
  name,
  isTextarea,
  textareaRows,
  textareaHeightClass,
  fieldTextColor,
  placeholderColor,
  lineColor,
  desktopFieldBackgroundColor,
  isMobile,
}: {
  placeholder: string;
  name: string;
  isTextarea?: boolean;
  textareaRows?: number;
  textareaHeightClass?: string;
  fieldTextColor: string;
  placeholderColor: string;
  lineColor: string;
  desktopFieldBackgroundColor: string;
  isMobile: boolean;
}) {
  const barStyle = "absolute top-0 bottom-0 w-[3px] rounded-sm";

  const inputClasses =
    "w-full bg-transparent font-bold text-center uppercase text-xs md:text-sm tracking-wider placeholder:text-center placeholder:uppercase  placeholder:text-xs md:placeholder:text-sm placeholder:tracking-wider placeholder:text-[var(--placeholder-color)] placeholder:opacity-60 border-none outline-none";

  const inputStyle = {
    color: fieldTextColor,
    "--placeholder-color": placeholderColor,
  } as CSSProperties;

  return (
    <div
      className="relative"
      style={{
        backgroundColor: desktopFieldBackgroundColor,
      }}
    >
      <>
        <div
          className={`${barStyle} left-0`}
          style={{ backgroundColor: lineColor }}
        />
        <div
          className={`${barStyle} right-0`}
          style={{ backgroundColor: lineColor }}
        />
      </>

      {isTextarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={textareaRows ?? 1}
          required
          className={`${inputClasses} py-5 px-6 resize-none ${textareaHeightClass ?? ""}`}
          style={{ ...inputStyle, textAlign: "center" }}
        />
      ) : (
        <input
          name={name}
          type={placeholder === "EMAIL" ? "email" : "text"}
          placeholder={placeholder}
          required
          className={`${inputClasses} py-5 px-6`}
          style={inputStyle}
        />
      )}
    </div>
  );
}

export function Contact() {
  const { colors, theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isShortMobile, setIsShortMobile] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const desktopFieldTextColor =
    theme === "white"
      ? "rgba(0, 0, 0, 0.9)"
      : theme === "black"
        ? "rgba(255, 255, 255, 0.95)"
        : colors.background;
  const fieldTextColor = desktopFieldTextColor;
  const placeholderColor = fieldTextColor;
  const desktopFieldBackgroundColor =
    theme === "black" ? colors.lineColor : colors.inactiveNavColor;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    const updateShortMobileState = () => setIsShortMobile(window.innerHeight <= 760);

    updateMobileState();
    updateShortMobileState();
    mediaQuery.addEventListener("change", updateMobileState);
    window.addEventListener("resize", updateShortMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
      window.removeEventListener("resize", updateShortMobileState);
    };
  }, []);

  const mobileSubtitleClass = isShortMobile
    ? "text-[0.625rem] font-bold leading-tight"
    : "text-[0.625rem] font-bold leading-tight";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.get("nome"),
          cognome: data.get("cognome"),
          email: data.get("email"),
          messaggio: data.get("messaggio"),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100svh-8rem)] md:min-h-[calc(100vh-2rem)] px-4 md:px-8 pt-2 md:pt-0 gap-y-10 md:gap-y-24">
      <div className="flex flex-col items-center">
        <h1
          className="font-erbaum font-light text-2xl md:text-3xl lg:text-4xl uppercase text-center"
          style={{ color: colors.textColor }}
        >
          LET&apos;S WORK TOGETHER
        </h1>

        <p
          className={`mt-3 max-w-lg text-center ${mobileSubtitleClass} md:text-[0.95rem] md:leading-normal md:font-normal lg:text-base 2xl:text-md`}
          style={{ color: colors.textColor }}
        >
          Have a question, a proposal, or want to get to know us better?
          <br />
          Use the form below and let us know what you&apos;d like to tell us.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl mx-auto flex flex-col items-center gap-y-8 md:gap-y-24"
      >
        <div className="grid w-full grid-cols-1 place-items-center gap-y-5 md:grid-cols-5 md:gap-y-24">
          <div className="w-[52vw] max-w-[17rem] md:w-[17rem] md:col-start-1">
            <FormField
              placeholder="FIRST NAME"
              name="nome"
              fieldTextColor={fieldTextColor}
              placeholderColor={placeholderColor}
              lineColor={colors.textColor}
              desktopFieldBackgroundColor={desktopFieldBackgroundColor}
              isMobile={isMobile}
            />
          </div>
          <div className="w-[52vw] max-w-[17rem] md:w-[17rem] md:col-start-3">
            <FormField
              placeholder="LAST NAME"
              name="cognome"
              fieldTextColor={fieldTextColor}
              placeholderColor={placeholderColor}
              lineColor={colors.textColor}
              desktopFieldBackgroundColor={desktopFieldBackgroundColor}
              isMobile={isMobile}
            />
          </div>
          <div className="w-[52vw] max-w-[17rem] md:w-[17rem] md:col-start-5">
            <FormField
              placeholder="EMAIL"
              name="email"
              fieldTextColor={fieldTextColor}
              placeholderColor={placeholderColor}
              lineColor={colors.textColor}
              desktopFieldBackgroundColor={desktopFieldBackgroundColor}
              isMobile={isMobile}
            />
          </div>

          <div className="w-[52vw] max-w-[17rem] md:w-[51rem] md:max-w-full md:col-start-2 md:col-span-3 md:row-start-2">
            <FormField
              placeholder="MESSAGE"
              name="messaggio"
              isTextarea
              textareaRows={3}
              textareaHeightClass="h-[9rem] pt-[3.8rem] pb-0 text-center placeholder:text-center"
              fieldTextColor={fieldTextColor}
              placeholderColor={placeholderColor}
              lineColor={colors.textColor}
              desktopFieldBackgroundColor={desktopFieldBackgroundColor}
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            disabled={status === "loading"}
            className="text-md uppercase tracking-wider underline underline-offset-8 decoration-[1px] md:underline-offset-4 bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: colors.textColor }}
          >
            {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
          </button>
          {status === "success" && (
            <p className="text-xs font-bold" style={{ color: colors.textColor }}>
              Message sent successfully.
            </p>
          )}
          {status === "error" && (
            <p className="text-xs font-bold opacity-70" style={{ color: colors.textColor }}>
              Error sending. Please try again or write to info@poster-media.com.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
