import Link from "next/link";

const RightSidebar = () => {
  return (
    <div className="hidden lg:block fixed inset-y-0 top-16 right-0 w-64 bg-white p-4">
      <h2 className="text-lg font-bold">Notifications</h2>
      <ul className="menu space-y-4">
        <li>
          <Link href="#" className="font-bold text-gray-500">
            Alert 1
          </Link>
        </li>
        <li>
          <Link href="#" className="font-bold text-gray-500">
            Alert 2
          </Link>
        </li>
        <li>
          <Link href="#" className="font-bold text-gray-500">
            Alert 3
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default RightSidebar;
