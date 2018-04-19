class AttendMap < ApplicationRecord
  self.table_name = "attend_map"
  
  belongs_to :scedule
  belongs_to :teacher
end
