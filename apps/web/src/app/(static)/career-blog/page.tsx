// pages/career-blog.js
export default function CareerBlog() {
  return (
    <div className="bg-neutral-950 min-h-screen text-white mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Career Blog</h1>
      <p>
        Welcome to our career blog! Find insightful articles and tips to boost
        your career.
      </p>
      <div className="mt-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Top 5 Skills for Modern Developers
          </h2>
          <p className="text-gray-400">
            Learn about the essential skills needed in today's tech industry.
          </p>
          <a href="#" className="text-primary hover:underline">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}
