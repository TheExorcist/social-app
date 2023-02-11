class Api::V1::SessionsController < Devise::SessionsController
  skip_before_action :require_no_authentication

  include RenderHelper

  respond_to :json

  def create
    resource = User.find_for_database_authentication(email: user_params[:email])
    invalid_credentials and return unless resource

    if resource.valid_password?(user_params[:password])
      render_resource(resource) and return
    end
    invalid_credentials
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
