class CurrentAttendance < ApplicationRecord
  belongs_to :student
  has_one :schedule
end
