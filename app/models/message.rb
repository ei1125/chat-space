class Message < ApplicationRecord
  belong_to :group
  belong_to :user

  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader
end