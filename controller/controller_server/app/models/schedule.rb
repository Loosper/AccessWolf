class Schedule < ApplicationRecord
  has_many :teachers
  has_many :current_attendances
  has_many :attendances
  has_many :past_schedules
  has_one :student_class
end
