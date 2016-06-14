class ForumsController < ApplicationController

  	# before_filter :redirect_to?

	def redirect_to?
      	if session[:user].blank?
        	redirect_to root_path
      	end
  	end

	def index		
		if !params['question_type']
			params['question_type'] = "new"
		end
  		@question = {"titile":"","description":"","category":"","author_id": session['user']?session['user']['user_id']:nil}
  		url = URI.parse("#{API_URL}#{API_PREFIX}/questions?type="+params['question_type']);
      if session[:user]
  		  res = APIRequest::APIHttpWrapper.new.do_get url, session[:user]['auth_token']
      else
        res = APIRequest::APIHttpWrapper.new.do_get url
      end
        response = JSON.parse(res.body)
        if response["status"] ==  true

          @questions = response['data'];
  		  @questions = @questions.paginate(params[:page], 2)
          # render status: 200, json: { :message => "Blog created successfully" }
        else
        	@questions = [];
          @questions = @questions.paginate(params[:page], 2)
        end
  		
	end

	def create
		if(params['description'])
			description = params['description']
		elsif params['description_by_category']
			description = params['description_by_category']
		else
			description = nil;
		end
		body = {"title" => params['title'],"category" => params['category'] ? params['category'].split(",") : nil, "description" => URI.encode(description)}.to_json
        url = URI.parse("#{API_URL}#{API_PREFIX}/questions")
        res = APIRequest::APIHttpWrapper.new.do_post url, session[:user]['auth_token'], body
        response = JSON.parse(res.body)
        if response["status"] ==  true
          flash[:message] = "Question posted successfully"
          redirect_to forums_path
          # render status: 200, json: { :message => "Blog created successfully" }
        else
          @question = {"title":params['title'],"description":params['description'],"category":params['category']}
          flash[:error] = response["Message"]
          redirect_to forums_path
          # render status: 400, json: { :message => response["Message"] }
        end
	end
end
