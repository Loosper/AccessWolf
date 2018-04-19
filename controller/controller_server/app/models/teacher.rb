class Teacher < ApplicationRecord
  has_many :scedules, through: :attend_map
end
