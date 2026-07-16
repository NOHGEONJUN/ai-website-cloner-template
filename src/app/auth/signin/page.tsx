"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { cn } from "@/lib/utils";

/**
 * /auth/signin — extracted from the live page (form markup + input styles).
 * ⚠ Submit is a mock: no real auth, it simply returns to the recommend list.
 */
export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const disabled = email === "" || password === "";

  const inputCls =
    "h-14 w-full rounded-[15px] px-5 py-4 outline outline-[1.5px] outline-line placeholder:text-ink-muted focus:outline-[4px] focus:outline-brand-tag max-md:h-[46px] max-md:rounded-[10px] max-md:px-4";

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[400px] flex-col px-8 pt-24 max-md:pt-12">
        <form
          className="flex flex-col gap-10"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/gov-grant/recommend");
          }}
        >
          <div className="flex flex-col gap-10 max-md:gap-5">
            <h1 className="text-[32px] font-bold text-ink">Log in</h1>
            <div className="flex flex-col gap-5 max-md:gap-3">
              <input
                id="email"
                name="email"
                autoComplete="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(inputCls, "pr-[43px]")}
                />
                <button
                  type="button"
                  aria-label={show ? "비밀번호 숨기기" : "비밀번호 표시"}
                  onClick={() => setShow((v) => !v)}
                  className="absolute top-1/2 right-5 -translate-y-1/2 text-ink-muted"
                >
                  {show ? <Eye className="size-[18px]" /> : <EyeOff className="size-[18px]" />}
                </button>
              </div>
              <a
                href="#"
                className="ml-auto w-max text-sm text-ink-light hover:text-ink-muted"
              >
                비밀번호를 잊으셨나요?
              </a>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <button
              type="submit"
              disabled={disabled}
              className="flex w-full items-center justify-center gap-2 rounded-[5px] bg-brand px-[26px] py-3.5 font-bold text-white transition-colors hover:bg-brand-3 disabled:bg-line disabled:text-gray-soft"
            >
              로그인
            </button>
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-2 rounded-[5px] px-[26px] py-3.5 font-bold text-ink-muted hover:text-ink"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
