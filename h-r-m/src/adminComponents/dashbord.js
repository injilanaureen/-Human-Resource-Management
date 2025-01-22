import React from "react";
import { BiTask } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";
import { TbUsersGroup } from "react-icons/tb";
import { PiCalendar } from "react-icons/pi";
import { GrDocumentPerformance } from "react-icons/gr";
import { RiCustomerService2Line } from "react-icons/ri";
import { IoHappyOutline } from "react-icons/io5";
import { SiLogitech } from "react-icons/si";
import { TbBrandYatse } from "react-icons/tb";
import { RiP2pLine } from "react-icons/ri";
import { FaPeoplePulling } from "react-icons/fa6";
import { SiChromewebstore } from "react-icons/si";
import { MdOutlinePolicy } from "react-icons/md";
import { FaDropbox } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashboardGrid = () => {
  const icons = [
    { label: "Task Box", Icon: BiTask, path: "taskbox" },
    { label: "Employee", Icon: FaUsers, path: "employee" },
    { label: "Attendance", Icon: IoCalendarNumberOutline, path: "attendance" },
    { label: "Leave", Icon: BiTask, path: "leve" },
    { label: "HR Policies", Icon: GrDocumentText, path: "hrPolicies" },
    { label: "HR Documents", Icon: BiTask, path: "hrDocuments" },
    { label: "Recruitment", Icon: TbUsersGroup, path: "recruitment" },
    { label: "Calendar", Icon: PiCalendar, path: "calendar" },
    { label: "Performance", Icon: GrDocumentPerformance, path: "performance" },
    { label: "Helpdesk", Icon: RiCustomerService2Line, path: "helpdesk" },
    { label: "Happay", Icon: IoHappyOutline, path: "happy" },
    { label: "Logit", Icon: SiLogitech, path: "logit" },
    { label: "Yatya", Icon: TbBrandYatse, path: "yatya" },
    { label: "P2P", Icon: RiP2pLine, path: "p2p" },
    { label: "Evolve", Icon: FaPeoplePulling, path: "evolve" },
    { label: "EPFO Website", Icon: SiChromewebstore, path: "epfoWebite" },
    { label: "Policies", Icon: MdOutlinePolicy, path: "policies" },
    { label: "Blue Box", Icon: FaDropbox, path: "bluebox" },
   
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {icons.map((item, index) => (
          <Link 
            to={item.path} 
            key={index}
            className="text-center bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-4 md:p-6"
          >
            <item.Icon 
              className="text-blue-500 mb-2 mx-auto"
              size={40} // Set the size directly using react-icons' `size` prop
            />
            <p className="font-medium text-gray-700">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardGrid;
