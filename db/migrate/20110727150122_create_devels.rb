class CreateDevels < ActiveRecord::Migration
  def self.up
    create_table :devels do |t|
      t.string :geneID
      t.string :name
      t.integer :hits11
      t.integer :hits12
      t.integer :hits41
      t.integer :hits42
      t.integer :hits81
      t.integer :hits82
      t.integer :hits121
      t.integer :hits122
      t.integer :hits161
      t.integer :hits162
      t.integer :hits201
      t.integer :hits202
      t.integer :hits241
      t.integer :hits242
      t.integer :totHits
      t.references :gene

      t.timestamps
    end
  end

  def self.down
    drop_table :devels
  end
end
