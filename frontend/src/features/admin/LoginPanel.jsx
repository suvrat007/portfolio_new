import { useState } from "react";

import { SITE } from "../../constants/site";
import { useAuth } from "../../hooks/useAuth";
import { validateCredentials } from "../../lib/validators";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/ui/Field";
import { Reveal } from "../../components/ui/Reveal";

/** Admin sign-in. Deliberately plain. It is not a public-facing surface. */
export const LoginPanel = () => {
    const { signIn, isSubmitting, error, dismissError } = useAuth();
    const [values, setValues] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const setField = (field) => (event) => {
        setValues((current) => ({ ...current, [field]: event.target.value }));
        setFieldErrors((current) => ({ ...current, [field]: undefined }));
        if (error) dismissError();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validateCredentials(values);
        setFieldErrors(errors);
        if (Object.keys(errors).length > 0) return;

        try {
            await signIn(values);
        } catch {
            // `error` from the auth slice is rendered below.
        }
    };

    return (
        <div className="u-container flex min-h-[70dvh] items-center py-24">
            <Reveal className="mx-auto w-full max-w-sm">
                <p className="u-label text-faint">{SITE.name}</p>
                <h1 className="u-title mt-3">Admin access</h1>
                <p className="u-lede mt-4 text-sm">
                    Sign in to publish and edit work without redeploying the site.
                </p>

                <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
                    <Field
                        label="Email"
                        type="email"
                        autoComplete="username"
                        value={values.email}
                        onChange={setField("email")}
                        error={fieldErrors.email}
                        placeholder="you@example.com"
                    />

                    <div className="relative">
                        <Field
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            value={values.password}
                            onChange={setField("password")}
                            error={fieldErrors.password}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((shown) => !shown)}
                            className="u-label absolute right-0 top-7 text-faint transition-colors hover:text-ink"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {error ? <p className="text-sm text-signal">{error}</p> : null}

                    <Button type="submit" disabled={isSubmitting} magnetic={false}>
                        {isSubmitting ? "Signing in" : "Sign in"}
                    </Button>
                </form>
            </Reveal>
        </div>
    );
};

export default LoginPanel;
