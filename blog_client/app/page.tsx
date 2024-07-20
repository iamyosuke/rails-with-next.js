import Image from "next/image";
import { Post } from "./types";

type Posts = Post[];

async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3001/api/v1/posts", {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts: Post[] = await res.json();
  console.log("取得したデータ:", posts);
  return posts;
}
export default async function Home() {
  const posts = await getPosts();
  // const posts = await getData();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
