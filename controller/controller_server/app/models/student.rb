class Student < ApplicationRecord
  has_many :Attendaces
  has_one :CurrentAttendance
end
