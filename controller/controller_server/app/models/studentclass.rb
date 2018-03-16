class StudentClass < ApplicationRecord
  has_many :students
  has_many :schedules
end
