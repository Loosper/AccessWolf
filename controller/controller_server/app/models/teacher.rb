class Teacher < ApplicationRecord
  has_many :attend_map
  has_many :past_schedules, through: :attend_map

  has_many :schedule_maps
  has_many :schedules, through: :schedule_maps
end
