import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts").then(res => res.json()).then(setPosts);
  }, []);

  return (
    <div>
      <h1>All Blogs</h1>
      <Link href="/create"><button>Create New Blog</button></Link>
      {posts.map(post => (
        <div key={post.id}>
          <h3>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
}
