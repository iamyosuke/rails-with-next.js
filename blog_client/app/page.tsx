import Image from "next/image";
async function getData() {
  const res = await fetch("http://localhost:3001/api/v1/posts", {
    next: { revalidate: 60 * 60 * 24 }, // ISR用の再検証時間
    // cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // console.log(res.json());
  const data = await res.json();

  console.log("取得したデータ:", data);
  return data;
}
export default async function Home() {
  const posts = await getData();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}