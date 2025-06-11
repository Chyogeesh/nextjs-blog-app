import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <Link href="/">Home</Link> |{" "}
      {session ? (
        <>
          <span>{session.user.email}</span> |{" "}
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/signup">Signup</Link> | <Link href="/login">Login</Link>
        </>
      )}
    </nav>
  );
}
