import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";

const Sidebar = () => {
  return (
    <div className="w-[40%] h-full select-none">
      {/* sidebar header */}
      <SidebarHeader />
      {/* notifications */}
      <Notifications />
    </div>
  );
};

export default Sidebar;
