class CreateRbkos < ActiveRecord::Migration
  def self.up
    create_table :rbkos do |t|
      t.string :geneID
      t.string :name
      t.integer :wtGrowth
      t.integer :rbKOGrowth
      t.integer :wtEarlyCulm
      t.integer :rbKOEarlyCulm
      t.integer :totWT
      t.integer :totrbKO
      t.references :gene

      t.timestamps
    end
  end

  def self.down
    drop_table :rbkos
  end
end
