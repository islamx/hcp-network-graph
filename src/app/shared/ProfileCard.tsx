import React from "react";

function getInitials(name: string) {
  if (!name) return "?";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0];
  return parts[0][0] + parts[parts.length - 1][0];
}

const ProfileCard = ({ doctor }: { doctor: any }) => {
  if (!doctor) {
    return (
      <div className="text-gray-400 w-full text-center py-8">
        Select or hover any doctor to view details
      </div>
    );
  }

  // Use pravatar.cc for unique avatar per doctor id
  const avatarUrl = doctor.id
    ? `https://i.pravatar.cc/150?u=doctor-${doctor.id}`
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full flex flex-col gap-0 overflow-hidden p-6">
      {/* Name, specialty, avatar */}
      <div className="flex flex-col items-center gap-2 mb-6">
        {avatarUrl ? (
          <img src={avatarUrl} alt={doctor.name} className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow" />
        ) : (
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-200 text-blue-700 text-3xl font-bold border-4 border-blue-100 shadow">
            {getInitials(doctor.name)}
          </div>
        )}
        <div className="text-xl font-bold text-gray-800 mt-2">{doctor.name}</div>
        <div className="text-sm text-gray-500">{doctor.specialty}</div>
      </div>
      {/* Separator */}
      <div className="border-t border-gray-100 my-4" />
      {/* About */}
      <div className="mb-4">
        <div className="font-bold text-gray-700 mb-1">About</div>
        <div className="text-xs text-gray-500">
          Experienced and compassionate doctor specializing in {doctor.specialty}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>
      {/* Separator */}
      <div className="border-t border-gray-100 my-4" />
      {/* Stats */}
      <div className="flex justify-between bg-gray-50 rounded-lg p-4 text-center mb-4">
        <div>
          <div className="text-lg font-bold text-gray-800">1000</div>
          <div className="text-xs text-gray-500">Patients Served</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-800">95%</div>
          <div className="text-xs text-gray-500">Success Rate</div>
        </div>
      </div>
      {/* Separator */}
      <div className="border-t border-gray-100 my-4" />
      {/* Education */}
      <div>
        <div className="font-bold text-gray-700 mb-1">Education</div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span>
          <span className="text-xs text-gray-600">Harvard Medical University</span>
        </div>
        <div className="text-xs text-gray-400 ml-5">Cardiology Degree</div>
      </div>
    </div>
  );
};

export default ProfileCard; 