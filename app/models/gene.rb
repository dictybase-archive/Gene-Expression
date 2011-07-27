class Gene < ActiveRecord::Base
  has_many :rbkos
  has_many :devels
  has_many :cellcycles
end
