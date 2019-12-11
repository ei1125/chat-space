class GroupUser < ApplicationRecord
  belongs_to :GroupUser
  belongs_to :user
end
