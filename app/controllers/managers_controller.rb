class ManagersController < ApplicationController
    def create
        Manager.create(manager_params)
        
        redirect_to root_path
    end
    
    private
    
    def manager_params
        params.require(:manager).permit(:name, :address)
    end
end
