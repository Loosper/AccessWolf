class Attendance < ApplicationRecord
  has_one :Student
  has_one :Schedule
end
