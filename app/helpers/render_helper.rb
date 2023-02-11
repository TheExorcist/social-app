module RenderHelper

  def render_resource(resource)
    return resource_not_found unless resource

    if resource.errors.empty?
      render json: json_response(resource), status: :ok
    else
      render_unprocessable_entity(resource)
    end
  end

  def render_collection(collection, collection_type = :invite)
    render json: {
      collection_type.to_s.pluralize => collection.map(&:serialize_to_hash)
    }
  end

  def json_response(resource)
    return resource.class.to_s.downcase => resource.serialize_to_hash
  end

  def invalid_credentials
    render json: {
      message: :invalid_password_or_email
    }, status: 401
  end

  def render_unprocessable_entity(resource)
    render json: { error: 
      resource.error_messages
    }, status: :unprocessable_entity
  end

  def resource_not_found
    render json: {
      error: :resource_not_found
    }, status: :not_found
  end

  def render_destroy_success
    render json: {
      message: :resource_destroyed
    }, status: :ok
  end
end
