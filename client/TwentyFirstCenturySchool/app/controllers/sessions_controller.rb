class SessionsController < ApplicationController

	def create
		url = URI.parse("#{API_URL}#{API_PREFIX}/register")
	    body = {
	    		'first_name'               => params[:first_name] ? params[:first_name] : "",     
	    		'last_name'                => params[:last_name] ? params[:last_name] : "",
	    		'gender'                   => params[:gender],
	    		'date_of_birth'            => params[:date_of_birth] ? params[:date_of_birth] : nil,
	    		'mobile_no'                => params[:mobile_no] ? params[:mobile_no] : nil,
	    		'state'                    => params[:state] ? params[:state] : nil,
	    		'city'                     => params[:city] ? params[:city] : nil,
	    		'class_s'                  => params[:class_s] ? params[:class_s] : nil,
	    		'email_id'                 => params[:email_id], 
	    		'password'                 => params[:password],
	    		'confirm_password'         => params[:cpassword],
	    		'role'                     => params[:role],
	    		'longitude'                => nil,
	    		'latitude'                 =>  nil,
	    		'ip_address'               => nil,	    		
	    		'device_id'                => SecureRandom.hex(32),
	    		'client_type'              => 'web',
	    		'device_unique_identifier' => nil,
	    }.to_json
	    res = APIRequest::APIHttpWrapper.new.do_post url, nil, body
	    response = JSON.parse(res.body)

	    if response["status"] ==  true
	    	puts "truueueueu"
	      	user_obj = {}
	      	user_obj["user_id"] = response["data"]["user_id"]
	      	user_obj["first_name"] = response["data"]["first_name"]
	      	user_obj["last_name"] = response["data"]["last_name"]
	      	user_obj["gender"] = response["data"]["gender"]
	      	user_obj["date_of_birth"] = response["data"]["date_of_birth"]
	      	user_obj["mobile_no"] = response["data"]["mobile_no"]
	      	user_obj["state"] = response["data"]["state"]
	      	user_obj["city"] = response["data"]["city"]
	      	user_obj["class_s"] = response["data"]["class_s"]
	      	user_obj["email_id"] = response["data"]["email_id"]
	      	user_obj["role"] = response["data"]["role"]
	      	user_obj["auth_token"] = response["data"]["auth_token"]
	      	session[:user] = user_obj
	      	if(response["data"]["role"] == "ADMIN")
	        	flash[:message] = "User register successfully"
	        	redirect_to root_path
	      	else
	        	redirect_to root_path
	      	end
	    else
	      	flash[:error] = response["message"]
	      	render root_path
	    end
	end

	def login
		url = URI.parse("#{API_URL}#{API_PREFIX}/login")
	    body = {
	    		'email_id'                 => params[:email_id], 
	    		'password'                 => params[:password],
	    		'longitude'                => nil,
	    		'latitude'                 => nil,
	    		'ip_address'               => nil,	    		
	    		'device_id'                => SecureRandom.hex(32),
	    		'client_type'              => 'web',
	    		'device_unique_identifier' => nil,
	    }.to_json
	    res = APIRequest::APIHttpWrapper.new.do_post url, nil, body
	    response = JSON.parse(res.body)

	    if response["status"] ==  true
	      	user_obj = {}
	      	user_obj["user_id"] = response["data"]["user_id"]
	      	user_obj["first_name"] = response["data"]["first_name"]
	      	user_obj["last_name"] = response["data"]["last_name"]
	      	user_obj["gender"] = response["data"]["gender"]
	      	user_obj["date_of_birth"] = response["data"]["date_of_birth"]
	      	user_obj["mobile_no"] = response["data"]["mobile_no"]
	      	user_obj["state"] = response["data"]["state"]
	      	user_obj["city"] = response["data"]["city"]
	      	user_obj["class_s"] = response["data"]["class_s"]
	      	user_obj["email_id"] = response["data"]["email_id"]
	      	user_obj["role"] = response["data"]["role"]
	      	user_obj["auth_token"] = response["data"]["auth_token"]
	      	session[:user] = user_obj
	      	if(response["data"]["role"] == "ADMIN")
	        	flash[:message] = "Login successfully"
	        	redirect_to root_path
	      	else
	        	redirect_to root_path
	      	end
	    else
	      	flash[:error] = response["message"]
	      	render root_path
	    end
	end

	def callback
	end

	def destroy
	  session[:user] = nil
	  redirect_to root_url, :notice => "Signed out!"
	end

	private
	def create_with_omniauth(auth)
	end
end
