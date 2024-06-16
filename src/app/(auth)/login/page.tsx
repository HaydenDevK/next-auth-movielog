import Button from "@/components/Button";
import Input from "@/components/Input";
import TermLabel from "@/components/TermLabel";
import Title from "@/components/Title";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="w-full py-10 px-6">
      <Title className="mb-4" h1Text="Login" />
      <form action="">
        <fieldset className="flex flex-col gap-4 mb-4">
          <Input type="text" required placeholder={"someone@example.com"} />
          <Input type="password" required placeholder={"Enter Password"} />
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
              Login
            </Button>
            <Link
              className="h-11 flex items-center justify-center rounded-lg hover:bg-primary hover:text-white"
              href="signup"
            >
              Go To Sign Up
            </Link>
          </section>
        </fieldset>
      </form>
    </main>
  );
}
