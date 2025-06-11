import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link href="/">Home</Link> |{" "}
      {session ? (
        <>
          <Link href="/create">Create Blog</Link> |{" "}
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
