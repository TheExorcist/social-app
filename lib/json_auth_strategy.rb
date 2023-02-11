class JsonAuthStrategy < Warden::Strategies::Base
  def valid?
    auth_token.present?
  end

  def authenticate!
    user = auth_token&.user
    pp user
    if user
      success!(user)
    else
      fail!('Invalid Auth token')
    end
  end

  private

  def auth_token
    bearer_token = env['HTTP_AUTHORIZATION'].to_s.gsub('Bearer ', '')
    return unless bearer_token

    AuthorizationToken.valid.by_token(bearer_token)&.limit(1)&.first
  end
end
