import Link from "next/link";

export default function Nav() {
  return (
    <div>
      <Link href="/">
        <h1 className="text-2xl font-bold text-center my-10">
          Stockholm Food Check
        </h1>
      </Link>
    </div>
  );
}
