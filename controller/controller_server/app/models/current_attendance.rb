class CurrentAttendance < ApplicationRecord
  self.table_name = "current_attendances"
  belongs_to :student
  has_one :schedule
end
