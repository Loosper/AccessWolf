class ScheduleMap < ApplicationRecord
  self.table_name = "schedule_map"
  
  belongs_to :schedule
  belongs_to :teachers
end
