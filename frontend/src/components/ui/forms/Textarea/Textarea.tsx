import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { hasError, className, ...rest },
  ref
) {
  const classes = [styles.textarea, hasError ? styles.error : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return <textarea ref={ref} className={classes} {...rest} />;
});
