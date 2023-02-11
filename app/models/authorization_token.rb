class AuthorizationToken < ApplicationRecord
  TOKEN_VALIDITY = 60.minute

  belongs_to :user

  scope :valid, -> { where('expires_at > ?', Time.now.in_time_zone('UTC')) }
  scope :by_token, -> (token) { where(token: token) }

  before_create :setup_token

  def is_valid?
    expires_at > Time.now.in_time_zone('UTC')
  end

  private

  def setup_token
    self.token = SecureRandom.uuid
    self.expires_at = Time.now + TOKEN_VALIDITY
  end
end
