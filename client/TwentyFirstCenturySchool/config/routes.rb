Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  get 'schools/index'

  get 'forums/index'

  get 'articles/index'

  get 'home/index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  post "/register" => "sessions#create"
  post "/login" => "sessions#login"
  post "/auth/:provider/callback" => "sessions#callback"
  delete "/signout" => "sessions#destroy", :as => :signout

  get "/about_us" => "home#about_us"
  get "/portal" => "home#portal"
  get "/contact" => "home#contact_us"
  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products
    namespace  :forum do
      resources :questions do
        resources :answers do
          member do
            post "reply"
          end
          collection do
          end
        end 
      end

    end
    resources :articles do
      member do
      end
  
      collection do
      end
    end

    resources :forums,:only=>['index','create'] do
      
    end

    resources :schools do
      member do
      end
  
      collection do
      end
    end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
