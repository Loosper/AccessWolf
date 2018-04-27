class Schedule < ApplicationRecord
  has_many :schedule_maps
  has_many :teachers, through: :schedule_map

  has_many :current_attendances
  has_many :attendances
  has_many :past_schedules

  belongs_to :student_class
  has_many :students, through: :student_class
end
