"use client";

import { FormEvent, useState } from "react";
import { useTheme } from "@/components/theme-context";

function FormField({
  placeholder,
  isTextarea,
  textColor,
  lineColor,
}: {
  placeholder: string;
  isTextarea?: boolean;
  textColor: string;
  lineColor: string;
}) {
  const [hasValue, setHasValue] = useState(false);

  const barStyle = "absolute top-0 bottom-0 w-[3px] rounded-sm";

  const inputClasses =
    "w-full bg-transparent text-center uppercase font-erbaum text-sm tracking-wider placeholder:text-center placeholder:uppercase placeholder:font-erbaum placeholder:text-sm placeholder:tracking-wider placeholder:opacity-50 border-none outline-none";

  return (
    <div
      className="relative"
      style={{ backgroundColor: hasValue ? "transparent" : lineColor }}
    >
      {/* Left accent bar */}
      <div
        className={`${barStyle} left-0`}
        style={{ backgroundColor: textColor }}
      />
      {/* Right accent bar */}
      <div
        className={`${barStyle} right-0`}
        style={{ backgroundColor: textColor }}
      />

      {isTextarea ? (
        <textarea
          placeholder={placeholder}
          rows={1}
          className={`${inputClasses} py-5 px-6 resize-none`}
          style={{ color: textColor }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
        />
      ) : (
        <input
          type={placeholder === "EMAIL" ? "email" : "text"}
          placeholder={placeholder}
          className={`${inputClasses} py-5 px-6`}
          style={{ color: textColor }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
        />
      )}
    </div>
  );
}

export function Contact() {
  const { colors } = useTheme();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem-2rem)] px-8 gap-y-6 md:gap-y-24">
      <div className="flex flex-col items-center">
        <h1
          className="font-erbaum font-light text-2xl md:text-3xl lg:text-4xl uppercase text-center"
          style={{ color: colors.textColor }}
        >
          LET&apos;S WORK TOGETHER
        </h1>

        <p
          className="mt-3 text-center text-md font max-w-lg opacity-70"
          style={{ color: colors.textColor }}
        >
          Hai una domanda, una proposta o vuoi conoscerci meglio?
          <br />
          Usa il form qui sotto e facci sapere cosa vuoi raccontarci.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl mx-auto flex flex-col gap-y-6 md:gap-y-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-y-6 md:gap-y-24">
          <div className="md:col-start-1">
            <FormField
              placeholder="NOME"
              textColor={colors.textColor}
              lineColor={colors.lineColor}
            />
          </div>
          <div className="md:col-start-3">
            <FormField
              placeholder="COGNOME"
              textColor={colors.textColor}
              lineColor={colors.lineColor}
            />
          </div>
          <div className="md:col-start-5">
            <FormField
              placeholder="EMAIL"
              textColor={colors.textColor}
              lineColor={colors.lineColor}
            />
          </div>

          <div className="md:col-start-2 md:row-start-2">
            <FormField
              placeholder="SOGGETTO"
              textColor={colors.textColor}
              lineColor={colors.lineColor}
            />
          </div>
          <div className="md:col-start-4 md:row-start-2">
            <FormField
              placeholder="MESSAGGIO"
              isTextarea
              textColor={colors.textColor}
              lineColor={colors.lineColor}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="font-erbaum text-md uppercase tracking-wider underline underline-offset-4 bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
            style={{ color: colors.textColor }}
          >
            INVIA MESSAGGIO
          </button>
        </div>
      </form>
    </div>
  );
}
