class CreateAuthorizationTokens < ActiveRecord::Migration[7.0]

  def change
    create_table :authorization_tokens do |t|
      t.references :user, null: false
      t.string :token, null: false
      t.datetime :expires_at, null: false

      t.check_constraint 'expires_at > created_at', name: :check_expires_at


      t.timestamps
    end
    add_indexes
  end

  def add_indexes
    add_index :authorization_tokens, :token, unique: true
  end
end
