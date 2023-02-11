class Api::V1::RegistrationsController < ::Devise::RegistrationsController
  include RenderHelper

  def create
    build_resource(user_registration_params)
    resource.save
    render_resource(resource)
  end

  private

  def user_registration_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :invitation_code)
  end
end
