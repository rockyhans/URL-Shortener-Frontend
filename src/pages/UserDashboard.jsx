import UserFeed from "../pages/UserFeed";

const UserDashboard = () => (
  <div className="p-4 max-w-md mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">Welcome to College Memes!</h2>
    <p>Your account is approved. This is your main page.</p>
    <UserFeed />
  </div>
);

export default UserDashboard;
