class Attendance < ApplicationRecord
  has_one :student
  has_one :schedule
end
