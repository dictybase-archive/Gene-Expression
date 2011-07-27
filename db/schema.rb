# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110727151357) do

  create_table "cellcycles", :force => true do |t|
    t.string   "geneID"
    t.string   "name"
    t.integer  "asynchHits"
    t.integer  "T0"
    t.integer  "T01"
    t.integer  "T1"
    t.integer  "T11"
    t.integer  "T12"
    t.integer  "T2"
    t.integer  "T3"
    t.integer  "T31"
    t.integer  "T4"
    t.integer  "T5"
    t.integer  "T61"
    t.integer  "T65"
    t.integer  "T71"
    t.integer  "T8"
    t.integer  "T9"
    t.integer  "T10"
    t.integer  "T111"
    t.integer  "T121"
    t.integer  "totHits"
    t.integer  "gene_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "devels", :force => true do |t|
    t.string   "geneID"
    t.string   "name"
    t.integer  "hits11"
    t.integer  "hits12"
    t.integer  "hits41"
    t.integer  "hits42"
    t.integer  "hits81"
    t.integer  "hits82"
    t.integer  "hits121"
    t.integer  "hits122"
    t.integer  "hits161"
    t.integer  "hits162"
    t.integer  "hits201"
    t.integer  "hits202"
    t.integer  "hits241"
    t.integer  "hits242"
    t.integer  "totHits"
    t.integer  "gene_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "genes", :force => true do |t|
    t.string   "geneID"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rbkos", :force => true do |t|
    t.string   "geneID"
    t.string   "name"
    t.integer  "wtGrowth"
    t.integer  "rbKOGrowth"
    t.integer  "wtEarlyCulm"
    t.integer  "rbKOEarlyCulm"
    t.integer  "totWT"
    t.integer  "totrbKO"
    t.integer  "gene_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
