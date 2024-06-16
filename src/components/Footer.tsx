import Link from "next/link";
import Button from "./Button";

export default function Footer() {
  return (
    <footer className="flex gap-4 items-center justify-between w-full py-1 fixed bottom-0 bg-dark-1e text-white">
      <Link className="p-4 font-[500]" href="/">
        Home
      </Link>
      <Link className="p-4 font-[500]" href="/movie-list">
        List
      </Link>
      {
        <div>
          <Link className="p-4 font-[500]" href="/login">
            Login
          </Link>
          /<Button className="p-4 font-[500]">Logout</Button>
        </div>
      }
      <Link className="p-4 font-[500]" href="/signup">
        (Sign Up)
      </Link>
    </footer>
  );
}
