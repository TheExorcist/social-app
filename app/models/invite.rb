class Invite < ApplicationRecord

  belongs_to :user

  before_create :setup_resource
  validates :email, uniqueness: true, presence: true

  serializable_attributes %i[email accepted deleted invitation_code invite_at]
  serializable_methods %i[invitation_link]

  scope :by_user, -> (user) { where(user: user).order(created_at: :desc) }

  validate :validate_email

  after_commit :send_invitation_mail, on: :create

  class << self
    def build_resource(invite_params)
      self.new(email: invite_params[:email])
    end

    def search(params)

      return self.by_user(params[:user]) if params[:user]

      return self.find_by(invitation_code: params[:invitation_code]) if params[:invitation_code]
      self.find(params[:id]) if params[:id]
    end

    def accept(invitation_code, invitee_email)
      Invite.where(
        invitation_code: invitation_code,
        email: invitee_email
      ).update_all(accepted: true)
    end
  end

  def invitation_link
    if Rails.env.development? 
      "#{local_app_fqdn}/#{invitation_spa_path}"
    else
      "http://#{ENV[HOST_NAME]}/#{invitation_spa_path}"
    end
  end

  private

  def local_app_fqdn
    'http://localhost:3000'
  end

  def invitation_spa_path
    "invitation/accept?invitation_code=#{invitation_code}"
  end

  def setup_resource
    self.invitation_code = SecureRandom.uuid
    self.invite_at = Time.now
  end

  def send_invitation_mail
    InviteMailer.send_email(self).deliver_now
  end

  def validate_email
    return if email.blank?

    errors.add(:email, 'is invalid') unless email.match?(/\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i)

    if User.exists?(email: email)
      errors.add(:email, 'Can not invite the existsing user')
    end

    errors.blank?
  end

end
