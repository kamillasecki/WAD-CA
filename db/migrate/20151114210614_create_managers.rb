class CreateManagers < ActiveRecord::Migration
  def change
    drop_table :managers
    create_table :managers do |t|
      t.string :name, null: false
      t.text :address, null: false

      t.timestamps null: false
    end
  end
end
