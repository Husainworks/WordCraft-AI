import React from "react";

export const DashboardSummaryCard = ({
  icon,
  label,
  value,
  bgColor,
  color,
}) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div
          className={`w-10 md:w-8 h-10 md:h-8 flex items-center justify-center ${color} ${bgColor} rounded-sm`}
        >
          {icon}
        </div>

        <p className="text-sm md:text-base text-gray-500 font-medium">
          <span className="text-sm md:text-base text-black font-semibold">
            {value}
          </span>{" "}
          {label}
        </p>
      </div>
    </>
  );
};
