class Forum::QuestionsController < ApplicationController
	before_filter :redirect_to?

	def redirect_to?
      	if session[:user].blank?
        	redirect_to root_path
      	end
  	end
  	
	def show
  		url = URI.parse("#{API_URL}#{API_PREFIX}/questions/"+params[:id]);
  		res = APIRequest::APIHttpWrapper.new.do_get url, session[:user]['auth_token']
        response = JSON.parse(res.body)
        @answer = {"answer": ""}
        if response["status"] ==  true

          @question = response['data'];
          puts response['data']
  		  # @questions = @questions.paginate(params[:page], 2)
          # render status: 200, json: { :message => "Blog created successfully" }
        else
        	@questions = [];
        end
	end
end
