class PastSchedule < ApplicationRecord
  has_many :attend_maps
  has_many :teachers, through: :attend_map

  has_many :attendances

  has_one :schedule
end
