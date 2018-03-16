class CurrentAttendance < ApplicationRecord
  belongs_to :Student
  has_one :Schedule
end
