require './lib/json_seriablizable'

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  include ::JsonSerializable::InstanceMethods
  extend ::JsonSerializable::ClassMethods

  def error_messages
    self.errors.full_messages.join(', ')
  end
end
