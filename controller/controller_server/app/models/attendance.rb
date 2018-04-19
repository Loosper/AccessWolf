class Attendance < ApplicationRecord
  belongs_to :student
  has_one :schedule
  has_one :past_schedule
end
