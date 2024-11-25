import React from "react";
import PropTypes from "prop-types"; // PropTypes for validation

const StaffList = ({ staff }) => {
  if (!staff || staff.length === 0) {
    return <p>No staff available.</p>;
  }

  return (
    <div>
      <h2>Staff List</h2>
      <ul>
        {staff.map((staffMember) => (
          <li key={staffMember.id}> {/* Use a unique identifier as the key */}
            {staffMember.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Prop validation (Optional)
StaffList.propTypes = {
  staff: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,  // assuming each staff member has a unique id
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StaffList;
