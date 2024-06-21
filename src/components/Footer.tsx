import Link from "next/link";
import Button from "./Button";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between w-full fixed bottom-0 bg-primary text-white">
      <Link className="p-5 font-[700] hover:animate-pulse-fast" href="/">
        HOME
      </Link>
      <Link className="p-5 font-[700]" href="/my-list">
        LIST
      </Link>
      {
        <div>
          <Link className="p-5 font-[700]" href="/login">
            LOGIN
          </Link>
          /<Button className="p-5 font-[700]">LOGOUT</Button>
        </div>
      }
      <Link className="p-5 font-[700]" href="/signup">
        (SIGN UP)
      </Link>
    </footer>
  );
}
