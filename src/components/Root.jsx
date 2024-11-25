import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <div className="mx-auto p-4 bg-gray-100 h-screen">
      <Outlet />
    </div>
  );
};
