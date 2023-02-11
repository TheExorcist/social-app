module JsonSerializable
  module ClassMethods

    attr_accessor :attributes_for_serialization
    attr_accessor :methods_for_serialization

    def serializable_attributes(attributes)
      self.attributes_for_serialization = attributes
      self.methods_for_serialization = []
    end

    def serializable_methods(method_names)
      self.methods_for_serialization = method_names
    end
  end

  module InstanceMethods
    def serialize_to_hash
      self.as_json(only: self.class.attributes_for_serialization)
        .merge(
          self.class.methods_for_serialization.reduce({}) do |h, method|
            h[method] = self.send(method)
            h
          end
        )
    end
  end
end
