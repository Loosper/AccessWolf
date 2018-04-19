class PastSchedule < ApplicationRecord
  has_many :teachers
  has_many :attendances
  has_one :schedule
end
