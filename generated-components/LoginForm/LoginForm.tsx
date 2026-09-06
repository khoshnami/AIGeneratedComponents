import React from "react";
import { useForm, FormProvider } from "react-hook-form";

// Project name (just a local constant, not sent anywhere)
const PROJECT_NAME = "login";

// --- Icons (Linear style, JSX) ---
function UserIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Basic-Users" transform="translate(-64, -234)" fillRule="nonzero">
          <g id="User" transform="translate(44, 166)">
            <g id="Icon/User/Linear" transform="translate(20, 68)">
              <path d="M17,7 C17,9.76142383 14.7614238,12 12,12 C9.23857617,12 7,9.76142383 7,7 C7,4.23857617 9.23857617,2 12,2 C14.7614238,2 17,4.23857617 17,7 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fillRule="nonzero"></path>
              <g id="Vector" strokeLinecap="round" strokeLinejoin="round" fillRule="evenodd" strokeWidth="1" transform="translate(3.41, 15)" stroke="currentColor">
                <path d="M17.1799927,7 C17.1799927,3.13000011 13.3299961,0 8.58999634,0 C3.84999657,0 0,3.13000011 0,7" strokeWidth="1.5" fillRule="nonzero"></path>
                <line x1="0" y1="7" x2="17.1799927" y2="7" strokeWidth="1.5" fillRule="nonzero"></line>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

function EmailIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="3.5" width="20" height="17" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 7.25L13.87 9.75C12.84 10.57 11.15 10.57 10.12 9.75L7 7.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.45492 21.7553L6.68668 21.042L6.45492 21.7553ZM3.24472 18.5451L3.95801 18.3133L3.24472 18.5451ZM20.7553 18.5451L20.042 18.3133L20.7553 18.5451ZM17.5451 21.7553L17.3133 21.042L17.5451 21.7553ZM17.5451 8.24472L17.3133 8.95801L17.5451 8.24472ZM20.7553 11.4549L20.042 11.6867L20.7553 11.4549ZM6.45492 8.24472L6.68668 8.95801L6.45492 8.24472ZM3.24472 11.4549L3.95801 11.6867L3.24472 11.4549ZM12.75 13C12.75 12.5858 12.4142 12.25 12 12.25C11.5858 12.25 11.25 12.5858 11.25 13H12H12.75ZM11.25 17C11.25 17.4142 11.5858 17.75 12 17.75C12.4142 17.75 12.75 17.4142 12.75 17H12H11.25ZM10 8V8.75H14V8V7.25H10V8ZM14 22V21.25H10V22V22.75H14V22ZM10 22V21.25C8.08034 21.25 7.29839 21.2407 6.68668 21.042L6.45492 21.7553L6.22315 22.4686C7.11777 22.7593 8.19709 22.75 10 22.75V22ZM3 15H2.25C2.25 16.8029 2.24075 17.8822 2.53142 18.7768L3.24472 18.5451L3.95801 18.3133C3.75925 17.7016 3.75 16.9197 3.75 15H3ZM6.45492 21.7553L6.68668 21.042C5.39282 20.6216 4.37841 19.6072 3.95801 18.3133L3.24472 18.5451L2.53142 18.7768C3.1002 20.5274 4.47263 21.8998 6.22315 22.4686L6.45492 21.7553ZM21 15H20.25C20.25 16.9197 20.2407 17.7016 20.042 18.3133L20.7553 18.5451L21.4686 18.7768C21.7593 17.8822 21.75 16.8029 21.75 15H21ZM14 22V22.75C15.8029 22.75 16.8822 22.7593 17.7768 22.4686L17.5451 21.7553L17.3133 21.042C16.7016 21.2407 15.9197 21.25 14 21.25V22ZM20.7553 18.5451L20.042 18.3133C19.6216 19.6072 18.6072 20.6216 17.3133 21.042L17.5451 21.7553L17.7768 22.4686C19.5274 21.8998 20.8998 20.5274 21.4686 18.7768L20.7553 18.5451ZM21 15H21.75C21.75 13.1971 21.7593 12.1178 21.4686 11.2232L20.7553 11.4549L20.042 11.6867C20.2407 12.2984 20.25 13.0803 20.25 15H21ZM17.5451 8.24472L17.3133 8.95801C18.6072 9.37841 19.6216 10.3928 20.042 11.6867L20.7553 11.4549L21.4686 11.2232C20.8998 9.47263 19.5274 8.1002 17.7768 7.53142L17.5451 8.24472ZM3 15H3.75C3.75 13.0803 3.75925 12.2984 3.95801 11.6867L3.24472 11.4549L2.53142 11.2232C2.24075 12.1178 2.25 13.1971 2.25 15H3ZM6.45492 8.24472L6.22315 7.53142C4.47263 8.1002 3.1002 9.47263 2.53142 11.2232L3.24472 11.4549L3.95801 11.6867C4.37841 10.3928 5.39282 9.37841 6.68668 8.95801L6.45492 8.24472ZM17 7H16.25V8H17H17.75V7H17ZM7 8H7.75V7H7H6.25V8H7ZM12 2V2.75C14.3472 2.75 16.25 4.65279 16.25 7H17H17.75C17.75 3.82436 15.1756 1.25 12 1.25V2ZM12 2V1.25C8.82436 1.25 6.25 3.82436 6.25 7H7H7.75C7.75 4.65279 9.65279 2.75 12 2.75V2ZM12 13H11.25V17H12H12.75V13H12ZM10 8V7.25C8.58853 7.25 7.6278 7.24738 6.8754 7.37414L7 8.11372L7.1246 8.85329C7.7222 8.75262 8.52815 8.75 10 8.75V8ZM7 8.11372L6.8754 7.37414C6.64772 7.4125 6.43257 7.46338 6.22315 7.53142L6.45492 8.24472L6.68668 8.95801C6.81685 8.91571 6.95935 8.88113 7.1246 8.85329L7 8.11372ZM7 8H6.25V8.11372H7H7.75V8H7ZM14 8V8.75C15.4719 8.75 16.2778 8.75262 16.8754 8.85329L17 8.11372L17.1246 7.37414C16.3722 7.24738 15.4115 7.25 14 7.25V8ZM17 8.11372L16.8754 8.85329C17.0407 8.88113 17.1831 8.91571 17.3133 8.95801L17.5451 8.24472L17.7768 7.53142C17.5674 7.46338 17.3523 7.4125 17.1246 7.37414L17 8.11372ZM17 8H16.25V8.11372H17H17.75V8H17Z" fill="currentColor"/>
    </svg>
  );
}

function EyeIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.1614 12.0531C15.1614 13.7991 13.7454 15.2141 11.9994 15.2141C10.2534 15.2141 8.83838 13.7991 8.83838 12.0531C8.83838 10.3061 10.2534 8.89111 11.9994 8.89111C13.7454 8.89111 15.1614 10.3061 15.1614 12.0531Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.998 19.355C15.806 19.355 19.289 16.617 21.25 12.053C19.289 7.48898 15.806 4.75098 11.998 4.75098H12.002C8.194 4.75098 4.711 7.48898 2.75 12.053C4.711 16.617 8.194 19.355 12.002 19.355H11.998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// --- Small UI primitives ---
function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
      {children}
    </label>
  );
}

function Input({ id, children, icon, error, ...props }) {
  return (
    <div style={{ position: "relative" }}>
      {icon && (
        <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#6b7280" }}>
          {icon}
        </div>
      )}
      <input
        id={id}
        {...props}
        style={{
          width: "100%",
          padding: "10px 12px",
          paddingLeft: icon ? 38 : 12,
          borderRadius: 8,
          border: error ? "1px solid #f87171" : "1px solid #d1d5db",
          boxSizing: "border-box",
        }}
      />
      {children}
    </div>
  );
}

// --- Login form component (JS) ---
export default function LoginForm() {
  const methods = useForm({ defaultValues: { identifier: "", password: "", remember: false } });
  const { register, handleSubmit, formState, setError, clearErrors, watch, reset } = methods;
  const [serverErrors, setServerErrors] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);

  // Map server errors into react-hook-form (type: server)
  React.useEffect(() => {
    if (!serverErrors) return;
    Object.entries(serverErrors).forEach(([name, msg]) => {
      setError(name, { type: "server", message: msg });
    });
    // clear subscription: when field changes, clear server error for that field
    const subscription = watch((_, { name, type }) => {
      if (!name || type !== "change") return;
      const fieldError = formState.errors[name];
      if (fieldError && fieldError.type === "server") {
        clearErrors(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [serverErrors, setError, watch, clearErrors, formState.errors]);

  const onSubmit = handleSubmit((values) => {
    // Fake server validation: if identifier is 'error' produce server error
    if (values.identifier === "error@example.com" || values.identifier === "error") {
      const se = { identifier: "این حساب فعال نیست یا ایمیل اشتباه است." };
      setServerErrors(se);
      return;
    }

    setServerErrors(null);
    // Simulate successful login
    alert("ورود موفق:\n" + JSON.stringify({ project: PROJECT_NAME, ...values }, null, 2));
    reset();
  });

  return (
    <div style={{ maxWidth: 420, padding: 20, border: "1px solid #e5e7eb", borderRadius: 12, fontFamily: "sans-serif" }}>
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>ورود</h3>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit} noValidate>

          <div style={{ marginBottom: 14 }}>
            <Label htmlFor="identifier">ایمیل یا نام کاربری</Label>
            <Input
              id="identifier"
              icon={<EmailIcon style={{ width: 18, height: 18 }} />}
              error={formState.errors.identifier}
              {...register("identifier", { required: "این فیلد اجباری است." })}
              placeholder="example@domain.com یا username"
            />
            <div style={{ color: "#dc2626", fontSize: 13, marginTop: 6 }}>{formState.errors.identifier?.message}</div>
          </div>

          <div style={{ marginBottom: 6 }}>
            <Label htmlFor="password">رمز عبور</Label>
            <div style={{ position: "relative" }}>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                error={formState.errors.password}
                {...register("password", { required: "رمز عبور لازم است.", minLength: { value: 6, message: "حداقل ۶ کاراکتر" } })}
                placeholder="رمز عبور"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "مخفی‌سازی رمز" : "نمایش رمز"}
                style={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  border: "none",
                  background: "transparent",
                  padding: 6,
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                <EyeIcon style={{ width: 18, height: 18 }} />
              </button>
            </div>
            <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>حداقل ۶ کاراکتر وارد کنید.</div>
            <div style={{ color: "#dc2626", fontSize: 13, marginTop: 6 }}>{formState.errors.password?.message}</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" {...register("remember")} />
              <span style={{ fontSize: 14 }}>مرا به خاطر بسپار</span>
            </label>

            <button type="button" onClick={() => alert("بازیابی رمز (نمونه)") } style={{ background: "transparent", border: "none", color: "#2563eb", cursor: "pointer" }}>
              رمز را فراموش کرده‌اید؟
            </button>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" style={{ padding: "10px 14px", borderRadius: 8, background: "#2563eb", color: "white", border: "none", cursor: "pointer" }}>
              ورود
            </button>

            <button type="button" onClick={() => reset()} style={{ padding: "10px 14px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", cursor: "pointer" }}>
              بازنشانی
            </button>
          </div>

          <hr style={{ margin: "18px 0", border: 0, borderTop: "1px solid #e5e7eb" }} />

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#111827" }}>
              <UserIcon style={{ width: 18, height: 18 }} />
              <span style={{ fontSize: 14 }}>ورود با کاربری</span>
            </div>

            <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
              <button type="button" onClick={() => alert('ورود با گوگل (نمونه)')} style={{ background: "#fff", border: "1px solid #e5e7eb", padding: "8px", borderRadius: 8 }}>
                Google
              </button>
              <button type="button" onClick={() => alert('ورود با GitHub (نمونه)')} style={{ background: "#fff", border: "1px solid #e5e7eb", padding: "8px", borderRadius: 8 }}>
                GitHub
              </button>
            </div>
          </div>

        </form>
      </FormProvider>
    </div>
  );
}
