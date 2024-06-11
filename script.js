// Function to toggle attendance status
function toggleAttendance(status) {
  const subject = document.getElementById('subjectSelect').value;
  let attendanceData = JSON.parse(localStorage.getItem(`${subject}_attendanceData`)) || { "present": 0, "absent": 0 };

  if (status === 'Present') {
    attendanceData.present += 1;
  } else if (status === 'Absent') {
    attendanceData.absent += 1;
  }

  localStorage.setItem(`${subject}_attendanceData`, JSON.stringify(attendanceData));

  // Update UI
  updateAttendanceSummary(attendanceData);
}

// Function to update attendance summary when subject is selected
function changeSubject() {
  const subject = document.getElementById('subjectSelect').value;
  let attendanceData = JSON.parse(localStorage.getItem(`${subject}_attendanceData`)) || { "present": 0, "absent": 0 };

  updateAttendanceSummary(attendanceData);
}

// Function to update attendance summary
function updateAttendanceSummary(attendanceData) {
  const totalPresent = attendanceData.present;
  const totalAbsent = attendanceData.absent;
  const totalDays = totalPresent + totalAbsent;
  const presentPercentage = totalDays > 0 ? ((totalPresent / totalDays) * 100).toFixed(2) : 0;
  const extrasAvailable = calculateExtrasAvailable(totalPresent, totalAbsent);

  document.getElementById('lastAttendanceDate').textContent = new Date().toLocaleDateString();
  document.getElementById('totalPresent').textContent = totalPresent;
  document.getElementById('totalAbsent').textContent = totalAbsent;
  document.getElementById('presentPercentage').textContent = presentPercentage + "%";

  const extrasAvailableMessage = extrasAvailable >= 0 ? `${extrasAvailable} classes can be missed before present percentage falls below 75%.` : "Please attend!";
  document.getElementById('extrasAvailable').textContent = extrasAvailableMessage;
}

// Function to reset attendance entries
function resetAttendance() {
  const subject = document.getElementById('subjectSelect').value;
  const resetPresent = parseInt(document.getElementById('resetPresent').value) || 0;
  const resetAbsent = parseInt(document.getElementById('resetAbsent').value) || 0;
  const resetData = { "present": resetPresent, "absent": resetAbsent };
  localStorage.setItem(`${subject}_attendanceData`, JSON.stringify(resetData));

  // Update UI
  updateAttendanceSummary(resetData);
}

// Function to calculate number of classes a student can be absent in before present percentage falls below 75%
function calculateExtrasAvailable(totalPresent, totalAbsent) {
  const presentPercentage = totalPresent / (totalPresent + totalAbsent) * 100;
  const requiredPresentPercentage = 75;
  const classesRequired = Math.ceil(totalPresent / (requiredPresentPercentage / 100) - totalPresent);
  return classesRequired - totalAbsent;
}
