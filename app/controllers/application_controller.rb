class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  include ErrorHelper
  
  ## Will substitue with the specific error
  rescue_from Exception, with: -> (ex) { render_exception(ex) }

end
