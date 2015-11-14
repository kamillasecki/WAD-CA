class HomeController < ApplicationController
  def index
    @managers = Manager.order(name: :asc).all
  end
  
  def temp
    redirect_to root_path
  end
end
