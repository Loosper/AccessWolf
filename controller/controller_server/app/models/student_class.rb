class StudentClass < ApplicationRecord
  self.table_name = "student_classes"
  
  has_many :students
  has_many :schedules
end
