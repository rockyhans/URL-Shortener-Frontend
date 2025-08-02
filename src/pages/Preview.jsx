const mockPosts = [
  {
    id: 1,
    user: "Alice Dev",
    content: "Excited to share my first React project!",
    image: "https://source.unsplash.com/600x300/?code",
  },
  {
    id: 2,
    user: "Bob Coder",
    content: "Just finished a Java DSA Bootcamp 💻🔥",
    image: "https://source.unsplash.com/600x300/?developer",
  },
];

const Preview = () => {
  return (
    <div className="p-4 w-full lg:w-2/4 mx-auto font-semibold ">
     <h2 className="text-center mt-5 text-3xl font-bold ">🌐Community Preview</h2>

      <section className="mb-10 mt-5">
        <div className="flex md:grid-cols-2 gap-6 flex-col ">
          {mockPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg">{post.user}</h3>
              <p className="text-gray-600 mt-2">{post.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">👤 Profile</h2>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto text-center">
         
          <h3 className="text-xl font-bold">Jane Doe</h3>
          <p className="text-gray-600">Frontend Developer | React | Tailwind</p>
        </div>
      </section>

      
    </div>
  );
};

export default Preview;
