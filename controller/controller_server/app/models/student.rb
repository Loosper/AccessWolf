class Student < ApplicationRecord
  has_many :attendances
  has_one :current_attendance
end
