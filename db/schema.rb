# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_09_141525) do
  create_table "authorization_tokens", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "token", null: false
    t.datetime "expires_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_authorization_tokens_on_token", unique: true
    t.index ["user_id"], name: "index_authorization_tokens_on_user_id"
    t.check_constraint "expires_at > created_at", name: "check_expires_at"
  end

  create_table "invites", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "invitation_code", default: "uuid_generate_v1()", null: false
    t.datetime "invite_at", null: false
    t.boolean "accepted", default: false, null: false
    t.boolean "deleted", default: false, null: false
    t.integer "expires_in", default: 3600, null: false
    t.string "email", limit: 1000, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_invites_on_email", unique: true
    t.index ["invitation_code"], name: "index_invites_on_invitation_code", unique: true
    t.index ["user_id"], name: "index_invites_on_user_id"
    t.check_constraint "email like '%_@__%.__%'", name: "email"
    t.check_constraint "invite_at > '1970-01-01'", name: "invite_at"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
