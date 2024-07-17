import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

type Post = {
  id: string;
  title: string;
  body: string;
  userId: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "ずんだブログ" },
    { name: "description", content: "ずんだもんのブログなのだ" },
  ];
};

export const loader = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const data: Post[] = await response.json();
  return json({ posts: data });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="font-bold text-3xl">投稿一覧</h1>
      <div>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`} className="text-blue-600">
              {post.title}
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}
