class Api::V1::InvitesController < ::ApplicationController
  before_action :authenticate_user!, except: %i[show]

  include RenderHelper


  def index
    resources = Invite.search({
      user: current_user
    }) 
    render_collection(resources)
  end

  def show
    invite = Invite.search(
      invite_resource_params
    )

    render_resource(invite)
  end

  def create
    resource = Invite.build_resource(invite_params)
    resource.user = current_user
    resource.save
    render_resource(resource)
  end

  def destroy
    invitation_code = invite_resource_params[:id]
    invite = Invite.search(user: current_user)
      .find_by(invitation_code: invitation_code)
    
    return resource_not_found unless invite

    if invite.destroy
      render_destroy_success
    else
      render_unprocessable_entity(invite)
    end
  end

  private

  def invite_resource_params
    params.permit(:invitation_code, :id)
  end

  def invite_params
    params.require(:invite).permit(:email)
  end
end
