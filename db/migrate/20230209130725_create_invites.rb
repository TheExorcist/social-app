class CreateInvites < ActiveRecord::Migration[7.0]

  EMAIL_CONSTRAINT = "email like '%_@__%.__%'".freeze
  INVITE_AT_CONSTRAINT = "invite_at > '1970-01-01'".freeze

  ## Fallback PSQL extension method
  UUID_PSQL_METHOD = 'uuid_generate_v1()'

  def change
    create_table :invites do |t|
      t.references :user, null: false
      t.string :invitation_code, null: false, default: UUID_PSQL_METHOD
      t.datetime :invite_at, null: false
      t.boolean :accepted, null: false, default: false
      t.boolean :deleted, null: false, default: false
      t.integer :expires_in, null: false, default: 3600
      t.string :email, null: false, limit: 1000

      add_column_constraints(t)

      t.timestamps
    end

    add_column_indexes
  end

  def add_column_constraints(table)
    table.check_constraint EMAIL_CONSTRAINT, name: :email
    table.check_constraint INVITE_AT_CONSTRAINT, name: :invite_at
  end

  def add_column_indexes
    add_index :invites, %i[invitation_code], unique: true
    add_index :invites, %i[email], unique: true
  end
end
