class Attendance < ApplicationRecord
  has_one :student
  has_one :schedule
  has_one :past_schedule
end
