class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


  serializable_attributes %i[first_name last_name]
  serializable_methods %i[auth_token]

  has_many :authorization_tokens

  has_one :authorization_token, -> { valid.order(created_at: :desc) }
 
  attribute :invitation_code, :string

  before_create :accept_invitation, if: :invitation_code?

  def auth_token
    self.authorization_token&.token || create_authorization_token&.token
  end

  def accept_invitation
    Invite.accept(self.invitation_code, self.email)
  end
end
