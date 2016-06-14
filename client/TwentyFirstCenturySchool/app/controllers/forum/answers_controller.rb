class Forum::AnswersController < ApplicationController
	before_filter :redirect_to?

	def redirect_to?
      	if session[:user].blank?
        	redirect_to root_path
      	end
  	end
	def create
		body = {"answer" => URI.encode(params['answer']),"question_id" => params['question_id']}.to_json
        url = URI.parse("#{API_URL}#{API_PREFIX}/answers")
        res = APIRequest::APIHttpWrapper.new.do_post url, session[:user]['auth_token'], body
        response = JSON.parse(res.body)
        if response["status"] ==  true
          flash[:message] = "Answer posted successfully"
          redirect_to forum_question_path(params['question_id'])
          # render status: 200, json: { :message => "Blog created successfully" }
        else          
          flash[:error] = response["Message"]
          redirect_to forum_question_path(params['question_id'])
          # render status: 400, json: { :message => response["Message"] }
        end
	end

    def reply
        body = {"reply" => URI.encode(params['reply']),"question_id": params['question_id'],"answer_id": params[:id]}.to_json
        url = URI.parse("#{API_URL}#{API_PREFIX}/answers/reply")
        puts url
        res = APIRequest::APIHttpWrapper.new.do_post url, session[:user]['auth_token'], body
        response = JSON.parse(res.body)
        if response["status"] ==  true
          flash[:message] = "Reply posted successfully"
          redirect_to forum_question_path(params['question_id'])
          # render status: 200, json: { :message => "Blog created successfully" }
        else          
          flash[:error] = response["Message"]
          redirect_to forum_question_path(params['question_id'])
          # render status: 400, json: { :message => response["Message"] }
        end
    end
end
