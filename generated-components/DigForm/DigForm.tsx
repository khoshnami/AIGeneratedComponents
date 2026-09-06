import React from "react";
import {
  useForm,
  Controller,
  FormProvider,
  type UseFormReturn,
} from "react-hook-form";

// --- Simple local primitives (Label, Slot) ---
function Label({ htmlFor, children, className }: any) {
  return (
    <label htmlFor={htmlFor} style={{ display: "block", fontWeight: 600 }} className={className}>
      {children}
    </label>
  );
}

function Slot({ id, children, ...props }: any) {
  return (
    <div id={id} {...props}>
      {children}
    </div>
  );
}

// --- Eye icon (Linear, JSX) ---
function EyeIcon(props: any) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1614 12.0531C15.1614 13.7991 13.7454 15.2141 11.9994 15.2141C10.2534 15.2141 8.83838 13.7991 8.83838 12.0531C8.83838 10.3061 10.2534 8.89111 11.9994 8.89111C13.7454 8.89111 15.1614 10.3061 15.1614 12.0531Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.998 19.355C15.806 19.355 19.289 16.617 21.25 12.053C19.289 7.48898 15.806 4.75098 11.998 4.75098H12.002C8.194 4.75098 4.711 7.48898 2.75 12.053C4.711 16.617 8.194 19.355 12.002 19.355H11.998Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// --- Minimal Form primitives inspired by Dig's implementation ---

type FieldValues = Record<string, any>;

function Form<T extends FieldValues>({ form, serverErrors, children }: { form: UseFormReturn<T>; serverErrors?: Partial<Record<string, string>>; children: React.ReactNode; }) {
  const { setError, clearErrors, watch, getFieldState } = form;

  React.useEffect(() => {
    if (!serverErrors) return;
    for (const [name, message] of Object.entries(serverErrors)) {
      if (message) setError(name as any, { type: "server", message });
    }
  }, [serverErrors, setError]);

  React.useEffect(() => {
    if (!serverErrors) return;
    const subscription = watch((_value, { name, type }) => {
      if (!name || type !== "change") return;
      const state = getFieldState(name as any);
      if (state?.error?.type === "server") {
        clearErrors(name as any);
      }
    });
    return () => subscription.unsubscribe();
  }, [serverErrors, watch, clearErrors, getFieldState]);

  return <FormProvider {...form}>{children}</FormProvider>;
}

const FormFieldContext = React.createContext<{ name: string } | null>(null);

function FormField<T extends FieldValues>({ name, children, control, rules }: any) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller name={name} control={control} rules={rules} render={() => children} />
    </FormFieldContext.Provider>
  );
}

function useFormField() {
  const ctx = React.useContext(FormFieldContext);
  if (!ctx) throw new Error("useFormField must be used inside FormField");
  const id = React.useId();
  return {
    id,
    name: ctx.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  };
}

function FormItem({ children, style }: any) {
  const id = React.useId();
  return (
    <div style={{ marginBottom: 12 }} id={id}>
      {children}
    </div>
  );
}

function FormLabel({ children, htmlFor }: any) {
  return (
    <Label htmlFor={htmlFor}>
      {children}
    </Label>
  );
}

function FormControl({ id, children, ariaDescribedBy, ariaInvalid }: any) {
  return (
    <Slot id={id} aria-describedby={ariaDescribedBy} aria-invalid={ariaInvalid}>
      {children}
    </Slot>
  );
}

function FormDescription({ children }: any) {
  if (!children) return null;
  return <div style={{ fontSize: 13, color: "#6b7280" }}>{children}</div>;
}

function FormMessage({ children }: any) {
  if (!children) return null;
  return <div style={{ color: "#dc2626", fontSize: 13 }}>{children}</div>;
}

// --- The actual exported form component ---
export default function DigForm() {
  const methods = useForm({ defaultValues: { fullName: "", email: "", password: "" } });
  const [serverErrors, setServerErrors] = React.useState<Partial<Record<string, string>> | undefined>(undefined);
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = methods.handleSubmit((values) => {
    // Simulate server-side validation
    if (values.email === "error@example.com") {
      // Set server errors so Form will map them into react-hook-form errors
      setServerErrors({ email: "این ایمیل قبلاً ثبت شده است." });
      return;
    }

    // Clear previous server errors and proceed
    setServerErrors(undefined);
    alert("فرم با موفقیت ارسال شد:\n" + JSON.stringify(values, null, 2));
  });

  return (
    <div style={{ maxWidth: 420, padding: 20, border: "1px solid #e5e7eb", borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>فرم ثبت‌نام (نمونه)</h3>
      <Form form={methods} serverErrors={serverErrors}>
        <form onSubmit={onSubmit} noValidate>
          <FormItem>
            <FormField name="fullName" control={methods.control}>
              <FormLabel htmlFor="fullName">نام و نام‌خانوادگی</FormLabel>
              <FormControl id="fullName" ariaDescribedBy={undefined} ariaInvalid={!!methods.formState.errors.fullName}>
                <input
                  id="fullName"
                  {...methods.register("fullName", { required: "وارد کردن نام الزامی است." })}
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #d1d5db" }}
                />
              </FormControl>
              <FormMessage>{methods.formState.errors.fullName?.message}</FormMessage>
            </FormField>
          </FormItem>

          <FormItem>
            <FormField name="email" control={methods.control}>
              <FormLabel htmlFor="email">ایمیل</FormLabel>
              <FormControl id="email" ariaDescribedBy={undefined} ariaInvalid={!!methods.formState.errors.email}>
                <input
                  id="email"
                  type="email"
                  {...methods.register("email", {
                    required: "ایمیل لازم است.",
                    pattern: { value: /\S+@\S+\.\S+/, message: "فرمت ایمیل معتبر نیست." },
                  })}
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #d1d5db" }}
                />
              </FormControl>
              <FormMessage>{methods.formState.errors.email?.message}</FormMessage>
            </FormField>
          </FormItem>

          <FormItem>
            <FormField name="password" control={methods.control}>
              <FormLabel htmlFor="password">رمز عبور</FormLabel>
              <div style={{ position: "relative" }}>
                <FormControl id="password" ariaDescribedBy={undefined} ariaInvalid={!!methods.formState.errors.password}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...methods.register("password", { required: "رمز عبور لازم است.", minLength: { value: 6, message: "حداقل ۶ کاراکتر" } })}
                    style={{ width: "100%", padding: "8px 36px 8px 8px", borderRadius: 4, border: "1px solid #d1d5db" }}
                  />
                </FormControl>

                <button
                  type="button"
                  aria-label={showPassword ? "مخفی‌سازی رمز" : "نمایش رمز"}
                  onClick={() => setShowPassword((s) => !s)}
                  style={{
                    position: "absolute",
                    right: 6,
                    top: 6,
                    height: 28,
                    width: 28,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <EyeIcon style={{ color: "#374151" }} />
                </button>
              </div>

              <FormDescription>رمزتان را حداقل ۶ کاراکتر وارد کنید.</FormDescription>
              <FormMessage>{methods.formState.errors.password?.message}</FormMessage>
            </FormField>
          </FormItem>

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button type="submit" style={{ padding: "8px 12px", borderRadius: 6, background: "#2563eb", color: "white", border: "none" }}>
              ارسال
            </button>
            <button
              type="button"
              onClick={() => methods.reset()}
              style={{ padding: "8px 12px", borderRadius: 6, background: "#f3f4f6", border: "1px solid #e5e7eb" }}
            >
              بازنشانی
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
