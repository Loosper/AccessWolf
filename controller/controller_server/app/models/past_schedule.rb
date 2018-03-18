class PastSchedule < ApplicationRecord
  has_many :attendances
  has_many :teachers
  has_one :schedule
end
