class Schedule < ApplicationRecord
  has_many :Teachers
  has_many :CurrentAttendance
  has_many :Attendaces
  has_one :StudentClass
end
