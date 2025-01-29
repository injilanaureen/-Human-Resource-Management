import { 
  FaUserCircle, 
  FaEnvelope, 
  FaPhone, 
  FaBuilding, 
  FaBriefcase,
  FaCreditCard,
  FaCalendarAlt,
  FaShieldAlt,
  FaArrowLeft 
  
} from 'react-icons/fa';
import { ArrowLeft }   from 'lucide-react';
// Mock data - replace with your actual data
const employeeData = {
  emp_id: 101,
  emp_full_name: "John Doe",
  emp_personal_email: "john.doe@example.com",
  emp_phone_no: "9876543210",
  emp_addhar_no: "123456789012",
  emp_pan_card_no: "ABCDE1234F",
  emp_department: "Engineering",
  emp_designation: "Senior Developer",
  emp_joining_date: "2023-01-15",
  emp_status: "Active",
  role_id: 3,
  role_permission: "admin",
  total_leave: 15
};

function Employee() {
  const handleBack = () => {
    // Add your navigation logic here
    window.history.back();
  };

  return (
    <div className="max-h-screen">

        <div className="flex items-center gap-1">
          <ArrowLeft />
          <p>Employee</p>
        </div>
  

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
       
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Employee Information</h1>
        
        <div className="grid gap-6">
          {/* Personal Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaUserCircle className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Employee ID</p>
                <p className="font-medium">{employeeData.emp_id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{employeeData.emp_full_name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{employeeData.emp_personal_email}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Phone</p>
                <div className="flex items-center gap-2">
                  <FaPhone className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{employeeData.emp_phone_no}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaBriefcase className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Professional Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Department</p>
                <div className="flex items-center gap-2">
                  <FaBuilding className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{employeeData.emp_department}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Designation</p>
                <p className="font-medium">{employeeData.emp_designation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Joining Date</p>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{employeeData.emp_joining_date}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <span className="bg-green-100 text-green-800 py-1 px-2 rounded-md">{employeeData.emp_status}</span>
              </div>
            </div>
          </div>

          {/* Documents & Role */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaShieldAlt className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Documents & Role Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Aadhar Number</p>
                <div className="flex items-center gap-2">
                  <FaCreditCard className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{employeeData.emp_addhar_no}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">PAN Card Number</p>
                <div className="flex items-center gap-2">
                  <FaCreditCard className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{employeeData.emp_pan_card_no}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Role Permission</p>
                <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-md">{employeeData.role_permission}</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Leave Balance</p>
                <p className="font-medium">{employeeData.total_leave} days</p>
              </div>
            </div>
          </div>
        </div>
       </div>

        
      </div>
    </div>
  );
}

export default Employee;