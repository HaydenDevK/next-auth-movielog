import Button from "@/components/Button";
import Input from "@/components/Input";
import TermLabel from "@/components/TermLabel";
import Title from "@/components/Title";
import { signupAction } from "@/libs/actions";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="w-full py-10 px-6">
      <Title className="mb-4" h1Text="Sign Up" />
      <form action={signupAction}>
        <fieldset className="flex flex-col gap-4 mb-4">
          <Input
            name="name"
            type="text"
            required
            placeholder={"Enter Your Name"}
          />
          <Input
            name="email"
            type="email"
            required
            placeholder={"someone@example.com"}
          />
          <Input
            name="password"
            type="password"
            required
            placeholder={"Enter Password"}
          />
          <TermLabel id={""}>
            <span>
              I agree with <strong>terms</strong> and
              <strong> policies</strong>.
            </span>
          </TermLabel>
          <section className="flex flex-col gap-4">
            <Button
              className="h-11 border border-dark-4f rounded-lg hover:bg-blue-500 hover:text-white hover:border-0"
              type="submit"
              disabled={false}
            >
              Sign Up
            </Button>
            <Link
              className="h-11 flex items-center justify-center rounded-lg hover:bg-primary hover:text-white"
              href="/login"
            >
              Go To Login
            </Link>
          </section>
        </fieldset>
      </form>
    </main>
  );
}
