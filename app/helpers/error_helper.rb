module ErrorHelper
  def render_exception(exception, status = :bad_request)
    if Rails.env.development?
      Rails.logger.info exception.backtrace.join('\n')
    end

    render json: {
      error: exception.message
    }, status: status
  end
end
