class CreateCellcycles < ActiveRecord::Migration
  def self.up
    create_table :cellcycles do |t|
      t.string :geneID
      t.string :name
      t.integer :asychHits
      t.integer :T0
      t.integer :T01
      t.integer :T1
      t.integer :T11
      t.integer :T12
      t.integer :T2
      t.integer :T3
      t.integer :T31
      t.integer :T4
      t.integer :T5
      t.integer :T61
      t.integer :T65
      t.integer :T71
      t.integer :T8
      t.integer :T9
      t.integer :T10
      t.integer :T11
      t.integer :T12
      t.integer :totHits
      t.references :gene

      t.timestamps
    end
  end

  def self.down
    drop_table :cellcycles
  end
end
