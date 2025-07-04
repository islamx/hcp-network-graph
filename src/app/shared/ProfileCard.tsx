import React from "react";

const ProfileCard = ({ doctor }: { doctor: any }) => {
  if (!doctor) {
    return (
      <div className="text-gray-400 w-full text-center py-8">
        Select or hover any doctor to view details
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full flex flex-col gap-0 overflow-hidden p-6">
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
      <div className="mb-4">
        <div className="font-bold text-gray-700 mb-1">Education</div>
        {doctor.education && doctor.education.map((edu: string, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span>
            <span className="text-xs text-gray-600">{edu}</span>
          </div>
        ))}
      </div>
      {/* Separator */}
      <div className="border-t border-gray-100 my-4" />
      {/* Experience */}
      <div>
        <div className="font-bold text-gray-700 mb-1">Experience</div>
        {doctor.experience && doctor.experience.map((exp: string, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
            <span className="text-xs text-gray-600">{exp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard; 