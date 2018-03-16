class StudentClass < ApplicationRecord
  has_many :Students
  has_many :Schedule
end
