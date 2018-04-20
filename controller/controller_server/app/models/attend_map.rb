class AttendMap < ApplicationRecord
  self.table_name = "attend_map"

  belongs_to :past_schedule
  belongs_to :teacher
end
